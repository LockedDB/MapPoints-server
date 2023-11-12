import { RowDataPacket } from "mysql2";

export interface List extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  userId: number;
}
