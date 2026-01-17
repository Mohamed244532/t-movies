import React, { useCallback, useEffect, useState } from "react"; // أضفنا useEffect و useState
import { AnimatePresence, m } from "framer-motion";
import { Link } from "react-router-dom"; // أضفنا Link
import { FiUser, FiUserPlus, FiLogOut } from "react-icons/fi"; // أيقونات الحساب

import SidebarNavItem from "./SidebarNavItem";
import ThemeOption from "./SidebarThemeOption";
import Logo from "../Logo";
import Overlay from "../Overlay";

import { useGlobalContext } from "@/context/globalContext";
import { useTheme } from "@/context/themeContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useMotion } from "@/hooks/useMotion";
import { navLinks, themeOptions } from "@/constants";
import { sideBarHeading, listItem } from "@/styles"; // أضفنا listItem
import { INavLink } from "@/types";
import { cn } from "@/utils/helper";

const SideBar: React.FC = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  const { theme } = useTheme();
  const { slideIn } = useMotion();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, [showSidebar]); // التحديث عند فتح القائمة

  const closeSideBar = useCallback(() => {
    setShowSidebar(false);
  }, [setShowSidebar]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    closeSideBar();
    window.location.reload();
  };

  const { ref } = useOnClickOutside({
    action: closeSideBar,
    enable: showSidebar
  });

  return (
    <AnimatePresence>
      {showSidebar && (
        <Overlay>
          <m.nav
            variants={slideIn("right", "tween", 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            ref={ref}
            className={cn(
              `fixed top-0 right-0 sm:w-[40%] xs:w-[220px] w-[195px] h-full z-[25] overflow-y-auto shadow-md md:hidden p-4 pb-0 dark:text-gray-200 text-gray-600`,
              theme === "Dark" ? "dark-glass" : "light-glass"
            )}
          >
            <div className="flex items-center justify-center">
              <Logo />
            </div>

            <div className="p-4 sm:pt-8 xs:pt-6 pt-[22px] h-full flex flex-col">
              {/* قسم المنيو الأصلي */}
              <h3 className={sideBarHeading}>Menu</h3>
              <ul className="flex flex-col sm:gap-2 xs:gap-[6px] gap-1 capitalize xs:text-[14px] text-[13.5px] font-medium">
                {navLinks.map((link: INavLink) => (
                  <SidebarNavItem
                    link={link}
                    closeSideBar={closeSideBar}
                    key={link.title.replaceAll(" ", "")}
                  />
                ))}
              </ul>

              {/* قسم الحساب الجديد (يظهر تحت قسم المنيو) */}
              <h3 className={cn(`mt-4`, sideBarHeading)}>Account</h3>
              <ul className="flex flex-col sm:gap-2 xs:gap-[4px] gap-[2px] capitalize text-[14.75px] font-medium">
                {userEmail ? (
                  <>
                    <li className={cn(listItem, "text-primary font-bold cursor-default")}>
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[12px]">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{userEmail.split('@')[0]}</span>
                    </li>
                    <li>
                      <button onClick={handleLogout} className={cn(listItem, "text-red-500")}>
                        <FiLogOut />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={closeSideBar} className={listItem}>
                        <FiUser />
                        <span>Sign In</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" onClick={closeSideBar} className={listItem}>
                        <FiUserPlus />
                        <span>Register</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* قسم الثيم الأصلي */}
              <h3 className={cn(`mt-4`, sideBarHeading)}>Theme</h3>
              <ul className="flex flex-col sm:gap-2 xs:gap-[4px] gap-[2px] capitalize text-[14.75px] font-medium">
                {themeOptions.map((theme) => (
                  <ThemeOption theme={theme} key={theme.title} />
                ))}
              </ul>

              <p className="xs:text-[12px] text-[11.75px] mt-auto sm:mb-6 mb-[20px] text-center font-nunito dark:text-gray-200">
                &copy; 2023 by tMovies. All right reserved.
              </p>
            </div>
          </m.nav>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SideBar;