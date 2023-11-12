import { Request, Response } from "express";
import { List } from "../models/list.model";
import listRepository from "../repositories/list.repository";

export default class ListController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
      return;
    }

    try {
      const list: List = req.body;
      const savedList = await listRepository.save(list);

      res.status(201).send(savedList);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving list.",
      });
    }
  }

  async findAll(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}
