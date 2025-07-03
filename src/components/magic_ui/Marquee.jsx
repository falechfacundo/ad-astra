import { cn } from "../../lib/utils.js";
import { motion } from "framer-motion";

const MarqueeAnimationVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 3,
      ease: "easeInOut",
    },
  },
};

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <motion.div
      {...props}
      initial="hidden"
      whileInView="show"
      variants={MarqueeAnimationVariants}
      viewport={{ once: true }}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.6rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </motion.div>
  );
}
