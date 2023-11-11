import { Request, Response } from "express";
import { User } from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class UserController {
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

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving user.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const user = await userRepository.retrieveById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedData: Exclude<User, "userId"> = req.body;

    if (!updatedData.displayName) {
      res.status(400).send({
        message: "Display name cannot be empty!",
      });
      return;
    }

    try {
      const affectedRows = await userRepository.update({
        ...updatedData,
      });

      if (affectedRows > 0) {
        const updatedUser = await userRepository.retrieveById(userId);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const affectedRows = await userRepository.delete(userId);
      if (affectedRows > 0) {
        res
          .status(200)
          .json({ message: `User with id ${userId} was deleted.` });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}
