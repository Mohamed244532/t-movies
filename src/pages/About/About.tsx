import { motion } from "framer-motion";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "../../assets/images/bg.jpg"; // استيراد الصورة

const About = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})`,
        backgroundAttachment: "fixed" 
      }}
    >
      <div className={cn(maxWidth, "pt-40 pb-20 text-white relative z-10")}>
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-extrabold text-primary mb-12 border-l-8 border-primary pl-6 uppercase tracking-tighter"
        >
          About tMovies
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a]/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-center"
          >
            <p className="text-gray-200 leading-relaxed text-xl mb-4">
              Welcome to <span className="text-primary font-bold">tMovies</span>, your ultimate destination for the latest movies and TV series.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Our platform is designed to provide you with a seamless experience, offering high-quality 
              content, detailed information about your favorite actors, and up-to-date ratings powered by TMDB.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary/10 backdrop-blur-md p-10 rounded-3xl border border-primary/20 shadow-2xl flex flex-col justify-center border-t-4 border-t-primary"
          >
            <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-widest">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-loose">
              To build the fastest, most reliable, and most user-friendly movie database for cinema lovers around the world. We believe that discovering your next favorite film should be an experience in itself.
            </p>
          </motion.div>
        </div>

        {/* إضافة إحصائيات سريعة كديكور أسفل الصفحة */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: "Movies", val: "1M+" },
            { label: "TV Shows", val: "200K+" },
            { label: "Actors", val: "1.5M+" },
            { label: "Users", val: "500K+" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/5">
              <h4 className="text-2xl font-bold text-primary">{stat.val}</h4>
              <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;