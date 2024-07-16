import { Header } from "../../components";

const Achievement = () => {
  return (
    <section className="py-10 w-full h-full flex flex-col items-start justify-start gap-10">
      <div className="flex flex-col items-start gap-5">
        <img
          src="/abstracts.png"
          alt="abstracts"
          className="object-cover w-10"
          loading="lazy"
        />
        <Header
          title={"Our Achievements"}
          description={
            "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
          }
        />
      </div>
      <section className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card
          title="3+ Years of Excellence"
          description="With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate."
        />
        <Card
          title="Happy Clients"
          description="Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do."
        />
        <Card
          title="Industry Recognition"
          description="We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence."
        />
      </section>
    </section>
  );
};

export default Achievement;

// eslint-disable-next-line react/prop-types
const Card = ({ title, description }) => (
  <div className="flex flex-col items-start justify-start gap-5 p-8 bg-dark-1 border border-dark-3 rounded-lg text-white hover:bg-dark-2 transition-all duration-200 ease-in-out">
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h1>
    <p className="text-gray-2">{description}</p>
  </div>
);
