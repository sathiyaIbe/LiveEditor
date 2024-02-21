
/* eslint-disable */
'use client';
import {  Navbar } from '../components';
import {  Hero, } from '../sections';
import Link from "next/link";

const Page = () => (
  <div className="min-h-screen flex flex-col justify-center">
    <div className="self-center ">
     
    <Link href="/cameramobile" className=" my-6   max-w-[250px] md:hidden  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" >
        Capture Your Image</Link>
        
        <Link href="/cameradesktop" className=" my-6   max-w-[300px] hidden md:block  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" >
        Capture Your Image</Link>
    </div>
   
   
  </div>
);

export default Page;
