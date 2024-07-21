import { Link } from "react-router-dom";
import Cta from "../components/Cta";
import Wrapper from "../components/Wrapper";
import { SEO } from "../components";
import { NewestProperties, PropertiesForRent, PropertiesForSale } from "../container/home";

const Home = () => {
  return (
    <>
    <SEO title='Realo'/>
      <Wrapper>
        <section className="w-full h-full flex flex-col">
          <section className="w-full h-full md:h-[500px] xl:h-[700px] bg-dark-1 flex flex-col-reverse md:flex-row items-center justify-center gap-5 py-10 md:py-0">
            <article className="w-full md:w-1/2 h-full flex flex-col items-start justify-center gap-8">
              <h1 className="text-white font-semibold leading-[120%] text-3xl md:text-4xl xl:text-6xl">
                Discover Your Dream <br /> Property with Realo
              </h1>
              <p className="text-gray-2 text-base sm:text-lg">
                Your journey to finding the perfect property begins here.
                Explore our listings to find the home that matches your dreams.
              </p>
              <span className="flex gap-4 items-center">
                <Link to='/about' className="border border-gray-1 hover:bg-dark-2 transition px-5 py-3 rounded-lg text-white font-medium">
                  Learn More
                </Link>
                <Link to='/properties' className="bg-purple-1 hover:bg-purple-1/70 transition px-5 py-3 text-white font-medium rounded-lg">
                  Browse Properties
                </Link>
              </span>
              <div className="hidden xl:flex gap-2 2xl:gap-5 items-center">
                <Card title="200+" description="Happy Customers" />
                <Card title="10k+" description="Properties for client" />
                <Card title="16+" description="Years of experience" />
              </div>
            </article>
            <figure className="w-full md:w-1/2 h-full">
              <img
                src="/hero.png"
                alt="hero"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
          </section>
          <section className="w-full h-full bg-dark-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 rounded-lg">
             <div className="border border-dark-3 hover:bg-dark-1 transition rounded-lg flex flex-col items-center justify-center gap-4 p-5">
              <img src="/home.png" alt="home" loading="lazy" className="size-16 object-cover"/>
              <h4 className="font-medium text-base text-white text-center">Find Your Dream Home</h4>
             </div>
             <div className="border border-dark-3 hover:bg-dark-1 transition rounded-lg flex flex-col items-center justify-center gap-4 p-5">
              <img src="/value.png" alt="value" loading="lazy" className="size-16 object-cover"/>
              <h4 className="font-medium text-base text-white text-center">Unlock Property Value</h4>
             </div>
             <div className="border border-dark-3 hover:bg-dark-1 transition rounded-lg flex flex-col items-center justify-center gap-4 p-5">
              <img src="/property.png" alt="property" loading="lazy" className="size-16 object-cover"/>
              <h4 className="font-medium text-base text-white text-center">Effortless Property Management</h4>
             </div>
             <div className="border border-dark-3 hover:bg-dark-1 transition rounded-lg flex flex-col items-center justify-center gap-4 p-5">
              <img src="/invest.png" alt="invest" loading="lazy" className="size-16 object-cover"/>
              <h4 className="font-medium text-base text-white text-center">Smart Investments, Informed Decisions</h4>
             </div>
             
          </section>
          <NewestProperties/>
           <PropertiesForRent/>
           <PropertiesForSale/>
          <Cta />
        </section>
      </Wrapper>
    </>
  );
};

export default Home;

// eslint-disable-next-line react/prop-types
const Card = ({ title, description }) => (
  <div className="w-fit h-36 rounded-lg bg-dark-2 border border-dark-3 text-white flex flex-col items-start justify-center pl-5 pr-5 2xl:pr-10 gap-2 hover:bg-dark-1 transition-all duration-200 ease-in-out">
    <h1 className="font-semibold text-4xl">{title}</h1>
    <p className="text-lg text-gray-2 font-medium capitalize whitespace-nowrap">
      {description}
    </p>
  </div>
);
