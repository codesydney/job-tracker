import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jobDescriptions from '../job-descriptions';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = await prisma.jobListing.findMany();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message:
          'Something went wrong from our side and we were unable to fetch Job Listings.',
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { jobDescriptionId, url, source, position, company } = req.body;

      const data = await prisma.jobListing.create({
        data: {
          jobDescriptionId: parseInt(jobDescriptionId),
          url,
          source,
          position,
          company,
        },
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: `Failed to create Job Listing: invalid 'url' field`,
      });
    }
  }
};
