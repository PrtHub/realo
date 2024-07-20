import { Loader2, Search } from "lucide-react";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../utils/customStyles";
import toast from "react-hot-toast";
import PropertyCard from "../components/PropertyCard";
import { debounce } from "../utils/debounce";

const propertyTypeOptions = [
  { value: "all", label: "All" },
  { value: "rent", label: "Rent" },
  { value: "sale", label: "Sale" },
];

const sortByOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState(null);
  const [furnished, setFurnished] = useState(null);
  const [parking, setParking] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    const propertyTypeFromUrl = urlParams.get("propertyType");
    if (propertyTypeFromUrl) {
      setPropertyType(
        propertyTypeOptions.find(
          (option) => option.value === propertyTypeFromUrl
        )
      );
    }

    const furnishedFromUrl = urlParams.get("furnished");
    if (furnishedFromUrl) {
      setFurnished(furnishedFromUrl === "true");
    }

    const parkingFromUrl = urlParams.get("parking");
    if (parkingFromUrl) {
      setParking(parkingFromUrl === "true");
    }

    const sortByFromUrl = urlParams.get("sortBy");
    if (sortByFromUrl) {
      setSortBy(sortByOptions.find((option) => option.value === sortByFromUrl));
    }
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const urlParams = new URLSearchParams(window.location.search);

      if (propertyType) {
        urlParams.set("type", propertyType.value);
      }
      if (furnished !== null) {
        urlParams.set("furnished", furnished);
      }
      if (parking !== null) {
        urlParams.set("parking", parking);
      }
      if (sortBy) {
        urlParams.set("sort", sortBy.value === "newest" ? "createdAt" : sortBy.value === "oldest" ? "createdAt" : sortBy.value === "lowToHigh" ? "regularPrice" : "regularPrice");
        urlParams.set("order", sortBy.value === "newest" || sortBy.value === "lowToHigh" ? "asc" : "desc");
      }

      const res = await fetch(`/api/property/all-properties?${urlParams.toString()}`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.error);
        toast.error(data.error);
        return;
      }
      setProperties(data);
    } catch (error) {
      setError(error.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [propertyType, furnished, parking, sortBy]);

  useEffect(() => {
    const debouncedFetchProperties = debounce(fetchProperties, 500);
    debouncedFetchProperties();
  }, [searchTerm, fetchProperties]);

  const updateUrlParams = (key, value) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (value !== null) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUrlParams("searchTerm", searchTerm);
    fetchProperties();
  };

  const handlePropertyTypeChange = (selectedOption) => {
    setPropertyType(selectedOption);
    updateUrlParams("propertyType", selectedOption ? selectedOption.value : "");
    fetchProperties();
  };

  const handleFurnishedChange = (isFurnished) => {
    setFurnished(isFurnished);
    updateUrlParams("furnished", isFurnished);
    fetchProperties();
  };

  const handleParkingChange = (isParking) => {
    setParking(isParking);
    updateUrlParams("parking", isParking);
    fetchProperties();
  };

  const handleSortByChange = (selectedOption) => {
    setSortBy(selectedOption);
    updateUrlParams("sortBy", selectedOption ? selectedOption.value : "");
    fetchProperties();
  };

  return (
    <Wrapper>
      <main className="w-full h-full flex flex-col items-start justify-start gap-20 my-20">
        <section className="w-full h-full py-10">
          <Header
            title="Find Your Dream Property"
            description="Welcome to Realo, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey begins here."
          />
        </section>
        <div className="w-full h-[0.5px] bg-dark-3" />
        <section className="w-full h-full flex flex-col items-center justify-start">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-3xl bg-dark-2 p-2 rounded-md flex -mt-[115px]"
          >
            <input
              type="text"
              placeholder="Search For a Property"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-1 border border-dark-3 px-2 text-gray-2 placeholder:text-gray-2/50 py-4 outline-none"
            />
            <button
              type="submit"
              className="bg-purple-1 rounded-md px-4 text-white font-medium whitespace-nowrap flex items-center gap-1"
            >
              <Search className="size-5" /> <span className="hidden sm:block">Find Property</span>
            </button>
          </form>
          <form className="bg-dark-2 p-2 rounded-md w-full flex flex-col sm:flex-row items-center justify-center gap-5 max-w-sm sm:max-w-2xl mx-auto -mt-1">
            <Select
              className="w-full text-base"
              options={propertyTypeOptions}
              placeholder="Property Type"
              value={propertyType}
              onChange={handlePropertyTypeChange}
              styles={customStyles}
            />
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-2 md:gap-4">
              <div className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  checked={furnished}
                  onChange={(e) => handleFurnishedChange(e.target.checked)}
                  className="appearance-none w-4 h-4 bg-dark-1 border border-dark-3 rounded-md checked:bg-purple-1 checked:border-purple-1 focus:outline-none focus:ring-2 focus:ring-purple-1 focus:ring-opacity-50 cursor-pointer"
                />
                <label className="text-gray-2 cursor-pointer">Furnished</label>
              </div>
              <div className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  checked={parking}
                  onChange={(e) => handleParkingChange(e.target.checked)}
                  className="appearance-none w-4 h-4 bg-dark-1 border border-dark-3 rounded-md checked:bg-purple-1 checked:border-purple-1 focus:outline-none focus:ring-2 focus:ring-purple-1 focus:ring-opacity-50 cursor-pointer"
                />
                <label className="text-gray-2 cursor-pointer">Parking</label>
              </div>
            </div>
            <Select
              className="w-full text-base"
              options={sortByOptions}
              placeholder="Sort By"
              value={sortBy}
              onChange={handleSortByChange}
              styles={customStyles}
            />
          </form>
        </section>
        <section className="w-full h-full flex flex-col gap-10 items-start my-10 lg:my-20">
          <img
            src="/abstracts.png"
            alt="abstracts"
            className="object-cover w-10 -mb-5"
            loading="lazy"
          />
          <Header
            title="Discover a World of Possibilities"
            description="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home."
          />
          <section className="mt-5 w-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 2xl:gap-10">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
            {loading && (
              <Loader2 className="animate-spin size-5 text-white mx-auto" />
            )}
            {error && (
              <p className="text-red-500 text-base mx-auto font-medium">
                {error}
              </p>
            )}
          </section>
        </section>
      </main>
    </Wrapper>
  );
};

export default Properties;