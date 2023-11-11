import { Request, Response } from "express";
import { User } from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class TutorialController {
  async create(req: Request, res: Response) {
    if (!req.body.displayName) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userRepository.save(user);
      console.log("savedUser: ", savedUser);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving user.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findAll OK",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findOne OK",
        reqParamId: req.params.id,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "delete OK",
        reqParamId: req.params.id,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}
