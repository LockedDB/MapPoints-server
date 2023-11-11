import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
}
