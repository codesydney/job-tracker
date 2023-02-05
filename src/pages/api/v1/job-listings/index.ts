import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getJobListings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.jobListing.findMany();
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find job listings try again` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong from our side and we were unable to fetch Job Listings.',
    });
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url, source, position, company } = req.body;

    const data = await prisma.jobListing.create({
      data: {
        url,
        source,
        position,
        company,
      },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not create job listing try again` });
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Failed to create Job Listing: invalid 'url' field`,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getJobListings(req, res);
  } else if (req.method === 'POST') {
    postHandler(req, res);
  }
};

export default handler;
