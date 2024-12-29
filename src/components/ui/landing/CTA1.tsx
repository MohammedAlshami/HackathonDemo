import { motion } from "framer-motion";
import Contact from "./Contact";
const CTA1 = () => {
  // Define animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="py-28 bg-gradient-to-b from-transparent to-teal-500/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariant}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8 sm:flex items-center">
        <motion.div
          className="max-w-xl space-y-3 md:mx-auto"
          variants={textVariant}
        >
          <h3 className="text-indigo-600 font-semibold">
            Advanced Agricultural Solutions
          </h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Build a smarter future with Drangue
          </p>
          <p className="text-gray-600">
            Discover how our AI-driven tools can optimize your plantation
            operations, ensuring precision, safety, and efficiency like never
            before.
          </p>
        </motion.div>
        <motion.div className="mt-4 text-center" variants={buttonVariant}>
          <Contact />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA1;
