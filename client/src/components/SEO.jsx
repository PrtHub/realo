/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

export const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams." />
    </Helmet>
  );
};
