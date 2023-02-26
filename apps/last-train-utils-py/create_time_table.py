import json
import re
import sqlite3
import typing

import requests

import utils


sqlite_con = sqlite3.connect(utils.get_db_file_name())


class StationInfoType(typing.TypedDict):
    id: typing.Optional[int]
    line_num: str
    station_nm: str
    fr_code: str


def insert_station_info_into_db():
    def read_station_code_list_json() -> list[StationInfoType]:
        with open("station_code_list.json", "r") as f:
            station_info_list = json.load(f)

        if not station_info_list:
            raise Exception("json 파일이 이상한 것 같아요.")

        return station_info_list

    def classify_line_02_station(station_info_list: list[StationInfoType]) -> list[str]:
        line_02_station_name_list: list[str] = []
        for station_info in station_info_list:
            station_name = station_info.get("station_nm")
            line_num = station_info.get("line_num")
            if line_num == "수도권 2호선":
                line_02_station_name_list.append(station_name)
        return line_02_station_name_list

    def insert_to_db(
        station_info_list: list[StationInfoType], line_02_station_name_list: list[str]
    ) -> None:
        column_values_list = []
        for station_info in station_info_list:
            station_name = station_info.get("station_nm")
            if station_name in line_02_station_name_list:
                column_values_list.append(
                    (
                        station_info.get("line_num"),
                        station_name,
                        station_info.get("fr_code"),
                    )
                )
        cursor = sqlite_con.cursor()
        cursor.executemany(
            "insert into subway_station (line, name, code) values (?,?,?)",
            column_values_list,
        )
        sqlite_con.commit()

    station_info_list = read_station_code_list_json()
    line_02_station_name_list = classify_line_02_station(station_info_list)
    insert_to_db(station_info_list, line_02_station_name_list)


def get_station_info_list_from_db():
    cursor = sqlite_con.cursor()

    station_info_list: list[StationInfoType] = []
    for row in cursor.execute("select * from subway_station"):
        station_info_list.append(
            {
                "id": row[0],
                "line_num": row[1],
                "station_nm": row[2],
                "fr_code": row[3],
            }
        )
    return station_info_list


def insert_time_table_to_db(station_id_from_db, station_code, way_code):
    def get_raw_time_table_from_odsay():
        api_key = "b3xeSXyGokJ5MdDOBH17ktOoZz8hIzDdClmuFlJi2U0"
        url = f"https://api.odsay.com/v1/api/subwayTimeTable?apiKey={api_key}&stationID={station_code}&wayCode={way_code}&lang=0&showExpressTime=1"
        response = requests.get(url)
        result = response.json()
        return result["result"]

    def extract_minute(minute_dest: str):
        # minute_dest: "02(소요산)"
        search_minute_result = re.search(r"[0-5][0-9]", minute_dest)
        if search_minute_result == None:
            raise Exception()
        return search_minute_result.group()

    def extract_destination(minute_dest: str):
        # minute_dest: "02(소요산)"
        search_dest_result = re.search(r"\(.*\)", minute_dest)
        if search_dest_result == None:
            raise Exception()
        return search_dest_result.group()[1:-1]

    raw_time_table = get_raw_time_table_from_odsay()
    column_values_list = []
    up_or_down = "up" if way_code == 1 else "down"
    for day_type in ("OrdList", "SatList", "SunList"):
        if len(raw_time_table[day_type]) == 0:
            print(
                "존재하지 않는 시간표: ", station_code, raw_time_table["stationName"], up_or_down
            )
            return

        for time_dict in raw_time_table[day_type][up_or_down]["time"]:
            """
            time_dict는 아래와 같은 형태임.
            {
                "Idx": 15,
                "list": "02(소요산) 10(동묘앞) 15(양주)",
                "expList": "24(청량리) 48(청량리)"
            },
            """
            hour = time_dict["Idx"]
            if int(hour) < 17:
                # 17시 전은 무시하자. 막차 근처만 보면 되니까.
                continue

            minute_dest_list = time_dict["list"].split(" ")
            for minute_dest in minute_dest_list:
                minute = extract_minute(minute_dest)
                destination = extract_destination(minute_dest)

                time_table_type = {
                    "OrdList": "weekday",
                    "SatList": "saturday",
                    "SunList": "holiday",
                }
                column_values_list.append(
                    (
                        time_table_type[day_type],
                        f"{hour}{minute}",
                        destination,
                        up_or_down,
                        station_id_from_db,
                    )
                )

    cursor = sqlite_con.cursor()
    cursor.executemany(
        "insert into time_table (type, departure_time, destination, up_or_down, subway_station_id) values (?,?,?,?,?)",
        column_values_list,
    )
    sqlite_con.commit()


def main():
    # insert_station_info_into_db()
    station_info_list = get_station_info_list_from_db()

    for station_info in station_info_list:
        insert_time_table_to_db(station_info["id"], station_info["fr_code"], 1)
        insert_time_table_to_db(station_info["id"], station_info["fr_code"], 2)

    sqlite_con.close()


if __name__ == "__main__":
    main()
