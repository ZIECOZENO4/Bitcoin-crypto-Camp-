

import { Post } from '@/app/lib/interface';
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
// async function getData() {
//   const query = `*[_type == 'post]{
//     _id,
//     slug{
//       current
//     }
//   }`;
//   const data = await client.fetch(query)
//   const paths = data.map((post:Post)=>({
//     params:{
//       slug: post.slug.current
//     }
//   }));
//   return {
//     paths,
//     fallback: 'blocking',
//   }
// };
const Post =  () =>{
  return (
    <div>
      <Header />
      <div className=' py-20'>
  
      </div>
      <Footer />
    </div>
  )
}

export default Post;
