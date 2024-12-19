import os
import json

def combine_geojson_files(folder_path, output_file):
    combined_geojson = []

    # Loop through all files in the folder
    for file_name in os.listdir(folder_path):
        if file_name.endswith('.geojson'):
            file_path = os.path.join(folder_path, file_name)
            
            # Read each GeoJSON file
            with open(file_path, 'r', encoding='utf-8') as geojson_file:
                data = json.load(geojson_file)
                combined_geojson.append(data)

    # Write the combined GeoJSON to a JSON file
    with open(output_file, 'w', encoding='utf-8') as output:
        json.dump(combined_geojson, output, indent=4)

    print(f"Combined GeoJSON saved to {output_file}")

# Usage
folder_path = r"C:\Users\USER\Desktop\Work\Competitions\MyHackathon\concept\output"
output_file = "combined_geojson.json"
combine_geojson_files(folder_path, output_file)
