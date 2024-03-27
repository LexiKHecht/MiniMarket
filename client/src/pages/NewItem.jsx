import ListingForm from "../components/ListingForm";

  
const NewItem = () => {
  
  return (
    <section className="dark:bg-offBlack h-full">
        <h1 className="banner flex flex-wrap justify-center content-center border-b-2 border-palePurple shadow-lg h-40 mb-5 font-bold text-2xl drop-shadow-lg dark:bg-of">Create a new Listing!</h1>
        <ListingForm />
    </section>
  );
};

export default NewItem;