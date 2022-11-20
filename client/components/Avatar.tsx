import React, { ReactElement } from 'react';
import Image from 'next/image';
import { AvatarProps } from '../interfaces';

const Avatar: React.FC<AvatarProps> = (AvatarProps): ReactElement => {
 const { src, className, alt } = AvatarProps;

 return (
  <div className='profile h-[25px] w-[25px] rounded-full overflow-hidden bg-red-100 flex items-center justify-center'>
   <Image src={src} className={className} alt={alt} width={50} height={50} />
  </div>
 )
}

export default Avatar
