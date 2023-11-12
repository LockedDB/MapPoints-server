import { Location } from "../models/location.model";
import connection from "../db";
import { ResultSetHeader } from "mysql2";

interface ILocationRepository {
  save(location: Location): Promise<Location>;
  retrieveById(locationId: number): Promise<Location | undefined>;
  retrieveByUserId(userId: number): Promise<Location[] | undefined>;
  update(location: Location): Promise<number>;
  delete(locationId: number): Promise<number>;
}

class LocationRepository implements ILocationRepository {
  save(location: Location): Promise<Location> {
    const { name, description, latitude, longitude, google_maps_id } = location;

    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO location (name, description, latitude, longitude, google_maps_id) VALUES (?, ?, ?, ?, ?)",
        [name, description, latitude, longitude, google_maps_id],
        (err, res) => {
          if (err) reject(err);
          else {
            const insertedId = res.insertId;
            this.retrieveById(insertedId)
              .then((retrievedLocation) => resolve(retrievedLocation!))
              .catch(reject);
          }
        }
      );
    });
  }

  retrieveById(locationId: number): Promise<Location | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Location[]>(
        "SELECT * FROM location WHERE id = ?",
        [locationId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  retrieveByUserId(userId: number): Promise<Location[] | undefined> {
    throw new Error("Method not implemented.");
  }

  update(location: Location): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(locationId: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default new LocationRepository();
