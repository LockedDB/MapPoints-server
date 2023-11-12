import { RowDataPacket } from "mysql2";

export interface Location extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  google_maps_id?: string;
  created_at: Date;
  updated_at: Date;
}
