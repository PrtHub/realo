import { useEffect, useState } from "react";
import { Header } from "../../components";
import { Loader2 } from "lucide-react";
import PropertyCard from "../../components/PropertyCard";

const PropertiesForSale = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/property/all-properties?type=sale`);
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
    <section className="my-20 flex items-start flex-col gap-10">
      <div className="flex flex-col items-start gap-5">
        <img
          src="/abstracts.png"
          alt="abstracts"
          className="object-cover w-10"
          loading="lazy"
        />
        <Header
          title="Properties For Sale"
          description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Realo."
        />
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 2xl:gap-10 justify-center">
        {loading ? (
          <Loader2 className="animate-spin size-4 text-white flex items-center justify-center" />
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

export default PropertiesForSale;