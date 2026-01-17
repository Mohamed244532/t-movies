import { FiSun } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { GoDeviceDesktop } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { MdOutlineLiveTv } from "react-icons/md";

import { ITheme, INavLink } from "../types";

export const navLinks: INavLink[] = [
  { title: "home", path: "/", icon: AiOutlineHome },
  { title: "movies", path: "/movie", icon: TbMovie },
  { title: "tv series", path: "/tv", icon: MdOutlineLiveTv },
];

export const themeOptions: ITheme[] = [
  { title: "Dark", icon: BsMoonStarsFill },
  { title: "Light", icon: FiSun },
  { title: "System", icon: GoDeviceDesktop },
];

// تحديث مصفوفة الفوتر لتشمل المسارات (Paths)
export const footerLinks = [
  { title: "home", path: "/" },
  { title: "live", path: "/tv" },
  { title: "you must watch", path: "/movie" },
  { title: "contact us", path: "/contact" },
  { title: "FAQ", path: "/faq" },
  { title: "Recent release", path: "/movie" },
  { title: "term of services", path: "/terms" },
  { title: "premium", path: "/premium" }, 
  { title: "Top IMDB", path: "/movie" },
  { title: "About us", path: "/about" },
  { title: "Privacy policy", path: "/privacy" }, // ✅ تم التحديث هنا
];

export const sections = [
  { title: "Trending movies", category: "movie", type: "popular" },
  { title: "Top rated movies", category: "movie", type: "top_rated" },
  { title: "Trending series", category: "tv", type: "popular" },
  { title: "Top rated series", category: "tv", type: "top_rated" },
];