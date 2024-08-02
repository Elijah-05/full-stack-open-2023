import { Request, Response } from "express";

const ping = (_req: Request, res: Response): void => {
  console.log("something pinged here");
  res.send("pong");
};

export default ping;
