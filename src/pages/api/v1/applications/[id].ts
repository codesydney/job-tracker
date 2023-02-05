import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const getApplication = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const data = await prisma.application.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find Application with id ${id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were unable to get Application.`,
    });
  }
};

const updateHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const { status } = req.body;
    const data = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    if (!data) {
      return res.status(404).json({
        message: `Could not find Application with id ${id}`,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were unable to update Application.`,
    });
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const data = await prisma.application.delete({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res.status(404).json({
        message: `Could not find Application with id ${id}`,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were unable to delete Application.`,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  if (!Number(id)) {
    res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }

  if (req.method === "GET") {
    getApplication(req, res, id);
  } else if (req.method === "PATCH") {
    updateHandler(req, res, id);
  } else if (req.method === "DELETE") {
    deleteHandler(req, res, id);
  }
};

export default handler;
