import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import { Adsense } from "@ctrl/react-adsense";

import {
  Header,
  Footer,
  SideBar,
  VideoModal,
  ScrollToTop,
  Loader,
} from "@/common";

import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";

import {
  GA_MEASUREMENT_ID,
  GOOGLE_AD_CLIENT,
  GOOGLE_AD_SLOT,
} from "./utils/config";

/* ================= Lazy Pages ================= */
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const About = lazy(() => import("./pages/About/About"));
const Terms = lazy(() => import("./pages/Terms/Terms")); 
const Privacy = lazy(() => import("./pages/Privacy/Privacy")); 
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Premium = lazy(() => import("./pages/Premium/Premium"));

// ✅ إضافة صفحة الدفع الجديدة
const Checkout = lazy(() => import("./pages/Premium/Checkout"));

// ✅ PERSON PAGE
const PersonDetails = lazy(
  () => import("./pages/person/PersonDetails")
);

const App = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send("pageview");
  }, []);

  return (
    <>
      <VideoModal />
      <SideBar />
      <Header />

      <main className="lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* ===== Static Routes ===== */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* الروابط الثابتة */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/premium" element={<Premium />} />
              
              {/* ✅ مسار صفحة الدفع */}
              <Route path="/checkout" element={<Checkout />} />

              {/* ===== PERSON ROUTE ===== */}
              <Route path="/person/:id" element={<PersonDetails />} />

              {/* ===== Dynamic Routes ===== */}
              <Route path="/:category/:id" element={<Detail />} />
              <Route path="/:category" element={<Catalog />} />

              {/* ===== Not Found ===== */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </main>

      <Adsense
        client={GOOGLE_AD_CLIENT || ""}
        slot={GOOGLE_AD_SLOT || ""}
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />

      <Footer />
    </>
  );
};

export default App;