import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getJobListings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.jobListing.findMany();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong from our side and we were unable to fetch Job Listings.',
    });
  }
  if (req.method === 'POST') {
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getJobListings(req, res);
  } else if (req.method === 'PATCH') {
    postHandler(req, res);
  }
};

export default handler;
