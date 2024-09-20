import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import EmptyState from "@/components/ui/empty-state";
import ReservationsClient from "@/components/ui/reservations-client";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState
                title="Unautorized"
                subtitle="Please login"
             />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length == 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your property"
             />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
         />
    )
}

export default ReservationsPage;