
import Image from 'next/image';
import React from 'react';
import { HashLoader } from 'react-spinners';

const FullPageLoader = () => {
  return (
    <div className='h-full w-full bg-white position-absolute z-20 overflow-hidden flex justify-center items-center'>
      <Image
        className='mx-4'
        src="/images/animateFlag.gif"
        height="50"
        width="50"
        alt="nepal flag"
      />
      <HashLoader color="#bc1134" />
    </div>
  )
}

export default FullPageLoader;
