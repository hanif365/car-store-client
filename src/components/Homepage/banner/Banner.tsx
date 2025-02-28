import "./Banner.css";
import { Link as ScrollLink } from "react-scroll";

const Banner = () => {
  return (
    <div className="text-black text-center pt-36 md:pt-28 lg:pt-36 2xl:pt-52 pb-10 md:pb-0">
      <div className="px-2 md:px-0">
        <h1 className="text-4xl text-brand-secondary leading-10 md:text-6xl md:leading-[4rem] lg:text-7xl lg:leading-[5rem] 2xl:text-8xl 2xl:leading-[8rem] font-extrabold mb-8">
          Find Your Dream Car <br /> With{" "}
          <span className="text-brand-primary">CarStore</span>
        </h1>
        <p className="text-2xl text-brand-secondary">
          Discover the perfect vehicle that matches your style and needs
        </p>

        <ScrollLink
          to="featured-cars"
          smooth={true}
          duration={500}
          offset={-50}
          className="explore_btn inline-block mt-12 px-10 py-5 relative border uppercase font-semibold tracking-wider leading-none overflow-hidden bg-brand-secondary rounded-md text-white cursor-pointer"
          type="button"
        >
          <span className="absolute inset-0 bg-brand-primary"></span>
          <span className="absolute inset-0 flex justify-center items-center font-bold">
            Explore Cars
          </span>
          Explore Cars
        </ScrollLink>
      </div>

      <div className="h-screen bg-[url('/bg_hero.png')] bg-center bg-cover bg-no-repeat mt-[-120px] relative -z-10 hidden md:block">
        <div className="animate-bus absolute right-20 bottom-36">
          <img
            src="/bus.png"
            alt="Running bus"
            width={600}
            height={600}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
