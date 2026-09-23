import json
import os

def creat_id_header_map(path_to_files):
    dirs = os.listdir(path_to_files)
    id_header = {}
    for filename in dirs:
        if filename[0] != "i":
            #print(filename)
            abs_file = os.path.join(path_to_files, filename)
            with open(abs_file, 'r', encoding="utf8") as source_file:
                source_data = json.load(source_file)
                id_header[source_data["id"]] = source_data["header"]
    write_file = os.path.join(path_to_files, "id_header_map.json")
    with open(write_file, 'w', encoding="utf8") as map_file:
        json.dump(id_header, map_file, ensure_ascii=False, indent=4)


creat_id_header_map("./0748Dhahabi.TarikhIslam.JK007088")
