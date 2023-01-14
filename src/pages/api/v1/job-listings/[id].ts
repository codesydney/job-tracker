import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getJobListing = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const data = await prisma.jobListing.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not find Job Listing with id ${id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were unable to get job listing.`,
    });
  }
};

const updateHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const { url, source, position, company } = req.body;
    const data = await prisma.jobListing.update({
      where: { id: parseInt(id) },
      data: { url, source, position, company },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not update Job Listing with id ${id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were unable to update job listing.`,
    });
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const data = await prisma.jobListing.delete({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Could not delete Job Listing with id ${id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong from our side and we were delete job listing.`,
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

  if (req.method === 'GET') {
    getJobListing(req, res, id);
  } else if (req.method === 'PATCH') {
    updateHandler(req, res, id);
  } else if (req.method === 'DELETE') {
    deleteHandler(req, res, id);
  }
};

export default handler;
