/* eslint-disable react/prop-types */
import { GraduationCap, Star, Users } from "lucide-react";
import { Header } from "../../components";

const Values = () => {
  return (
    <section className="py-10 sm:py-20 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10">
      <article className="w-full lg:w-[40%] h-full flex flex-col items-start gap-5">
        <img
          src="/abstracts.png"
          alt="abstracts"
          className="object-cover w-10"
          loading="lazy"
        />
        <Header
          title="Our Values"
          description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        />
      </article>
      <section className="w-full lg:w-[60%] h-full bg-dark-1 border-2 border-dark-3 rounded-lg p-5 lg:p-10 flex flex-col gap-5 hover:border-[5px] transition-all duration-200 ease-in-out">
        <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-0 my-5 sm:my-0">
          <Part
            title="Trust"
            description="Trust is the cornerstone of every successful real estate transaction."
            icon={Star}
          />
          <div className="sm:w-1 sm:h-40 w-full h-[1px] border-dark-3 border-b sm:border-l" />
          <Part
            title="Excellence"
            description="We set the bar high for ourselves. From the properties we list to the services we provide."
            icon={GraduationCap}
          />
        </div>
        <div className="w-full h-[1px] bg-dark-3" />
        <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-0 my-5 sm:my-0">
          <Part
            title="Client-Centric"
            description="Your dreams and needs are at the center of our universe. We listen, understand."
            icon={Users}
          />
         <div className="sm:w-1 sm:h-40 w-full h-[1px] border-dark-3 border-b sm:border-l" />
          <Part
            title="Our Commitment"
            description="We are dedicated to providing you with the highest level of service, professionalism, and support."
            icon={Star}
          />
        </div>
      </section>
    </section>
  );
};

export default Values;

const Part = ({ title, description, icon: Icon }) => (
  <div className="w-full flex flex-col items-start justify-start gap-2 px-5">
    <div className="flex items-center gap-2">
      <span className="size-12 lg:size-14 rounded-full border border-purple-2 flex items-center justify-center">
        <Icon className="text-purple-2" />
      </span>
      <h1 className="text-lg lg:text-xl font-semibold text-white">{title}</h1>
    </div>
    <p className="text-gray-2 font-medium line-clamp-2">{description}</p>
  </div>
);
