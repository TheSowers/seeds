import json

import requests


def get_raw_station_info_list_from_odsay(station_name):
    api_key = "b3xeSXyGokJ5MdDOBH17ktOoZz8hIzDdClmuFlJi2U0"
    url = f"https://api.odsay.com/v1/api/searchStation?apiKey={api_key}&stationName={station_name}&lang=0&stationClass=2"
    response = requests.get(url)
    result = response.json()
    return result["result"]["station"]


with open("station_code_list.json") as rfile:
    station_list_json = json.load(rfile).get("DATA")

for station_json in station_list_json:
    try:
        station_odsay_list = get_raw_station_info_list_from_odsay(
            station_json["station_nm"]
        )
        for station_odsay in station_odsay_list:
            if station_odsay["laneName"] == station_json["line_num"]:
                station_json["fr_code"] = station_odsay["stationID"]
    except Exception as e:
        print(station_json)
        break

with open("station_code_list.json", "w", encoding="utf-8") as wfile:
    json.dump(station_list_json, wfile, indent="\t", ensure_ascii=False)
