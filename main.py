import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from PIL import Image

def plot_bounding_boxes(image_width, image_height, detections, image=None):
    """
    Plots bounding boxes on an image or a blank canvas.

    Args:
        image_width (int): Width of the image or canvas.
        image_height (int): Height of the image or canvas.
        detections (list): List of detection dictionaries with 'bbox' key.
        image (numpy.ndarray): Optional. An image array to draw on.
    """
    # If the image is None, create a blank canvas
    if image is None:
        image = np.ones((image_height, image_width, 3), dtype=np.uint8) * 255

    # Create a Matplotlib figure and axes
    fig, ax = plt.subplots(figsize=(10, 10))
    ax.imshow(image)

    # Plot each bounding box
    for detection in detections:
        bbox = detection['bbox']
        label = detection['label']
        confidence = detection['confidence']

        # Extract bbox coordinates
        x_min, y_min, x_max, y_max = bbox
        width = x_max - x_min
        height = y_max - y_min

        # Create a rectangle patch
        rect = patches.Rectangle((x_min, y_min), width, height, linewidth=2, edgecolor='red', facecolor='none')
        ax.add_patch(rect)

        # Add label and confidence
        ax.text(
            x_min, y_min - 10,
            f'Label: {label}, Conf: {confidence:.2f}',
            color='red',
            fontsize=10,
            bbox=dict(facecolor='white', alpha=0.5)
        )

    # Adjust the plot
    ax.axis('off')
    plt.show()

# Example usage
image_path = r"C:\Users\USER\Downloads\placeholder.png"

# Load the image using PIL
image = np.array(Image.open(image_path))

detections = [
    {
        "label": 0,
        "confidence": 0.853120744228363,
        "bbox": [323.51312255859375, 323.6422119140625, 634.2689208984375, 625.81787109375]
    }
]

plot_bounding_boxes(image.shape[1], image.shape[0], detections, image)
