import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../components";
import { useEffect, useState } from "react";
import {
  BathIcon,
  BedSingle,
  House,
  Loader2,
  MapPin,
  ParkingMeter,
} from "lucide-react";
import EmblaCarousel from "../components/carousel/Carousel";
import { useSelector } from "react-redux";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [owner, setOwner] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTheProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/property/get-property/${id}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }
        setProperty(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTheProperty();
  }, [id]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${property?.userRef}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOwner();
  }, [property?.userRef]);

  console.log(owner);

  const OPTIONS = { slidesToScroll: "auto" };
  const SLIDES = property?.imageUrls;

  if (loading) {
    return (
      <div className="w-full h-screen">
        <Loader2 className="animate-spin mt-40 text-center mx-auto size-5 text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500 text-base font-medium">{error}</p>
      </div>
    );
  }

  return (
    <Wrapper>
      {property && (
        <main className="w-full h-full flex flex-col items-start justify-start gap-10 text-white my-10 md:my-20">
          <section className="w-full h-full bg-dark-2 border border-dark-3 p-2 sm:p-5 lg:p-10 rounded-md ">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </section>
          <section className="w-full h-full bg-transparent border border-dark-3 rounded-md px-2 py-5 sm:p-5 md:p-10 flex flex-col gap-5 items-start justify-start">
            <div className="w-full flex justify-between items-center">
              <p className="bg-dark-1 border border-dark-3 p-2 rounded-lg flex gap-1 items-center text-white font-medium">
                <MapPin className="size-4" />
                {property.address}
              </p>
              <span className="flex flex-col items-start gap-1">
                <p className="text-base text-gray-2">Price</p>
                <h3 className="font-semibold text-lg">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(property.regularPrice)}
                  {property.type === "rent" && "/Month"}
                </h3>
              </span>
            </div>
            <section className="w-full flex items-center justify-start gap-5">
              <h1 className="font-semibold text-2xl">{property.name}</h1>

              <span className="bg-purple-1 px-4 py-1 text-sm rounded-md font-semibold text-white uppercase">
                For {property.type}
              </span>
            </section>
            <span className="space-y-2 mt-5">
              <h1 className="font-medium text-xl">Description</h1>
              <p className="text-gray-2">{property.description}</p>
            </span>
            <div className="w-full bg-dark-3 h-[1px]" />
            <section className="w-full flex items-center justify-start flex-wrap gap-10 lg:gap-20 my-5">
              <div className="flex flex-col gap-2 items-start justify-start">
                <span className=" gap-1 font-normal text-lg flex items-center text-gray-2">
                  <BedSingle className="text-gray-2  size-5" /> Bedrooms
                </span>
                <p className="text-2xl font-semibold">0{property.bedrooms}</p>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start">
                <span className=" gap-1 font-normal text-lg flex items-center text-gray-2">
                  <BathIcon className="text-gray-2  size-5" /> Bathrooms
                </span>
                <p className="text-2xl font-semibold">0{property.bathrooms}</p>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start">
                <span className=" gap-1 font-normal text-lg flex items-center text-gray-2">
                  <House className="text-gray-2  size-5" /> Furnished
                </span>
                <p className="text-2xl font-semibold">
                  {property.furnished ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start">
                <span className=" gap-1 font-normal text-lg flex items-center text-gray-2">
                  <ParkingMeter className="text-gray-2  size-5" /> Parking Spot
                </span>
                <p className="text-2xl font-semibold">
                  {property.parking ? "Yes" : "No"}
                </p>
              </div>
            </section>
            {currentUser && currentUser._id !== property.userRef && (
              <>
                <div className="w-full bg-dark-3 h-[0.5px]" />
                <section className="flex flex-col items-start justify-start gap-2">
                  <span className="font-medium text-base text-white">
                    Do you want to connect with the owner?
                  </span>
                  <Link
                    to={`mailto:${owner.email}?subject=Inquery About ${property.name}`}
                    className="font-medium bg-purple-1 px-4 py-2 rounded-md text-white hover:bg-purple-1/80 transition uppercase"
                  >
                    Click here
                  </Link>
                </section>
              </>
            )}
          </section>
        </main>
      )}
    </Wrapper>
  );
};

export default PropertyDetails;
