import { Location } from "../models/location.model";
import connection from "../db";
import { ResultSetHeader } from "mysql2";

interface ILocationRepository {
  save(location: Location): Promise<Location>;
  retrieveById(locationId: string): Promise<Location | undefined>;
  retrieveByUserId(userId: string): Promise<Location[] | undefined>;
  update(location: Location): Promise<number>;
  delete(locationId: string): Promise<number>;
}

class LocationRepository implements ILocationRepository {
  save(location: Location): Promise<Location> {
    const { id, name, description, latitude, longitude, google_maps_id } =
      location;

    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO location (id, name, description, latitude, longitude, google_maps_id) VALUES (?, ?, ?, ?, ?, ?)",
        [id, name, description, latitude, longitude, google_maps_id],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(id)
              .then((location) => resolve(location!))
              .catch(reject);
        }
      );
    });
  }

  retrieveById(locationId: string): Promise<Location | undefined> {
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

  retrieveByUserId(userId: string): Promise<Location[] | undefined> {
    throw new Error("Method not implemented.");
  }

  update(location: Location): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(locationId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default new LocationRepository();
