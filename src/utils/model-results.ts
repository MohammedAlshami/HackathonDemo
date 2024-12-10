interface ResultsProps {
  label: number;
  confidence: number;
}

const labels = [
  "abnormal",
  "ripe",
  "underripe",
  "ripe",
  "unripe",
  "overripe",
];

export function resultTransform(results: ResultsProps[]) {
  const transformedValues = results.map((result) => {
    const labelValue = result.label;
    const stringValue = labels[labelValue];

    const roundedValue = +result.confidence.toFixed(2);

    return { ...result, label: stringValue, confidence: roundedValue };
  });

  return transformedValues;
}
