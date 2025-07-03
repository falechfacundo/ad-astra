import { cn } from "../../lib/utils.js";
import BlurFade from "./BlurFade.jsx";

export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "col-span-full grid w-full md:grid-cols-5 md:grid-rows-5 lg:grid-rows-none lg:grid-cols-4 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  Icon,
  name,
  className,
  background,
  description,
  href,
  cta,
}) => (
  <BlurFade
    key={name}
    delay={0.25 * 0.05}
    inView
    className={cn(
      "group relative col-span-3 flex flex-col justify-between backdrop-blur-[0.85px] overflow-hidden rounded-xl hover:bg-electric-violet-200 transition-colors duration-300 ease-in",
      "bg-transparent border-1.5",
      className
    )}
  >
    {Icon && (
      <Icon className="h-12 w-12 origin-left transform-gpu absolute top-6 right-4" />
    )}
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 ease-in group-hover:scale-[103%] group-hover:translate-x-2 group-hover:-translate-y-2">
      <h3 className="text-2xl font-normal text-neutral-900">{name}</h3>
      <div className="max-w-lg text-lg font-light text-neutral-800">
        {description}
      </div>
    </div>
  </BlurFade>
);
