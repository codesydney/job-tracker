import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

const getApplication = async (id: number, res: NextApiResponse) => {
  try {
    const data = await prisma.application.findUnique({
      where: { id },
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find Application with id ${id}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }
};

type UpdateApplicationsRequest = Prisma.ApplicationUpdateInput;

const updateHandler = async (
  id: number,
  input: UpdateApplicationsRequest,
  res: NextApiResponse
) => {
  try {
    const data = await prisma.application.update({
      where: { id },
      data: input,
    });

    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: `Could not find Application with id ${id}`,
    });
  }
};

const deleteHandler = async (id: number, res: NextApiResponse) => {
  try {
    const data = await prisma.application.delete({
      where: { id },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      message: `Could not find Application with id ${id}`,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: rawId } = req.query as { id: string };

  const id = parseInt(rawId);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }

  if (req.method === "GET") {
    getApplication(id, res);
  } else if (req.method === "PATCH") {
    const { status } = req.body;
    updateHandler(id, { status }, res);
  } else if (req.method === "DELETE") {
    deleteHandler(id, res);
  }
};

export default handler;
