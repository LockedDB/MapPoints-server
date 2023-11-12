import connection from "../db";
import { ResultSetHeader } from "mysql2";
import { List } from "../models/list.model";

interface IListRepository {
  save(list: List): Promise<List>;
  retrieveById(listId: number): Promise<List | undefined>;
  retrieveAllByUserId(userId: number): Promise<List[] | undefined>;
  update(location: Location): Promise<number>;
  delete(locationId: number): Promise<number>;
}

class ListRepository implements IListRepository {
  save(list: List): Promise<List> {
    const { name, description, userId } = list;

    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO list (name, description, user_id) VALUES (?, ?, ?)",
        [name, description, userId],
        (err, res) => {
          if (err) reject(err);
          else {
            const insertedId = res.insertId;
            this.retrieveById(insertedId)
              .then((retrievedList) => resolve(retrievedList!))
              .catch(reject);
          }
        }
      );
    });
  }

  retrieveById(locationId: number): Promise<List | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<List[]>(
        "SELECT * FROM location WHERE id = ?",
        [locationId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  retrieveAllByUserId(userId: number): Promise<List[] | undefined> {
    throw new Error("Method not implemented.");
  }

  update(location: Location): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(locationId: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default new ListRepository();
