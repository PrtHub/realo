import { useEffect, useState } from "react";
import { Header } from "../../components";
import PropertyCard from "../../components/PropertyCard";
import SkeletonLoader from "../../components/SekeletonLoader";

const PropertiesForRent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/property/all-properties?type=rent`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.error);
          return;
        }
        setProperties(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="mt-20 mb-10 flex items-start flex-col gap-10">
      <div className="flex flex-col items-start gap-5">
        <img
          src="/abstracts.png"
          alt="abstracts"
          className="object-cover w-10"
          loading="lazy"
        />
        <Header
          title="Properties For Rent"
          description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Realo."
        />
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 2xl:gap-10 justify-center">
        {loading ? (
          <>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
          </>
        ) : error ? (
          <p className="text-red-500 text-base mx-auto">{error}</p>
        ) : properties.length < 1 ? (
          <p className="text-base font-medium text-white">
            No Property Available
          </p>
        ) : (
          properties
            .slice(0, 4)
            .map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
        )}
      </div>
    </section>
  );
};

export default PropertiesForRent;
