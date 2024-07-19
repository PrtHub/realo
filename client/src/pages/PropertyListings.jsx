import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Wrapper } from "../components";
import { Link } from "react-router-dom";
import { Edit, Loader2, Trash2Icon } from "lucide-react";

const PropertyListings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          toast.error(data.message);
          return;
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        toast.error("Something went wrong!");
      }
    };

    fetchListings();
  }, []);

  const handlePropertyDelete = async (propertyId) => {
    try {
      const res = await fetch(`/api/property/delete/${propertyId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setListings((prev) => prev.filter((list) => list._id !== propertyId));

      toast.success("Property deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Wrapper>
      <main className="w-full h-full my-20 flex flex-col gap-10 items-start justify-start">
        <div className="w-full flex items-center justify-between gap-10">
          <h1 className="text-white font-semibold text-3xl  capitalize">
            My Property Listings
          </h1>
          <Link
            to="/create-property"
            className="w-fit px-4 py-4  bg-white  rounded-lg font-semibold text-base text-center hover:bg-white/90 transition-all duration-200 ease-in-out text-dark-1 capitalize"
          >
            New Listing
          </Link>
        </div>
        {loading ? (
          <div className="mt-5 w-full flex items-center justify-center ">
            <Loader2 className="animate-spin text-white" />
          </div>
        ) : (
          <section className="w-full h-full flex flex-wrap items-start justify-start gap-10">
            {listings.length > 0 ? (
              listings.map((list, index) => (
                <section
                  key={index}
                  className="w-full max-w-sm h-fit flex flex-col items-start gap-2 bg-dark-2 border border-dark-3 p-3 rounded-md text-white relative"
                >
                  <img
                    src={list.imageUrls[0]}
                    alt={list.name}
                    loading="lazy"
                    className="w-full h-56 object-cover rounded-md"
                  />
                  <h1 className="text-xl font-medium mt-3 line-clamp-2">
                    {list.name}
                  </h1>
                  <p className="text-base font-normal text-gray-2 line-clamp-3">
                    {list.description}
                  </p>
                  <button
                    type="button"
                    //   onClick={() => handleImageDelete(index)}
                    className="bg-dark-1 hover:bg-dark-3 transition rounded p-1 absolute top-4 right-4 cursor-pointer "
                  >
                    <Edit className="size-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePropertyDelete(list._id)}
                    className="bg-red-600 hover:bg-red-500 transition rounded p-1 absolute top-12 right-4 cursor-pointer "
                  >
                    <Trash2Icon className="size-4 text-white" />
                  </button>
                </section>
              ))
            ) : (
              <div>You haven&apos;t list you property yet!</div>
            )}
          </section>
        )}
        {error && <p className="text-base text-red-500 font-medium">{error}</p>}
      </main>
    </Wrapper>
  );
};

export default PropertyListings;
