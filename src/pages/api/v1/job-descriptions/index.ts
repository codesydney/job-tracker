import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = await prisma.jobDescription.findMany();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message:
          'Something went wrong on our side and we failed to get Job Descriptions.',
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { rawText } = req.body;
      console.log(rawText);
      const data = await prisma.jobDescription.create({
        data: { rawText },
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: `Failed to create Job Description: invalid rawText field`,
      });
    }
  }
};
