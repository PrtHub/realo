/* eslint-disable react/prop-types */
const Header = ({title, description}) => {
  return (
    <section className="w-full flex items-start justify-start flex-col gap-5 z-10">
      <h1 className="text-3xl 2xl:text-5xl  sm:text-4xl font-semibold leading-snug text-white">
        {title}
      </h1>
      <p className="text-gray-2 text-base sm:text-lg">{description}</p>
    </section>
  );
};

export default Header;
