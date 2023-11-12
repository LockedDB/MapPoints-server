import { Request, Response } from "express";
import { Location } from "../models/location.model";
import locationRepository from "../repositories/location.repository";

export default class LocationController {
  async create(req: Request, res: Response) {
    if (!req.body.name || !req.params.listId) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
      return;
    }

    try {
      const location: Location = req.body;
      const savedLocation = await locationRepository.save(
        location,
        req.params.listId
      );

      res.status(201).send(savedLocation);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving location.",
      });
    }
  }

  async findAll(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}
