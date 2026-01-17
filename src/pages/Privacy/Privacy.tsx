import { motion } from "framer-motion";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "../../assets/images/bg.jpg"; 

const Privacy = () => {
  const points = [
    {
      title: "Data Collection",
      desc: "We do not collect personal identification information from our users. We only use cookies to enhance your browsing experience and for analytics."
    },
    {
      title: "Google Adsense",
      desc: "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites."
    },
    {
      title: "TMDB API",
      desc: "This product uses the TMDB API but is not endorsed or certified by TMDB. No user data is shared with the API provider."
    },
    {
      title: "External Links",
      desc: "Our site may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us."
    }
  ];

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})` }}
    >
      <div className={cn(maxWidth, "pt-32 pb-20 text-white relative z-10")}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-lg p-10 rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <h1 className="text-3xl font-black mb-8 text-primary uppercase tracking-tighter text-center">
            Privacy Policy
          </h1>

          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed italic">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
             <p className="text-xs text-gray-500 uppercase tracking-widest">
               Effective Date: January 17, 2026
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;