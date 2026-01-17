import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "@/assets/images/bg.jpg";

const Premium = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})`,
        // نضمن أن الخلفية لا تصطاد النقرات بعيداً عن النافبار
        zIndex: 1 
      }}
    >
      {/* الحاوية الرئيسية مع padding علوي كبير لترك مساحة للنافبار */}
      <div className={cn(maxWidth, "pt-32 pb-20 text-white relative z-[10] flex flex-col items-center justify-center w-full")}>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-br from-yellow-600/20 to-primary/10 p-10 md:p-16 rounded-[3rem] border border-yellow-500/30 text-center backdrop-blur-xl shadow-2xl max-w-2xl w-[90%] md:w-full"
        >
          {/* عنوان البريميم الذهبي */}
          <h2 className="text-yellow-500 font-black text-5xl md:text-7xl mb-6 tracking-tighter">
            PREMIUM
          </h2>
          
          <p className="text-gray-300 mb-10 text-lg md:text-xl leading-relaxed">
            Enjoy Ad-free experience, early access to new features, and high-quality streaming recommendations.
          </p>
          
          <div className="text-5xl font-bold mb-10">
            $9.99 <span className="text-sm font-normal text-gray-500 uppercase tracking-widest">/ month</span>
          </div>
          
          <Link 
            to="/checkout" 
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-black py-5 px-14 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-yellow-600/20 inline-block text-lg"
          >
            GET STARTED NOW
          </Link>
          
          {/* لمسة إضافية: نص صغير تحت الزر */}
          <p className="mt-6 text-xs text-gray-500 uppercase tracking-tighter">
            Cancel anytime. Terms and conditions apply.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;