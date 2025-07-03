import { motion } from "framer-motion";

export default function transition(OgComponent) {
  return function TransitionComponent(props) {
    return (
      <>
        <OgComponent {...props} />
        <motion.div
          key={location.pathname}
          className="fixed top-0 left-0 w-full h-screen bg-electric-violet-600 z-50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </>
    );
  };
}
