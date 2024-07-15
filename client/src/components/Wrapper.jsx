/* eslint-disable react/prop-types */

const Wrapper = ({ children }) => {
  return (
    <main className="w-full h-full max-w-[1920px] mx-auto px-10 lg:px-5">
      {children}
    </main>
  );
};

export default Wrapper;
