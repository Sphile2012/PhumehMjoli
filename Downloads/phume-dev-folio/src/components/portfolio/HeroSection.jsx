import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const PROFILE_PHOTO = "https://media.base44.com/images/public/user_6971b3bc769db4b08518a023/1acc20bfe_WhatsAppImage2026-03-01at190152.jpg";
const BG = "https://media.base44.com/images/public/69b953316c6a6f44abed30f4/908c63b8c_generated_image.png";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden font-inter">
      {/* BG */}
      <div className="absolute inset-0">
        <img src={BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a1e]/70 via-[#0d0a1e]/60 to-[#0d0a1e]" />
      </div>

      {/* Floating orbs */}
      <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/80 mb-6 hover:bg-white/10 transition-all cursor-default"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            Available for Internship & Junior Roles
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="text-white">Hi, I'm </span>
            <br />
            <span className="text-gradient">Phunyezwa</span>
            <br />
            <span className="text-white/90 text-4xl sm:text-5xl lg:text-6xl font-bold">Penelope Mjoli</span>
          </h1>

          <p className="text-white/60 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Applied Mathematics & Computer Science student · Full-Stack Developer ·
            Passionate about data-driven, user-centered applications.
          </p>

          <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
            <a href="#contact"
              className="px-8 py-3.5 font-semibold rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:opacity-90 transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95">
              Get In Touch
            </a>
            <a href="#projects"
              className="px-8 py-3.5 font-semibold rounded-xl glass text-white/90 hover:bg-white/10 transition-all border border-white/20 hover:border-violet-400/50 hover:scale-105 active:scale-95">
              View Projects
            </a>
          </div>

          <div className="flex items-center gap-5 mt-10 justify-center lg:justify-start">
            {[
              { href: "https://github.com/Sphile2012/uphumeh", icon: Github },
              { href: "https://www.linkedin.com/in/phunyezwa-mjoli", icon: Linkedin },
              { href: "mailto:poomeigh503@gmail.com", icon: Mail },
            ].map(({ href, icon: Icon }) => (
              <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="p-3 glass rounded-xl text-white/50 hover:text-violet-400 hover:border-violet-400/50 transition-all hover:scale-110">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem]">
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 0deg, rgba(139,92,246,0.8), rgba(56,189,248,0.8), rgba(52,211,153,0.5), rgba(236,72,153,0.5), rgba(139,92,246,0.8))", padding: "3px" }}
            >
              <div className="w-full h-full rounded-full bg-[#0d0a1e]" />
            </motion.div>
            {/* Glow */}
            <div className="absolute inset-0 rounded-full blur-2xl bg-violet-500/30 scale-110" />
            {/* Photo */}
            <img
              src={PROFILE_PHOTO}
              alt="Phunyezwa Penelope Mjoli"
              className="absolute inset-3 rounded-full object-cover w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-violet-400 transition-colors">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}