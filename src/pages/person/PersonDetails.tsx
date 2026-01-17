import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaPlay, FaYoutube } from "react-icons/fa";
import "./person.css"; // تأكد أن هذا الملف موجود

// الأنواع (Interfaces)
interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  place_of_birth?: string;
  birthday?: string;
}

interface Credit {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  media_type: "movie" | "tv";
}

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [personRes, creditsRes] = await Promise.all([
          axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}`),
        ]);
        setPerson(personRes.data);
        setCredits(creditsRes.data.cast);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const sortedCredits = useMemo(() => {
    // فرز الأفلام التي لها بوستر أولاً، ثم حسب التقييم
    return [...credits].sort((a, b) => {
      if (a.poster_path && !b.poster_path) return -1;
      if (!a.poster_path && b.poster_path) return 1;
      return b.vote_average - a.vote_average;
    });
  }, [credits]);

  if (loading) return <div className="loading-state text-white text-center py-20">Loading...</div>;
  if (!person) return <div className="error-state text-white text-center py-20">Person not found.</div>;

  return (
    <div className="person-container">
      {/* القسم العلوي: معلومات الشخص */}
      <header className="person-header-premium">
        <div className="profile-image-wrapper">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={person.profile_path ? `https://image.tmdb.org/t/p/h632${person.profile_path}` : "/no-user.png"} // صورة افتراضية للممثل إذا لم توجد
            alt={person.name}
            className="profile-img-main"
          />
        </div>

        <div className="person-info-content">
          <h1 className="person-name-title uppercase">{person.name}</h1>
          <div className="biography-section">
            <h3>Biography</h3>
            <p>{person.biography || "No biography available for this artist."}</p>
          </div>
          <div className="personal-meta">
            {person.birthday && <span><strong>Born:</strong> {person.birthday}</span>}
            {person.place_of_birth && <span><strong>From:</strong> {person.place_of_birth}</span>}
          </div>
        </div>
      </header>

      {/* القسم السفلي: شبكة الأفلام مع الأزرار */}
      <div className="known-for-section">
        <h2 className="section-title uppercase italic">Known For</h2>
        <div className="credits-grid">
          {sortedCredits.map((item) => {
            const title = item.title || item.name || "Untitled";
            return (
              <motion.div 
                key={`${item.id}-${item.media_type}`} 
                className="credit-card group relative" 
                whileHover={{ y: -10 }}
              >
                {/* استخدام صورة no-poster.png كبديل */}
                <img
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/no-poster.png"}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-[0.2]"
                  // ✅ إضافة onError في حال فشل تحميل الصورة الاحتياطية نفسها (احتمال ضعيف)
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/no-poster.png"; 
                  }}
                />

                {/* طبقة الأزرار المزدوجة */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                  
                  {/* زر Watch Now - يوجه للبريميوم */}
                  <Link
                    to="/premium"
                    className="flex items-center justify-center gap-2 bg-[#ff0000] text-white w-[130px] py-2 rounded-full text-[11px] font-black hover:bg-red-700 transition-all transform translate-y-4 group-hover:translate-y-0"
                  >
                    <FaPlay size={10} /> WATCH NOW
                  </Link>

                  {/* زر Trailer - يوجه لتفاصيل الفيلم */}
                  <Link
                    to={`/${item.media_type}/${item.id}`}
                    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white w-[130px] py-2 rounded-full text-[11px] font-black hover:bg-white/20 transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
                  >
                    <FaYoutube size={14} className="text-red-600" /> TRAILER
                  </Link>

                  {/* التقييم */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 px-2 py-0.5 rounded-lg">
                    <FaStar className="text-yellow-400 text-[10px]" />
                    <span className="text-yellow-400 text-[10px] font-black">
                      {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;