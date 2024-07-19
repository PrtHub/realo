/* eslint-disable react/prop-types */

const Wrapper = ({ children }) => {
  return (
    <main className="w-full h-full max-w-[1920px] mx-auto px-2 sm:px-5 lg:px-10">
      {children}
    </main>
  );
};

export default Wrapper;
