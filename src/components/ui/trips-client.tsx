'use client';
import { Reservation, User } from '@prisma/client';
import React, { useCallback, useState } from 'react';
import Container from '../widgets/container';
import Heading from './Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from './listing-card';

interface TripsClientProps {
    reservations: Reservation[],
    currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.error);
        }).finally(() => {
            setDeletingId('');
        })
    }, [router])
  return (
    <Container>
        <Heading
            title='Trips'
            subTitle="Where you've been and where you're going"
         />
         <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[19vw]'>
            {reservations.map((reservation) => (
                <ListingCard
                    key={reservation.id}
                    data={reservation.listingId as any}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId == reservation.id}
                    actionLabel='Cancel Reservation'
                    currentUser={currentUser}
                 />
            ))}
         </div>
    </Container>
  )
}

export default TripsClient