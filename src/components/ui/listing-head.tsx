'use client';
import { User } from '@prisma/client';
import React from 'react';
import useCountries from '../hooks/useCountrys';
import Heading from './Heading';
import Image from 'next/image';
import HeartButton from './heart-button';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: User | null; 
}


const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);  
  return (
    <>
        <Heading
            title={title}
            subTitle={`${location?.region}, ${location?.label}`}
         />
         <div className='w-full h-[75vh] overflow-hidden rounded-xl relative'>
            <Image
                alt='Image'
                src={imageSrc}
                fill
                className='object-cover w-full'
             />
             <div className='absolute top-5 right-5'>
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                 />
             </div>
         </div>
    </>
  )
}

export default ListingHead