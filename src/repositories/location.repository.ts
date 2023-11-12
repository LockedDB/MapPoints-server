import { Location } from "../models/location.model";
import connection from "../db";
import { ResultSetHeader } from "mysql2";

interface ILocationRepository {
  save(location: Location, listId: string): Promise<Location>;
  retrieveById(locationId: string): Promise<Location | undefined>;
  retrieveByUserId(userId: string): Promise<Location[] | undefined>;
  update(location: Location): Promise<number>;
  delete(locationId: string): Promise<number>;
}

class LocationRepository implements ILocationRepository {
  save(location: Location, listId: string): Promise<Location> {
    const { id, name, description, latitude, longitude, google_maps_id } =
      location;

    return new Promise((resolve, reject) => {
      // Start a transaction
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        // Insert into location table
        connection.query<ResultSetHeader>(
          "INSERT INTO location (id, name, description, latitude, longitude, google_maps_id) VALUES (?, ?, ?, ?, ?, ?)",
          [id, name, description, latitude, longitude, google_maps_id],
          (err, res) => {
            if (err) {
              connection.rollback(() => {
                reject(err);
              });
              return;
            }

            // Insert into LinkListLocation table
            connection.query<ResultSetHeader>(
              "INSERT INTO LinkListLocation (location_id, list_id) VALUES (?, ?)",
              [id, listId],
              (err, res) => {
                if (err) {
                  connection.rollback(() => {
                    reject(err);
                  });
                  return;
                }

                // Commit the transaction
                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      reject(err);
                    });
                    return;
                  }

                  // Retrieve and resolve the newly created location
                  this.retrieveById(id)
                    .then((location) => resolve(location!))
                    .catch((error) => {
                      connection.rollback(() => {
                        reject(error);
                      });
                    });
                });
              }
            );
          }
        );
      });
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
    return new Promise((resolve, reject) => {
      connection.query<Location[]>(
        "SELECT loc.* FROM User u JOIN List lst ON u.id = lst.userId JOIN LinkListLocation lll ON lst.id = lll.list_id JOIN Location loc ON lll.location_id = loc.id WHERE u.id = ();",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  update(location: Location): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(locationId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default new LocationRepository();
