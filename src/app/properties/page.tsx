import getCurrentUser from "@/actions/get-current-user";
import getListings from "@/actions/get-listings";
import getReservations from "@/actions/get-reservations";
import EmptyState from "@/components/ui/empty-state";
import PropertiescClient from "@/components/ui/properties-client";
import TripsClient from "@/components/ui/trips-client";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unautorized"
                subtitle="Please login"
             />
        )
    }

    const listing = await getListings({ userId: currentUser.id });

    if (listing.length == 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like your have no properites."
             />
        )
    }

    return (
        <PropertiescClient
            listings={listing}
            currentUser={currentUser}
         />
    )
}

export default PropertiesPage;