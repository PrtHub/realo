const SekeletonLoader = () => {
  return (
    <div className="w-full h-fit  border border-dark-2 rounded-md flex flex-col gap-3 p-2">
      <div className="w-full h-48 sm:h-56 bg-dark-2 rounded-md animate-pulse"></div>
      <div className="w-[40%] h-4 rounded-md bg-dark-2 animate-pulse  mt-1"></div>
      <div className="w-[80%] h-4 rounded-md bg-dark-2 animate-pulse"></div>
      <div className="w-[100%] h-10 rounded-md bg-dark-2 animate-pulse"></div>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="w-[50%] sm:w-[40%] h-5 rounded-md bg-dark-2 animate-pulse"></div>
        <div className="w-[40%] h-5 rounded-md bg-dark-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SekeletonLoader;
