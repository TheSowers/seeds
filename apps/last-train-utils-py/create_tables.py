import sqlite3

import utils


sqlite_con = sqlite3.connect(utils.get_db_file_name())
cursor = sqlite_con.cursor()

cursor.execute(
    """
create table subway_station (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    line varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    code varchar(255) NOT NULL
)
               """
)
cursor.execute(
    """
create table time_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    type varchar(255) NOT NULL,
    departure_time varchar(255) NOT NULL,
    destination varchar(255) NOT NULL,
    up_or_down varchar(255) NOT NULL,
    subway_station_id INTEGER NOT NULL
)
    """
)

cursor.execute(
    "create unique index subway_station__unique_idx on subway_station (line, name, code)"
)
cursor.execute(
    "create unique index time_table__unique_idx on time_table (type, departure_time, destination, up_or_down, subway_station_id)"
)
