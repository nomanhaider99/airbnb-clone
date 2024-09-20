import { prisma } from "@/lib/prisma";
import { list } from "postcss";

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
    } catch (error) {
        throw new Error(error as any);
    }
}