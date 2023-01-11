import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getApplications = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.application.findMany();
    if (data) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: `Could not find Applications try again` });
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong from our side and we were unable to get Applications.',
    });
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { jobListingId, status } = req.body;
    const data = await prisma.application.create({
      data: { jobListingId, status },
    });
    if (data) {
      res.status(201).json(data);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create Application: status is invalid` });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getApplications(req, res);
  } else if (req.method === 'POST') {
    postHandler(req, res);
  }
};

export default handler;
