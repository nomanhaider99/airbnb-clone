import { prisma } from "@/lib/prisma";

export interface IListingsParams {
    userId?: string;
}

interface Query {
    userId?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { userId } = params;

        const query: Query = {}; // Use const and define a specific type
        
        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings;
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}
