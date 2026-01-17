import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // حذفنا useLocation لأنه غير مستخدم
import { AnimatePresence, motion } from "framer-motion";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun, FiUser, FiUserPlus, FiLogOut } from "react-icons/fi";
import throttle from "lodash.throttle";
import toast from "react-hot-toast";

import { ThemeMenu, Logo } from "..";
import HeaderNavItem from "./HeaderNavItem";

import { useGlobalContext } from "@/context/globalContext";
import { useTheme } from "@/context/themeContext";
import { maxWidth, textColor } from "@/styles";
import { navLinks } from "@/constants";
import { THROTTLE_DELAY } from "@/utils/config";
import { cn } from "@/utils/helper";

const Header = () => {
  const { openMenu, theme, showThemeOptions } = useTheme();
  const { setShowSidebar } = useGlobalContext();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [userLetter, setUserLetter] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // قمنا بحذف setIsNotFoundPage و location لإزالة التحذيرات

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserLetter(email.charAt(0).toUpperCase());
    }

    const handleBackgroundChange = () => {
      const body = document.body;
      if (window.scrollY > 0 || (body.classList.contains("no-scroll") && parseFloat(body.style.top) * -1 > 0)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const throttledHandleBackgroundChange = throttle(handleBackgroundChange, THROTTLE_DELAY);
    window.addEventListener("scroll", throttledHandleBackgroundChange);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", throttledHandleBackgroundChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserLetter(null);
    setShowUserMenu(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className={cn(`md:py-[16px] py-[14.5px] fixed top-0 left-0 w-full z-10 transition-all duration-50`, isActive && (theme === "Dark" ? "header-bg--dark" : "header-bg--light"))}>
      <nav className={cn(maxWidth, `flex justify-between flex-row items-center`)}>
        {/* تم تحديث LogoColor ليعتمد فقط على isActive */}
        <Logo logoColor={cn(isActive ? "text-black dark:text-primary" : "text-primary")} />

        <div className="hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link) => (
              <HeaderNavItem key={link.title} link={link} isNotFoundPage={false} showBg={isActive} />
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <div className="button relative">
              <button onClick={openMenu} className={cn(`flex items-center justify-center mb-[2px] transition-all duration-100 hover:scale-110`, isActive ? `${textColor} dark:hover:text-secColor hover:text-black` : `dark:hover:text-secColor text-gray-300`)}>
                {theme === "Dark" ? <BsMoonStarsFill /> : <FiSun />}
              </button>
              <AnimatePresence>{showThemeOptions && <ThemeMenu />}</AnimatePresence>
            </div>

            {userLetter ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-[35px] h-[35px] bg-primary text-white rounded-full flex items-center justify-center font-bold text-[16px] border-2 border-white/20 hover:scale-105 transition-all shadow-lg"
                >
                  {userLetter}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl py-2 border border-gray-100 dark:border-white/10"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 mb-1">
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="text-[13px] font-bold truncate dark:text-white">{localStorage.getItem("userEmail")}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className={cn("text-[18px] transition-all hover:scale-110", isActive ? `${textColor} hover:text-black dark:hover:text-secColor` : "text-gray-300 hover:text-secColor")}>
                  <FiUser />
                </Link>
                <Link to="/register" className={cn("text-[18px] transition-all hover:scale-110", isActive ? `${textColor} hover:text-black dark:hover:text-secColor` : "text-gray-300 hover:text-secColor")}>
                  <FiUserPlus />
                </Link>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setShowSidebar(true)} className={cn(`inline-block text-[22.75px] md:hidden transition-all duration-300`, isActive ? `${textColor} dark:hover:text-secColor hover:text-black` : `dark:hover:text-secColor text-secColor`)}>
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;