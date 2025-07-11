import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

export function MagicCard({
  children,
  className = "",
  gradientSize = 200,
  gradientColor = "#262626",
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className={cn(
        "group relative flex size-full h-full overflow-hidden rounded-xl bg-transparent text-neutral-950 backdrop-blur-[1px] transition duration-300",
        className
      )}
    >
      <div className="relative flex flex-col justify-between gap-8 w-full h-full z-10">
        {children}
      </div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
					`,
        }}
      />
    </div>
  );
}
