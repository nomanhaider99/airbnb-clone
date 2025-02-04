import getCurrentUser from "@/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
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

    const listings = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listings);
}