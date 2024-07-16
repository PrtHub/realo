import { Wrapper } from "../components";
import Cta from "../components/Cta";
import {
  Achievement,
  Journey,
  Values,
} from "../container/about";

const About = () => {
  return (
    <Wrapper>
      <section className="w-full h-full ">
        <Journey />
        <Values />
        <Achievement />
       <Cta/>
      </section>
    </Wrapper>
  );
};

export default About;
