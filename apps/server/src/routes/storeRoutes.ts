import { HttpStatusCode, StoreLaunchI } from "@repo/types/index";
import { response, Router, type Request, type Response } from "express";
import prisma from "../db";
import { requireAuth, getAuth } from "@clerk/express";

export const storeRouter = Router();

storeRouter.post('/launch', requireAuth(), async (req: Request, res: Response) => {
  try {

    console.log('start');

    const parsedBody = StoreLaunchI.parse(req.body);
    const { name, slug, description } = parsedBody;

    console.log('after parse');

    const { userId } = getAuth(req);

    if (!userId) {
      res.json({
        code: HttpStatusCode.NOT_FOUND,
        message: "User not found",
        response: null
      })
      return;
    }

    const getStore = await prisma.store.findFirst({
      where: {
        name: name
      }
    })

    if (getStore && getStore.ownerId === userId) {
      res.json({
        code: HttpStatusCode.CONFLICT,
        message: "store with this name already exist",
        response: null
      })
      return;
    }

    const isSlugAvaliable = await prisma.store.findFirst({
      where: {
        subdomain: slug
      }
    })

    if (isSlugAvaliable) {
      res.json({
        code: HttpStatusCode.CONFLICT,
        messsage: 'Slug not Available',
        response: null
      })
      return;
    }

    console.log('after auth', name, slug, userId, description);

    const createStore = await prisma.store.create({
      data: {
        name: name,
        subdomain: slug,
        description: description,
        ownerId: userId
      }
    })

    res.json({
      coed: HttpStatusCode.OK,
      message: 'Store Created',
      response: createStore.id
    })
    return;

  } catch (error) {
    console.log(error);
    res.json({
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "INTERNAL_SERVER_ERROR",
      response: null
    })
  } finally {
    await prisma.$disconnect();
  }
  ;
})
