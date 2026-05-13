import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Development Training",
    company: "Zaio Coding School",
    period: "Jan 2025 – Feb 2026",
    location: "Cape Town",
    gradient: "from-violet-500 to-purple-600",
    highlights: [
      "Built responsive web apps using HTML5, CSS3, JavaScript, and React",
      "Developed full-stack projects with Firebase Authentication & Firestore",
      "Integrated Stripe API payment systems",
      "Earned Software Development Certificate recognised by Alison",
      "Practiced agile workflows with daily stand-ups and sprint planning",
    ],
  },
  {
    title: "Generative AI Course",
    company: "WeThinkCode",
    period: "2025",
    location: "Online",
    gradient: "from-pink-500 to-rose-600",
    highlights: [
      "Explored generative AI concepts, tools, and practical applications",
      "Learned prompt engineering and AI-assisted development workflows",
      "Applied AI tools to enhance software development productivity",
    ],
  },
  {
    title: "FICA Compliance Agent & IT Help Desk",
    company: "Hollywoodbets",
    period: "Apr 2023 – Jan 2026",
    location: "Umhlanga, South Africa",
    gradient: "from-cyan-500 to-blue-600",
    highlights: [
      "Provided IT help desk support and troubleshooting for internal staff",
      "Verified customer documentation for FICA regulatory compliance",
      "Maintained accuracy and confidentiality in data handling systems",
      "Liaised between technical teams and end-users to resolve IT issues",
    ],
  },
  {
    title: "Customer Service Teller",
    company: "Woolworths Financial Services",
    period: "Oct 2018 – Apr 2023",
    location: "Durban",
    gradient: "from-amber-500 to-orange-600",
    highlights: [
      "Processed 120+ financial transactions per shift with 99.8% accuracy",
      "Operated and maintained banking software and point-of-sale systems",
      "Managed high-volume customer requests and banking data entry",
    ],
  },
  {
    title: "Retail Teller",
    company: "Edgars",
    period: "Mar 2016 – Sep 2018",
    location: "Umzimkhulu, South Africa",
    gradient: "from-emerald-500 to-teal-600",
    highlights: [
      "Processed payments and transactions in fast-paced retail environment",
      "Balanced tills and verified financial discrepancies using POS systems",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 font-inter relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-pink-400 mb-3">Journey</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className={`w-1 rounded-full bg-gradient-to-b ${exp.gradient} self-stretch hidden sm:block`} style={{ minHeight: "100%" }} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg bg-gradient-to-r ${exp.gradient} text-white/90`}>
                      {exp.period}
                    </span>
                    <span className="text-xs text-white/40">{exp.location}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-0.5">{exp.title}</h3>
                  <p className="text-sm text-violet-300/80 mb-4">{exp.company}</p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/55">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}