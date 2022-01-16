import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/create_user", async (req: Request, res: Response) => {
  const { username } = req.body;
  const newUser = await prisma.user.create({
    data: {
      username,
      cars: {
        createMany: {
          data: [
            {
              model: "chevy",
            },
            {
              model: "toyota",
            },
          ],
        },
      },
    },
    include: {
      cars: true,
    },
  });
  res.json(newUser);
});

app.get("/get_user", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.id,
    },
    include: {
      cars: true,
    },
  });
  res.json(user);
});

app.listen(4000, () => {
  console.log("app listening on port", 4000);
});
