import { Link } from "react-router-dom";
import Header from "./Header";

const Cta = () => {
  return (
    <section className="bg-dark-1 w-full h-full py-20 relative mt-10">
      <div className="w-full h-full absolute top-0 left-0 right-0 z-0">
        <img
          src="/cta.png"
          alt="CTA map"
          className="w-full h-full object-cover z-0"
          loading="lazy"
        />
      </div>
      <section className=" w-full lg:w-[70%] h-full flex flex-col lg:flex-row items-center justify-between gap-10 z-10">
        <Header
          title="Start Your Real Estate Journey Today"
          description="Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance."
        />
        <Link to='/properties' className="bg-purple-1 hover:bg-purple-1/70 transition px-5 py-3 text-white font-medium rounded-lg whitespace-nowrap z-10 w-full lg:w-fit lg:absolute lg:right-0">
          Explore Properties
        </Link>
      </section>
    </section>
  );
};

export default Cta;
