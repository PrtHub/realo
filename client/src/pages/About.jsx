import { SEO, Wrapper } from "../components";
import Cta from "../components/Cta";
import { Achievement, Journey, Values } from "../container/about";

const About = () => {
  return (
    <>
      <SEO title="About - Realo" />
      <Wrapper>
        <section className="w-full h-full ">
          <Journey />
          <Values />
          <Achievement />
          <Cta />
        </section>
      </Wrapper>
    </>
  );
};

export default About;
