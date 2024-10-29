import { prisma } from "@/lib/prisma";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

// Define a type for the query object
interface Query {
    listingId?: string;
    userId?: string;
    listing?: {
        userId?: string;
    };
}

export default async function getReservations(params: IParams) {
    const { listingId, userId, authorId } = params;

    const query: Query = {}; // Use the defined Query type

    if (listingId) {
        query.listingId = listingId;
    }
    if (userId) {
        query.userId = userId;
    }
    if (authorId) {
        query.listing = { userId: authorId }; // Set listing.userId
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return reservations;
}
