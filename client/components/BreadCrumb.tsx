import React from 'react';
import { useRouter } from 'next/router';

const BreadCrumb = () => {
 // router instance
 const router = useRouter();

 const navigate = (e) => {
  e.preventDefault();
  router.push("/");
 }

 return (
  <div className="flex justify-start items-center ">
   <div className="inline-flex items-center">
    <span onClick={navigate} className="inline-flex items-center font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer text-md">
     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
     Home
    </span>
   </div>
   <div>
    <div className="flex items-center">
     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
     <span className="ml-1 text-md cursor-pointer font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Candidate Details</span>
    </div>
   </div>
  </div>
 )
}

export default BreadCrumb
