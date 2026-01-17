import { Link } from "react-router-dom";
import Logo from "../Logo";
import FooterImg from "@/assets/images/footer-bg.webp";
import { footerLinks } from "@/constants";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${FooterImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="dark:bg-black lg:py-16 sm:py-10 xs:py-8 py-[30px] w-full mt-10"
    >
      <div
        className={cn(
          maxWidth,
          ` flex flex-col items-center lg:gap-14 md:gap-12 sm:gap-8 xs:gap-[30px] gap-6`
        )}
      >
        {/* اللوجو */}
        <Logo logoColor="text-primary" />

        {/* شبكة الروابط */}
        <ul className="grid grid-cols-3 items-center justify-start font-medium text-gray-300 capitalize md:gap-x-16 md:gap-y-4 md:gap-4 sm:gap-2 xs:gap-[6px] gap-1">
          {footerLinks.map((item, index) => {
            // item هنا يمثل الكائن { title: string, path: string }
            return (
              <li key={index} className="text-center">
                <Link
                  to={item.path} // توجيه للمسار الصحيح من الثوابت
                  className="hover:text-primary hover:scale-105 inline-block transition-all duration-300 md:text-[15.25px] sm:text-[14.75px] xs:text-[12.75px] text-[12px] font-nunito"
                >
                  {/* استدعاء الخاصية title بدلاً من الكائن بالكامل لحل خطأ ReactNode */}
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* حقوق النشر - إضافة اختيارية لشكل احترافي */}
        <p className="text-gray-500 text-sm mt-4 font-nunito">
          &copy; {new Date().getFullYear()} <span className="text-primary">tMovies</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;