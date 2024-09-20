import getCurrentUser from '@/actions/get-current-user';
import getListingById from '@/actions/get-listingbyid';
import getReservations from '@/actions/get-reservations';
import EmptyState from '@/components/ui/empty-state';
import ListingClient from '@/components/ui/listing-client';
import React from 'react';

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams}) => {
  const reservations = await getReservations(params);
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return <EmptyState />
  }
  return (
    <ListingClient 
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default ListingPage