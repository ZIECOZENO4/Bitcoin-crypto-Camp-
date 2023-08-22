import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f334fhjz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = req.body;
  try {
    await client.create({
      _type: 'comment',
      data: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit comment`, err })
  }
  console.log('Comment submitted');
  res.status(200).json({ message: 'Comment submitted to Bitcoin Crypto Camp.' });
}
