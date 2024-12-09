import { InferenceSession, Tensor } from "onnxruntime-web";
import { getImageTensorFromPath } from "./model-image-helper";

export async function detectImage(
  image: HTMLImageElement,
  session: { net: InferenceSession; nms: InferenceSession } | null
) {
  const MODEL_SHAPES = [1, 3, 640, 640];
  const IOU_THRESHOLD = 0.45;
  const SCORE_THRESHOLD = 0.2;

  const [modelWidth, modelHeight] = MODEL_SHAPES.slice(2);
  const input = await getImageTensorFromPath(
    image.src,
    modelWidth,
    modelHeight
  );

  const tensor = new Tensor("float32", input.data, MODEL_SHAPES);
  const config = new Tensor(
    "float32",
    new Float32Array([100, IOU_THRESHOLD, SCORE_THRESHOLD])
  );

  const { output0 } = await session!.net.run({ images: tensor });
  const { selected } = await session!.nms.run({
    detection: output0,
    config: config,
  });

  const detections = [];

  for (let idx = 0; idx < selected.dims[1]; idx++) {
    const data = selected.data.slice(
      idx * selected.dims[2],
      (idx + 1) * selected.dims[2]
    );

    const [centerX, centerY, width, height] = data.slice(0, 4).map(Number);
    const x = (centerX - width / 2) * (image.naturalWidth / modelWidth);
    const y = (centerY - height / 2) * (image.naturalHeight / modelHeight);
    const scaledWidth = width * (image.naturalWidth / modelWidth);
    const scaledHeight = height * (image.naturalHeight / modelHeight);

    const scores = data.slice(4);
    let maxScore = -Infinity;
    let label = -1;

    for (let i = 0; i < scores.length; i++) {
      const score = Number(scores[i]);
      if (score > maxScore) {
        maxScore = score;
        label = i;
      }
    }

    detections.push({
      label,
      confidence: maxScore,
      bbox: [x, y, scaledWidth, scaledHeight],
    });
  }

  return detections;
}
