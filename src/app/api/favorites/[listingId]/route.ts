import getCurrentUser from "@/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])]; // Change to const

    favoriteIds.push(listingId); // This line remains as it is

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])]; // Change to const

    const updatedFavoriteIds = favoriteIds.filter((id) => id !== listingId); // Use a new variable for the updated list

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds: updatedFavoriteIds,
        },
    });

    return NextResponse.json(user);
}
