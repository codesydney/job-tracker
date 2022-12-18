import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
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
  } else if (req.method === 'PATCH') {
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
  } else if (req.method === 'DELETE') {
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
  }
};
