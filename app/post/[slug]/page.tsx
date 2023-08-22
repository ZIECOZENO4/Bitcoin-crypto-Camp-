'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Post } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortableText from "react-portable-text"   
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs ={
  _id: string;
  name:string;
  email:string;
  comment:string;
}

async function getData(slug: string) {


  const query = `*[_type == 'post' && slug.current == '${slug}'][0]{
    _id,
    publishedAt,
    title,
    body,
    author ->{
      name,
      image,
    },
    description,
    mainImage,
    slug,
    body
  }`;

const data = await client.fetch(query);
return data;

}


export default async function SlugPost({params}:{params:{slug: string}}){
  const [submitted, setSubmitted] = useState(false);
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

const onSubmit : SubmitHandler<Inputs> = (data) => {
  fetch('/api/createComment.tsx', {
    method: "POST",
    body: JSON.stringify(data),
  }).then(() => {
    setSubmitted(true)
    console.log('successful');
    
  }).catch((err) => {
    setSubmitted(false);
    console.log('not successful');
    
  })
};
const [isClient, setIsClient] = useState(false);
useEffect(() => {
setIsClient(true);
}, []); 
  const data = await getData(params.slug) as Post;
return(
  
  <div>
        <div className='hidden'> {isClient ? 'This is never prerendered' : 'Prerendered'}</div> 
    <Header />
    <div >
     <Image src={urlFor(data.mainImage).url()!} alt={data.title} width={500} height={300} className='w-full h-96 object-cover' />
  <div className="max-w-3xl mx-auto items-center mb-10">
  <article className="w-full mx-auto p-5 bg-secondaryColor/10">
    <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">{data.title}</h1>
  <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">{data.description}</h2>
  <div className="flex items-center gap-5">
  <Image src={urlFor(data.author.image).url()} alt={data.author.name} width={500} height={300} className='w-12 h-12 rounded-full bg-red-300 object-cover' />  
 <p className=" font-bodyFont text-base">Blog post by {"  "}  <span className="font-bold text-secondaryColor">  {data.author.name}   </span> - Published at   <span className=" text-green-600">    {new Date(data.publishedAt).toLocaleDateString()}</span></p>
  </div>
  <div className="mt-10">
<PortableText 
dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'f334fhjz'} 
projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'production'}
content={data.body}
serializers={{

    h1: (props: any) => (
      <h1 className="text-3xl font-bold my-5 font-titleFont" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-2xl font-bold my-5 font-titleFont" {...props} />
    ),
    h3: (props: any) => (
      <h3 className="text-xl font-bold my-5 font-titleFont" {...props} />
    ),
    li: ({children}: any) => (
      <li className="ml-4 list-disc">{children}</li>
    ),
    link: ({href, children}: any) => (
      <a href={href} className="ml-4 list-disc">{children}</a>
    ),
  }}
  
/>
  </div>
  </article>
  <hr className=' max-w-lg my-5 mx-auto border-[1px] border-secondaryColor' />
  <div className='p-[8px]'>
    <p className='text-xs text-secondaryColor uppercase font-bold font-titleFont'>
      Was It Helpful ?   
    </p>
<h3 className='font-titleFont text-3xl font-bold'>Leave a  <span>Comment</span> below!!!</h3>
    <hr className='py-5 mt-2'/>
    <input {...register("_id")} 
    type='hidden'
    name='_id'
    value={data._id}
    />
    <form onSubmit={handleSubmit(onSubmit)} className='mt-8 flex flex-col gap-6'>
      <label className='flex flex-col'>
        <span className='font-titlefont font-semibold text-base'>Name</span>
     <input
     {...(register('name'), {required: true})}
     className='txet-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor'placeholder='Enter your name' type='text' />
      </label>
      <label className='flex flex-col'>
        <span className='font-titlefont font-semibold text-base'>Email</span>
     <input 
          {...(register('email'), {required: true})}
     className='txet-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor'placeholder='Enter your email' type='email' />
      </label>
      <label className='flex flex-col'>
        <span className='font-titlefont font-semibold text-base'>Comment</span>
     <textarea 
          {...(register('comment'), {required: true})}
     className='txet-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor'placeholder='Drop your comment, it will be helpful to the community.'  rows={8} />
      </label>
      <button className='w-full bg-bgColor text-blue-200 text-base font-ttilefont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300' type='submit'>Click to submit</button>
    </form>
    </div>
  </div>
  </div>  
  <Footer  />   
    </div>

)

}  

