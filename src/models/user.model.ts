import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  displayName: string;
  email: string;
  phone?: string;
}
