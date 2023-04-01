import React from 'react';
import { HashLoader } from 'react-spinners';

const FullPageLoader = () => {
  return (
    <div className='h-full w-full bg-white position-absolute z-20 overflow-hidden flex justify-center items-center'>
      <HashLoader color="#bc1134" size={40} />
    </div>
  )
}

export default FullPageLoader;
