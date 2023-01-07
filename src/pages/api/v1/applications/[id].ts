import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

<<<<<<< HEAD
const getApplication = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string') {
      const { id } = req.query;
      const data = await prisma.application.findUnique({
        where: { id: parseInt(id) },
      });
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: `Could not find Application with id ${id}` });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }
};

const updateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string') {
      const { id } = req.query;
      const { status } = req.body;
      const data = await prisma.application.update({
        where: { id: parseInt(id) },
        data: { status },
      });
      if (data) {
        res.status(200).json(data);
      }
    }
  } catch (error) {
    const { id } = req.query;
    if (Number(id)) {
      res.status(404).json({
        message: `Could not find Application with id ${id}`,
      });
    } else {
      res.status(400).json({
        message: `Invalid Input: 'id' was not a number`,
      });
    }
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    if (typeof id === 'string') {
      const data = await prisma.application.delete({
        where: { id: parseInt(id) },
      });
      if (data) {
        res.status(200).json(data);
      }
    }
  } catch (error) {
    const { id } = req.query;
    if (Number(id)) {
      res.status(404).json({
        message: `Could not find Application with id ${id}`,
      });
    } else {
      res.status(400).json({
        message: `Invalid Input: 'id' was not a number`,
      });
=======
const getApplication = async (id: number, res: NextApiResponse) => {
  try {
    const data = await prisma.application.findUnique({
      where: { id },
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find Application with id ${id}` });
>>>>>>> a06d29925004ad0c24f40e5ccb2e08b503843228
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }
};

<<<<<<< HEAD
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getApplication(req, res);
  } else if (req.method === 'PATCH') {
    updateHandler(req, res);
  } else if (req.method === 'DELETE') {
    deleteHandler(req, res);
=======
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
>>>>>>> a06d29925004ad0c24f40e5ccb2e08b503843228
  }
};

export default handler;
