import datetime


def get_db_file_name():
    today = datetime.datetime.now().strftime("%y%m%d")
    return f"../last-train/{today}.sqlite"
