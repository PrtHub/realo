import Cta from "../components/Cta";
import Wrapper from "../components/Wrapper";

const Home = () => {
  return (
    <>
      <Wrapper>
        <section className="w-full h-full flex flex-col">
        <section className="w-full h-full bg-dark-1 flex items-center justify-center gap-5 ">
          <article className="w-1/2 h-full flex flex-col items-start justify-start gap-8">
            <h1 className="text-white font-semibold leading-[120%] text-6xl">
              Discover Your Dream <br /> Property with Realo
            </h1>
            <p className="text-gray-2 text-lg">
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>
            <span className="flex gap-4 items-center">
              <button className="border border-gray-1 hover:bg-dark-2 transition px-5 py-3 rounded-lg text-white font-medium">
                Learn More
              </button>
              <button className="bg-purple-1 hover:bg-purple-1/70 transition px-5 py-3 text-white font-medium rounded-lg">
                Browse Properties
              </button>
            </span>
            <div className="hidden xl:flex gap-2 2xl:gap-5 items-center">
              <Card title="200+" description="Happy Customers" />
              <Card title="10k+" description="Properties for client" />
              <Card title="16+" description="Years of experience" />
            </div>
          </article>
          <figure className="w-1/2 h-full">
            <img
              src="/hero.png"
              alt="hero"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        </section>
      <div className="w-full h-10 bg-dark-2 "></div>
        <Cta/>
        </section>
      </Wrapper>
    </>
  );
};

export default Home;

// eslint-disable-next-line react/prop-types
const Card = ({ title, description }) => (
  <div className="w-fit h-36 rounded-lg bg-dark-2 border border-dark-3 text-white flex flex-col items-start justify-center pl-5 pr-5 2xl:pr-10 gap-2">
    <h1 className="font-semibold text-4xl">{title}</h1>
    <p className="text-lg text-gray-2 font-medium capitalize whitespace-nowrap">
      {description}
    </p>
  </div>
);
