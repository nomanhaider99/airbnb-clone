import { Listing, User } from '@prisma/client';
import React from 'react';
import Container from '../widgets/container';
import Heading from './Heading';
import ListingCard from './listing-card';

interface FavortieClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

const FavortieClient: React.FC<FavortieClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading
            title='Favorites'
            subTitle='List of place you have favorited'
         />
         <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[19vw]'>
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    currentUser={currentUser}
                    data={listing}
                 />
            ))}
         </div>
    </Container>
  )
}

export default FavortieClient