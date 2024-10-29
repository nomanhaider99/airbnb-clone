import { prisma } from "@/lib/prisma";
import getCurrentUser from "./get-current-user";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }
        const favorites = await prisma.listing.findMany({
            where : {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        return favorites;
    } catch (error) {
        throw new Error(error as string);
    }
}