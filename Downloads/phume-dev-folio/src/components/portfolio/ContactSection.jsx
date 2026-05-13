import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "Email", value: "poomeigh503@gmail.com", href: "mailto:poomeigh503@gmail.com", gradient: "from-violet-500 to-purple-600" },
  { icon: Phone, label: "Phone", value: "082 356 2239", href: "tel:0823562239", gradient: "from-cyan-500 to-blue-600" },
  { icon: MapPin, label: "Location", value: "Wiggins, South Africa", href: null, gradient: "from-pink-500 to-rose-600" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Sphile2012/uphumeh", value: "github.com/Sphile2012", gradient: "from-gray-600 to-gray-800" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/phunyezwa-mjoli", value: "linkedin.com/in/phunyezwa-mjoli", gradient: "from-blue-600 to-blue-800" },
  { icon: Globe, label: "Portfolio", href: "https://uphumeh.netlify.app/", value: "uphumeh.netlify.app", gradient: "from-emerald-500 to-teal-600" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 font-inter relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-emerald-400 mb-3">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Looking for a Software Development Internship or Junior Developer role. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact info */}
          <div className="space-y-4">
            {contactItems.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all group flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:text-violet-300 transition-colors text-sm">{item.value}</a>
                  ) : (
                    <p className="text-white font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Socials + CTA */}
          <div className="space-y-4">
            {socials.map((social, i) => (
              <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all group flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${social.gradient} shadow-lg`}>
                  <social.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{social.label}</p>
                  <p className="text-white font-medium text-sm group-hover:text-violet-300 transition-colors">{social.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.a href="mailto:poomeigh503@gmail.com"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-95">
              <Send className="w-5 h-5" />
              Send Me an Email
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}