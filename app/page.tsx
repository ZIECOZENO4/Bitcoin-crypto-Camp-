// 'use client'
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useTheme } from 'next-themes';

// export default function Home() {
//   const { setTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
//   };

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <button onClick={toggleTheme}>
//       {resolvedTheme === 'dark' ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//           />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
//           />
//         </svg>
//       )}
//     </button>
//   );
// }



// import React from 'react'
// import { client } from './lib/sanity';
// import { Post } from './lib/interface';


// export default async function HomePage(){
  // const data = await getData() as Post[];
//   return (
//     <>
//       <h1>I am the home page</h1>
//       {
//         data.map((post) => (
//           <div key={post._id}>
//             <h2>{post.title}</h2>
//           </div>
//         ))
//       }
//     </>
//   );
// }
'use client'
import { useState, useEffect } from 'react';

import Image from 'next/image'

import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from 'react'
import { client, urlFor } from './lib/sanity';
import { Post } from './lib/interface';
import Link from 'next/link';
export default async function Home() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
    setIsClient(true);
  }, []);  
  async function getData(){
     const query = `*[_type == 'post']{
      _id,
        title,
        description,
        author -> {
          name,
          image
        },
        description,
        mainImage,
        slug,
    }`;
     const data = await client.fetch(query);
     return data;
  }

  const data = await getData() as Post[];
  return (
    <div className=' w-full h-full'>
      <Header />
      <Banner />
    <div>
      {isClient ? 'This is never prerendered' : 'Prerendered'}
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        <div className="max-w-7xl mx-auto h-60 relative ">
          <BannerBottom />
        </div>
        <div className="max-w-7xl mx-auto py-20 pb-10 px-4">

        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4'>

      {
        data.map((post) => (

          <div key={post._id}>
          {/* <h2>{post.title}</h2>
          <h2>{post.description}</h2> */}
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className='border-[1px] border-secondaryColor border-opacity-40 h-[45px] group'>
          <div className='h-5/5 w-full overflow-hidden'>
                 <Image src={urlFor(post.mainImage).url()!} alt={post.title} width={500} height={300} className='w-full object-cover brightness-75 group-hover:brightness-100 duration-300 group' />     
          </div>
          <div className='h-2/5 w-full flex flex-col justify-center pt-[80px]'>
<div className=' flex justify-between items-center px-4 py-1 border-b-[1px] border-gray-500'>
  <p>{post.title}</p>
  <Image src={urlFor(post.author.image).url()!} alt={post.author.name} width={500} height={300} className='w-12 h-12 rounded-full  object-cover' />
</div>
<p className='py-2 px-4 text-base'>{post.description.substring(0, 90)}......  BY   <span className=' font-semibold'>{post.author.name} </span>  <span className=' text-green-400'>VERIFIED</span></p>
          </div>
        </div>

            </Link>    
    </div>
        ))
      }
      </div>
    </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
    </div>
  );
}


