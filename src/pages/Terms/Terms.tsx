import { motion } from "framer-motion";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "../../assets/images/bg.jpg"; 

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using tMovies, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "2. Content Disclaimer",
      content: "All movie data, images, and descriptions are provided by The Movie Database (TMDB) API. tMovies does not host any pirated content directly on its servers."
    },
    {
      title: "3. User Conduct",
      content: "Users are prohibited from attempting to compromise the website's security, scrape data using automated bots, or use the service for any illegal purposes."
    },
    {
      title: "4. Intellectual Property",
      content: "The website design, logo, and code are the intellectual property of tMovies. Movie posters and metadata belong to their respective copyright owners."
    },
    {
      title: "5. Modifications",
      content: "We reserve the right to change these terms at any time. Your continued use of the site constitutes your acceptance of such changes."
    }
  ];

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})` }}
    >
      <div className={cn(maxWidth, "pt-32 pb-20 text-white")}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-[#1a1a1a]/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-primary border-b border-white/10 pb-4">
            Terms of Service
          </h1>
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-400 leading-relaxed italic">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
            <p className="text-sm text-gray-300 text-center">
              Last Updated: January 2026. If you have any questions, please contact our support team.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;