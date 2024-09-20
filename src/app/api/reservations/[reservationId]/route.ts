import getCurrentUser from "@/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentuser = await getCurrentUser();
    if (!currentuser) {
        return NextResponse.error();
    }

    const { reservationId } = params;
    
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentuser.id },
                { listing: { userId: currentuser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}