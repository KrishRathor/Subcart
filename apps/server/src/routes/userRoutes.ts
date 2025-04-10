import { Router, type Request, type Response } from "express";
import prisma from "../db";
import { HttpStatusCode } from "@repo/types/index";

const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {

    const { first_name, last_name, id, image_url, email_addresses } = req.body.data;

    console.log(first_name, last_name, id, image_url, email_addresses);

    const createUser = await prisma.user.create({
      data: {
        id: id,
        name: first_name,
        avatarUrl: image_url,
        email: email_addresses[0].email_address
      }
    })

    res.json({
      code: HttpStatusCode.CREATED,
      message: "User created",
      response: createUser
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      response: null
    })

  } finally {
    await prisma.$disconnect();
  }
});

export default userRouter;

