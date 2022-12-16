import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = await prisma.application.findMany();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message:
          'Something went wrong from our side and we were unable to get Applications.',
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { jobListingId, status } = req.body;

      const application = await prisma.application.create({
        data: { jobListingId, status },
      });

      res.status(201).json(application);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Failed to create Application: status is invalid` });
    }
  }
};
