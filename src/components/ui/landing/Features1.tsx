import { motion } from "framer-motion";

const Features1 = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H9.75a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125-1.125H16.5V4.125z"
          />
        </svg>
      ),
      title: "AI-Powered Fruit Detection",
      desc: "Drangue uses AI to detect fruit ripeness accurately, reducing manual labor and guesswork.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: "Real-Time Monitoring",
      desc: "Monitor plantation operations and worker progress through an intuitive dashboard.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: "Smart Tools for Safety",
      desc: "Innovative lightweight poles and drones ensure worker safety while maximizing efficiency.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
        className="rotate-180"
      >
        <svg
          viewBox="0 0 500 148"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0C62.07 99.4 344.8 16.12 500 148H0V0Z"
            fill="currentColor"
            className="stroke-none fill-current text-teal-500"
          />
        </svg>
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 sm:py-24 pt-32 sm:pt-64">
        <motion.div className="max-w-xl space-y-3" variants={itemVariants}>
          <h3 className="text-indigo-600 font-semibold">Features</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Do more with less complexity
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            congue, nisl eget molestie varius
          </p>
        </motion.div>
        <motion.div className="mt-12" variants={sectionVariants}>
          <ul className="grid gap-x-12 divide-y sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:grid-cols-3 lg:gap-x-0">
            {features.map((item, idx) => (
              <motion.li
                key={idx}
                className="space-y-3 py-8 lg:px-12 sm:py-0"
                variants={itemVariants}
              >
                <div className="w-12 h-12 border text-indigo-600 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features1;
