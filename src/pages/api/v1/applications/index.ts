import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getApplications = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.application.findMany({
      include: {
        jobListing: {
          include: {
            jobDescription: true,
          },
        },
      },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find Applications try again` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong from our side and we were unable to get Applications.',
    });
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { status, url, source, position, company } = req.body;
    const data = await prisma.application.create({
      data: {
        status,
        jobListing: {
          create: { url, source, position, company },
        },
      },
      include: {
        jobListing: true,
      },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not post Applications try again` });
    }
    res.status(201).json(data);
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
