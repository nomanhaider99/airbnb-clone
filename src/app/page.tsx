import getCurrentUser from "@/actions/get-current-user";
import getListings, { IListingsParams } from "@/actions/get-listings";
import EmptyState from "@/components/ui/empty-state";
import ListingCard from "@/components/ui/listing-card";
import Container from "@/components/widgets/container";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  console.log('Listings:', listings);
  console.log('Current User:', currentUser);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[18vw]">
        {listings.map((item) => {
          return (
            <ListingCard currentUser={currentUser} key={item.id} data={item} />
          )
        })}
      </div>
    </Container>
  );
}

export default Home;
