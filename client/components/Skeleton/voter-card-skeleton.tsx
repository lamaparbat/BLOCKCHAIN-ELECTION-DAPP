import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const VoterCardSkeleton = ({ repeatCount }) => {
 return (
  <div className='flex flex-wrap justify-between'>
   {Array(repeatCount).fill(0).map((d, i) =>
    <SkeletonTheme baseColor="#f8f9fa" highlightColor="#e9edf1" key={i} >
     <div className='h-[170px] w-[345px] mt-3 d-flex px-4 py-3 bg-white rounded-lg overflow-hidden mb-3 cursor-pointer drop-shadow-md'>
      <div className='d-flex flex-column justify-content-center'>
       <Skeleton count={1} height={95} width={95} className="rounded-circle" />
       <div className='d-flex my-2'>
        <Skeleton count={1} height={20} width={20} className="rounded-circle" />
        <Skeleton count={1} height={20} width={20} className="rounded-circle mx-4" />
        <Skeleton count={1} height={20} width={20} className="rounded-circle" />
       </div>
      </div>
      <div className='my-1 mx-3'>
       <Skeleton count={1} height={20} width={130} />
       <Skeleton count={1} height={20} width={150} />
       <Skeleton count={1} height={20} width={120} />
       <Skeleton count={1} height={20} width={180} />
      </div>
     </div>
    </SkeletonTheme>
   )}
  </div>
 )
}

export default VoterCardSkeleton;
