import { prisma } from "@/lib/prisma";

interface IParams {
    listingId: string;
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return listing;
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}
