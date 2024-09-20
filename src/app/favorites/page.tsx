import getCurrentUser from "@/actions/get-current-user";
import getFavoriteListings from "@/actions/get-favorite-listings";
import EmptyState from "@/components/ui/empty-state";
import FavortieClient from "@/components/ui/favorite-client";

const Listingpage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unautorized"
                subtitle="Please login"
             />
        )
    }

    if (listings.length == 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings"
            />
        )
    }

    return (
        <FavortieClient
            listings={listings}
            currentUser={currentUser}
         />
    )
}

export default Listingpage;