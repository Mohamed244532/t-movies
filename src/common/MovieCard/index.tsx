import { Link } from "react-router-dom";
import { FaPlay, FaStar, FaYoutube } from "react-icons/fa"; 
import Image from "../Image";
import { IMovie } from "@/types";
import { useMediaQuery } from "usehooks-ts";

const MovieCard = ({
  movie,
  category,
}: {
  movie: IMovie;
  category: string;
}) => {
  const { poster_path, original_title: title, name, id, vote_average } = movie;
  const isMobile = useMediaQuery("(max-width: 380px)");

  return (
    <div className="flex flex-col gap-2 group w-[170px]">
      <div className="relative block w-full xs:h-[250px] h-[216px] overflow-hidden rounded-xl transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-[0_15px_35px_rgba(255,0,0,0.3)] border border-transparent group-hover:border-red-600/30">
        
        {/* بوستر الفيلم */}
        <Image
          height={!isMobile ? 250 : 216}
          width={170}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title || name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:brightness-[0.2]"
          effect="zoomIn"
        />

        {/* طبقة الأزرار (Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
          
          {/* زر Watch Now - يوجه للبريميوم */}
          <Link
            to="/premium"
            className="flex items-center justify-center gap-2 bg-primary text-white w-[130px] py-2 rounded-full text-[12px] font-bold hover:bg-red-700 transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <FaPlay size={10} /> Watch Now
          </Link>

          {/* زر Watch Trailer - يوجه لصفحة التفاصيل (حيث يوجد التريلر) */}
          <Link
            to={`/${category}/${id}`}
            className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white w-[130px] py-2 rounded-full text-[12px] font-bold hover:bg-white/20 transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <FaYoutube size={14} className="text-red-600" /> Trailer
          </Link>

          {/* شارة التقييم */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 px-2 py-1 rounded-lg">
            <FaStar className="text-yellow-400 text-[10px]" />
            <span className="text-yellow-400 text-xs font-black">
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* عنوان الفيلم يوجه لصفحة التفاصيل */}
      <Link 
        to={`/${category}/${id}`}
        className="dark:text-gray-300 text-center sm:text-base xs:text-[14.75px] text-[14px] font-medium transition-colors group-hover:text-primary line-clamp-1"
      >
        {(title?.length > 50 ? title.split(":")[0] : title) || name}
      </Link>
    </div>
  );
};

export default MovieCard;