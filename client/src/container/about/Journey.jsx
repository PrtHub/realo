import { Header } from "../../components";

const Journey = () => {
  return (
    <section className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-center gap-5 py-10 sm:py-20">
      <article className="w-full md:w-[60%] h-full flex flex-col items-start justify-start gap-8">
        <img
          src="/abstracts.png"
          alt="abstracts"
          className="object-cover w-10 -mb-5"
          loading="lazy"
        />
        <Header
          title="Our Journey"
          description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
        />
        <div className="hidden xl:flex gap-2 2xl:gap-5 items-center">
          <Card title="200+" description="Happy Customers" />
          <Card title="10k+" description="Properties for client" />
          <Card title="16+" description="Years of experience" />
        </div>
      </article>
      <figure className="w-full md:w-[40%] h-full">
        <img
          src="/about.png"
          alt="about hero"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </figure>
    </section>
  );
};

export default Journey;

// eslint-disable-next-line react/prop-types
const Card = ({ title, description }) => (
  <div className="w-fit h-36 rounded-lg bg-dark-2 border border-dark-3 text-white flex flex-col items-start justify-center pl-5 pr-5 2xl:pr-10 gap-2 hover:bg-dark-1 transition-all duration-200 ease-in-out">
    <h1 className="font-semibold text-4xl">{title}</h1>
    <p className="text-lg text-gray-2 font-medium capitalize whitespace-nowrap">
      {description}
    </p>
  </div>
);
