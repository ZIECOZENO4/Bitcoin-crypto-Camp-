// import type { NextApiRequest, NextApiResponse } from "next";
// import { createClient } from "@sanity/client";

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f334fhjz',
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   useCdn: true,
//   token: process.env.SANITY_API_TOKEN,
// })

// export default async function createComment(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { _id, name, email, comment } = req.body;
//   try {
//     await client.create({
//       _type: 'comment',
//       data: {
//         _type: 'reference',
//         _ref: _id,
//       },
//       name,
//       email,
//       comment
//     });
//   } catch (err) {
//     return res.status(500).json({ message: `Couldn't submit comment`, err })
//   }
//   console.log('Comment submitted');
//   res.status(200).json({ message: 'Comment submitted to Bitcoin Crypto Camp.' });
// }
// /api/createComment.tsx
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN, // you need a write token to modify data
  useCdn: false // `false` if you want to ensure fresh data
})

type Data = {
  name: string
  email: string
  comment: string
  _id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, comment, _id } = req.body

    // Here you can add the comment to your Sanity Studio
    const newComment = {
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: _id
      }
    }

    const result = await client.create(newComment)

    res.status(200).json({ name, email, comment, _id })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
