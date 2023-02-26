export interface TimeTable {
    id: number;
    type: 'weekday' | 'saturday' | 'holiday';
    departure_time: string;
    destination: string;
    up_or_down: string;
    subway_station_id: number;
}
