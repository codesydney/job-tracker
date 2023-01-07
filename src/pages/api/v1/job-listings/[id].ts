import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getJobListing = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string') {
      const { id } = req.query;
      const data = await prisma.jobListing.findUnique({
        where: { id: parseInt(id) },
      });
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: `Could not find Job Listing with id ${id}` });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Invalid Input: 'id' was not a number`,
    });
  }
  if (req.method === 'DELETE') {
  }
};

const updateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string') {
      const { id } = req.query;
      const { url, source, position, company } = req.body;
      const data = await prisma.jobListing.update({
        where: { id: parseInt(id) },
        data: { url, source, position, company },
      });
      if (data) {
        res.status(200).json(data);
      }
    }
  } catch (error) {
    const { id } = req.query;
    if (Number(id)) {
      res.status(404).json({
        message: `Could not find Job Listing with id ${id}`,
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
      const data = await prisma.jobListing.delete({
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
        message: `Could not find Job Listing with id ${id}`,
      });
    } else {
      res.status(400).json({
        message: `Invalid Input: 'id' was not a number`,
      });
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getJobListing(req, res);
  } else if (req.method === 'PATCH') {
    updateHandler(req, res);
  } else if (req.method === 'DELETE') {
    deleteHandler(req, res);
  }
};

export default handler;
