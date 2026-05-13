import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, MapPin } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "Degree", value: "BSc Mathematical Sciences", sub: "UNISA – Applied Math & CS", color: "from-violet-500 to-purple-600" },
  { icon: Award, label: "Certificate", value: "Software Development", sub: "Zaio Coding School · Alison", color: "from-cyan-500 to-blue-600" },
  { icon: Award, label: "Certificate", value: "Generative AI", sub: "WeThinkCode", color: "from-pink-500 to-rose-600" },
  { icon: Briefcase, label: "Experience", value: "7+ Years", sub: "Finance, IT & Tech roles", color: "from-amber-500 to-orange-600" },
  { icon: MapPin, label: "Location", value: "South Africa", sub: "Open to remote work", color: "from-emerald-500 to-teal-600" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 font-inter relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-violet-400 mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">Bridging Mathematics</span>
            <span className="text-white"> & Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="space-y-5">
            {[
              "I am a final-year Applied Mathematics and Computer Science student with a strong foundation in mathematics, statistics, and problem-solving.",
              "I have complemented my academic journey with hands-on experience through an intensive bootcamp at Zaio Coding School, earning a Software Development certificate also recognised by Alison. I also completed a Generative AI course at WeThinkCode, deepening my understanding of modern AI tools and workflows.",
              "Beyond coding, I bring 7+ years of professional experience spanning IT support, FICA compliance, data handling, and customer-facing roles — giving me a unique ability to bridge technical solutions with real business needs.",
              "I am passionate about building efficient, user-centered applications and leveraging data-driven insights to solve real-world problems.",
            ].map((text, i) => (
              <p key={i} className="text-white/60 leading-relaxed text-base">{text}</p>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}