import React from "react";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hackathon 2024
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Innovate. Collaborate. Elevate.
          </motion.p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About the Hackathon
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            This hackathon is designed to challenge your problem-solving skills
            while fostering innovation and collaboration. Compete with the best
            minds to create impactful solutions over a weekend. Network with
            industry professionals, gain hands-on experience, and win exciting
            prizes!
          </motion.p>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Prizes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["First Place", "Second Place", "Third Place"].map((prize, index) => (
              <motion.div
                key={index}
                className="bg-black text-white rounded-lg p-8 shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4">{prize}</h3>
                <p className="text-lg">
                  {index === 0
                    ? "$5,000 + Goodies"
                    : index === 1
                    ? "$3,000 + Goodies"
                    : "$2,000 + Goodies"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Event Schedule
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Day 1: Kickoff", desc: "Introduction and team formations." },
              { title: "Day 2: Hacking", desc: "Coding and mentoring sessions." },
              { title: "Day 3: Finale", desc: "Project presentations and awards." },
            ].map((day, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 rounded-lg shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">{day.title}</h3>
                <p className="text-gray-400">{day.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FAQs
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Who can participate?",
                answer: "Students, professionals, and enthusiasts from all backgrounds are welcome.",
              },
              {
                question: "Is it free?",
                answer: "Yes, participation is completely free.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 rounded-lg shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            &copy; 2024 Hackathon. All rights reserved. | Powered by React and Tailwind CSS.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
