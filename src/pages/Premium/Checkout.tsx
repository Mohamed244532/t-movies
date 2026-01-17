import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "@/assets/images/bg.jpg";

const Checkout = () => {
  const [formData, setFormData] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // دالة لتنسيق رقم البطاقة (إضافة مسافات كل 4 أرقام)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // تحديد نوع البطاقة
  const cardType = formData.card.startsWith("4") ? "VISA" : formData.card.startsWith("5") ? "MASTERCARD" : "UNKNOWN";

  const handlePayment = () => {
    setError("");
    setLoading(true);
    
    const cleanNumber = formData.card.replace(/\s/g, "");

    setTimeout(() => {
      // التحقق من البيانات الخاصة بك أو بيانات التيست العالمية
      if (
        (formData.name === "Mohamed Adel Ahmed Mohamed" && cleanNumber === "2424242424242424" && formData.expiry === "24/01" && formData.cvv === "999") ||
        (cleanNumber === "4242424242424242" || cleanNumber === "5105105105105105")
      ) {
        setLoading(false);
        setIsSuccess(true);
      } else {
        setLoading(false);
        setError("Invalid details. Try Mohamed Adel | 2424... | 24/01 | 567");
      }
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-hidden font-nunito" 
         style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.92)), url(${bgImage})` }}>
      
      <div className={cn(maxWidth, "pt-28 pb-20 text-white flex flex-col items-center justify-center gap-8")}>
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <>
              {/* === الجزء البصري للبطاقة (3D Card) === */}
              <div className="perspective-1000">
                <motion.div 
                  className="relative w-[320px] xs:w-[350px] h-[200px] preserve-3d transition-all duration-700"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* وجه البطاقة (Front) */}
                  <div className={cn(
                    "absolute w-full h-full backface-hidden rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col justify-between transition-colors duration-500",
                    cardType === "MASTERCARD" ? "bg-gradient-to-br from-[#eb001b] to-[#ff5f00]" : 
                    cardType === "VISA" ? "bg-gradient-to-br from-[#1a1adb] to-[#000046]" : "bg-gradient-to-br from-gray-800 to-black"
                  )}>
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-9 bg-yellow-500/80 rounded shadow-inner" />
                      <div className="text-2xl italic font-black">
                        {cardType === "VISA" && <FaCcVisa />}
                        {cardType === "MASTERCARD" && <FaCcMastercard />}
                      </div>
                    </div>
                    <div className="text-xl tracking-[3px] font-mono py-2">
                      {formData.card || "#### #### #### ####"}
                    </div>
                    <div className="flex justify-between items-end uppercase">
                      <div className="flex flex-col max-w-[70%]">
                        <span className="text-[10px] opacity-60">Holder Name</span>
                        <span className="text-sm font-bold truncate">{formData.name || "Mohamed Adel"}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] opacity-60">Expires</span>
                        <span className="text-sm font-bold">{formData.expiry || "MM/YY"}</span>
                      </div>
                    </div>
                  </div>

                  {/* ظهر البطاقة (Back) */}
                  <div className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-white/10 rotateY-180 flex flex-col justify-around py-4">
                    <div className="w-full h-10 bg-black mt-2" />
                    <div className="px-8">
                      <div className="text-[10px] opacity-50 mb-1 text-right">CVV</div>
                      <div className="w-full h-9 bg-white text-black flex items-center justify-end px-4 font-mono font-bold rounded italic tracking-widest">
                        {formData.cvv || "***"}
                      </div>
                    </div>
                    <div className="px-8 text-[8px] opacity-30 italic">tMovies Premium: Digital Access Pass</div>
                  </div>
                </motion.div>
              </div>

              {/* === نموذج الإدخال (Form) === */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="bg-black/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 w-full max-w-lg shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-6 text-center tracking-widest">PAYMENT DETAILS</h2>
                
                <div className="space-y-4">
                  <div className="relative group">
                    <input 
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary transition-all pr-12"
                      placeholder="Cardholder Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setIsFlipped(false)}
                    />
                  </div>

                  <div className="relative group">
                    <input 
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary transition-all pr-14 font-mono tracking-wider"
                      placeholder="Card Number"
                      maxLength={19}
                      value={formData.card}
                      onChange={(e) => setFormData({...formData, card: formatCardNumber(e.target.value)})}
                      onFocus={() => setIsFlipped(false)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      {formData.card.length === 0 ? (
                        <div className="flex gap-1 opacity-20 grayscale">
                          <FaCcVisa size={24} />
                          <FaCcMastercard size={24} />
                        </div>
                      ) : (
                        <>
                          {cardType === "VISA" && <FaCcVisa size={28} className="text-[#1a1adb]" />}
                          {cardType === "MASTERCARD" && <FaCcMastercard size={28} className="text-[#eb001b]" />}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                      onFocus={() => setIsFlipped(false)}
                    />
                    <input 
                      className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary text-center"
                      placeholder="CVV"
                      maxLength={3}
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      onFocus={() => setIsFlipped(true)}
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs text-center font-bold italic">{error}</p>}

                  <button 
                    onClick={handlePayment} disabled={loading}
                    className="w-full bg-primary hover:bg-red-700 py-4 rounded-xl font-bold mt-4 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "CHECKING..." : "PAY $9.99"}
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            /* === رسالة النجاح === */
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-green-600/10 backdrop-blur-2xl border border-green-500/20 p-12 rounded-[3rem] text-center max-w-sm shadow-[0_0_50px_rgba(34,197,94,0.1)]"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-2 italic">WELCOME!</h2>
              <p className="text-gray-400">Subscription activated for <span className="text-white font-bold">{formData.name}</span>.</p>
              <button onClick={() => window.location.href = "/"} className="mt-8 bg-white/10 px-8 py-2 rounded-full hover:bg-white/20 transition-all text-sm">Return Home</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotateY-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Checkout;