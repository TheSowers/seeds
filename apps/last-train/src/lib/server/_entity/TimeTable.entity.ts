export interface TimeTable {
    id: number;
    type: 'weekday' | 'saturday' | 'holiday';
    departure_time: Date;
    subway_id: number;
}
