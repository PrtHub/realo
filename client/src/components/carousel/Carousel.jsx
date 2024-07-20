/* eslint-disable react/prop-types */
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./DotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowBotton";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide rounded-lg" key={index}>
              <img
                src={index}
                alt=""
                className="w-full h-[350px] sm:h-[500px] 2xl:h-[700px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-fit mx-auto flex items-center justify-center gap-1 bg-dark-1 px-2 py-[0.4px] rounded-full mt-5 sm:mt-10">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"w-6 h-1 rounded-lg border-2 border-dark-3  bg-dark-3".concat(
                index === selectedIndex ? "border-2 border-purple-1 bg-purple-1" : ""
              )}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
