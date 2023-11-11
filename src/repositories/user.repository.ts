import { User } from "../models/user.model";
import connection from "../db";
import { ResultSetHeader } from "mysql2";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveById(userId: string): Promise<User | undefined>;
  update(user: User): Promise<number>;
  delete(userId: string): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
  save(user: User): Promise<User> {
    const { id, displayName, email, phone } = user;
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO user (id, displayName, email, phone) VALUES (?,?,?,?)",
        [id, displayName, email, phone],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(id)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }

  retrieveById(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM user WHERE id = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(user: User): Promise<number> {
    const { id, displayName, email, phone } = user;
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE user SET displayName = ?, email = ?, phone = ? WHERE id = ?",
        [displayName, email, phone, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows);
        }
      );
    });
  }

  delete(userId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM user WHERE id = ?",
        [userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM user", (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }
}

export default new UserRepository();
