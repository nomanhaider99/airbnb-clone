import Image from 'next/image';
import React from 'react'

interface AvatarProps {
  src: string | null | undefined;
  
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <>
      <Image
        src={src as any}
        width={35}
        height={35}
        alt='user-image'
        className='rounded-full'
       />
    </>
  )
}

export default Avatar