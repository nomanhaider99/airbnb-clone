import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import EmptyState from "@/components/ui/empty-state";
import TripsClient from "@/components/ui/trips-client";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unautorized"
                subtitle="Please login"
             />
        )
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length == 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like your haven't reserve any trip."
             />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
         />
    )
}

export default TripsPage;