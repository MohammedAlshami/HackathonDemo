import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
        <motion.div
          className="lg:col-span-5 lg:col-start-1"
          variants={itemVariants}
        >
          <div className="mb-8">
            <h2 className="mb-2 text-3xl text-gray-800 font-bold lg:text-4xl dark:text-neutral-200">
              Impact and Results
            </h2>
            <p className="text-gray-600 dark:text-neutral-400">
              Discover the transformative effects of AI and precision
              agriculture on farming practices and outcomes.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 lg:mt-0 lg:col-span-6 lg:col-end-13"
          variants={itemVariants}
        >
          <div className="space-y-6 sm:space-y-8">
            <motion.ul
              className="grid grid-cols-2 divide-y divide-y-2 divide-x divide-x-2 divide-gray-200 overflow-hidden dark:divide-neutral-700"
              variants={containerVariants}
            >
              {[
                {
                  value: "~13%",
                  description: "yield improvement with AI applications",
                },
                {
                  value: "~20%",
                  description: "increase in labor efficiency through automation",
                },
                {
                  value: "~12%",
                  description: "higher profit margins for farmers using AI tools",
                },
                {
                  value: "~54%",
                  description:
                    "boost in farm output with precision agriculture",
                },
              ].map((stat, index) => (
                <motion.li
                  key={index}
                  className="flex flex-col -m-0.5 p-4 sm:p-8"
                  variants={itemVariants}
                >
                  <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2 dark:text-neutral-200">
                    {stat.value}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400">
                    {stat.description}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Stats;
    