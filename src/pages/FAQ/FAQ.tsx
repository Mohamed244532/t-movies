import { motion } from "framer-motion";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "@/assets/images/bg.jpg";

const FAQ = () => {
  const faqs = [
    { q: "Is tMovies free to use?", a: "Yes, you can browse and discover movies for free using TMDB data." },
    { q: "How can I watch movies?", a: "We provide information and trailers; we do not host full movies directly." },
    { q: "Is there a mobile app?", a: "Currently, our platform is fully responsive and works perfectly on mobile browsers." }
  ];

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})`, backgroundAttachment: "fixed" }}>
      <div className={cn(maxWidth, "pt-40 pb-20 text-white relative z-10")}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto bg-[#1a1a1a]/80 backdrop-blur-md p-10 rounded-3xl border border-white/5 shadow-2xl">
          <h1 className="text-3xl font-bold mb-8 text-primary border-b border-white/10 pb-4">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="group border-b border-white/5 pb-4 last:border-0">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2">? {item.q}</h3>
                <p className="text-gray-400 leading-relaxed italic">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;