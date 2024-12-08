from ultralytics import YOLO

# Load your YOLOv8 model
model = YOLO("model.pt")  # Replace "model.pt" with your model file path

# Export the model to ONNX format
model.export(format="onnx")



# This generates ONNX files, including:
# - 'model.onnx' (your standard ONNX model)
# - 'model_nms.onnx' (model with Non-Maximum Suppression, if supported)

# Save with desired names
# import shutil

# shutil.move("model.onnx", "./model/best.onnx")
# shutil.move("model_nms.onnx", "./model/nms-yolov8.onnx")
