import { Router } from "express";
import LocationController from "../controllers/location.controller";

class LocationRoutes {
  router = Router();
  controller = new LocationController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Location
    this.router.post("/", this.controller.create);

    // Retrieve all locations
    this.router.get("/:id", this.controller.findAll);

    // Update a Location with id
    this.router.put("/:id", this.controller.update);

    // Delete a Location with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new LocationRoutes().router;
