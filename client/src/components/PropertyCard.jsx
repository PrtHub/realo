/* eslint-disable react/prop-types */
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div
      key={property._id}
      className="w-full h-fit flex flex-col items-start gap-2 bg-dark-1 border border-dark-3 p-2 sm:p-4 rounded-md text-white"
    >
      <img
        src={property.imageUrls[0]}
        alt={property.name}
        loading="lazy"
        className="w-full h-48 sm:h-56 object-cover rounded-md"
      />
      <p className="mt-1 sm:mt-2 truncate text-xs sm:text-sm flex items-center gap-1 bg-dark-2 rounded-2xl px-3 py-1 border border-dark-3">
        <MapPin className="size-2 sm:size-3" />
        {property.address}
      </p>
      <h1 className="text-base sm:text-lg lg:text-xl font-medium mt-1 line-clamp-1">{property.name}</h1>
      <p className="text-xs sm:text-sm md:text-base font-normal text-gray-2 line-clamp-2">
        {property.description}
      </p>
      <span className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-5 mt-1 sm:mt-4">
        <p className="text-sm sm:text-base font-semibold text-white">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(property.regularPrice)}
          {property.type === "rent" && "/Month"}
        </p>
        <Link
          to={`/property/${property._id}`}
          className="bg-purple-1 px-3 sm:px-5 py-2 sm:py-2 rounded-md text-white font-medium text-xs sm:text-base"
        >
          View Details
        </Link>
      </span>
    </div>
  );
};

export default PropertyCard;
