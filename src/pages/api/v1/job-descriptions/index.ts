import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getJobDescriptions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const data = await prisma.jobDescription.findMany();
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find job descriptions try again` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong on our side and we failed to get Job Descriptions.',
    });
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { rawText, jobListingId } = req.body;
    const data = await prisma.jobDescription.create({
      data: {
        rawText,
        jobListing: { connect: { id: parseInt(jobListingId) } },
      },
      include: { jobListing: true },
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not create job description try again` });
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Failed to create Job Description: invalid rawText field`,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getJobDescriptions(req, res);
  } else if (req.method === 'POST') {
    postHandler(req, res);
  }
};

export default handler;
