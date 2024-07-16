import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <section className="w-full h-full bg-dark-2 px-5 py-5">
      <Wrapper>
        <footer className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-5">
          <span className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="realo logo"
              className="size-6 sm:size-10"
            />
            <h1 className="font-bold text-2xl sm:text-3xl text-white">Realo</h1>
          </span>
          <span className="flex sm:flex-row flex-col-reverse items-center gap-5 text-white lg:text-base text-sm">
            <p>@2024 Realo. All Rights Reserved.</p>
            <p>Terms & Conditions</p>
          </span>
        </footer>
      </Wrapper>
    </section>
  );
};

export default Footer;
