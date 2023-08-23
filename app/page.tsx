
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
        slug
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
        <div className="max-w-7xl mx-auto py-20 pb-10 px-4 flex justify-between  px-4 ">

        <div className='max-w-7xl mx-auto mt-[50px] align-middle md:m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4'>

      {
        data.map((post) => (

          <div key={post._id} className=' pb-[300px] pt-[50px]'>
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


