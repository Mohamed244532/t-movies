import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // استيراد التنبيهات
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";
import bgImage from "../../assets/images/bg.jpg"; 
import "./auth.css";

const Contact = () => {
  // حالات تخزين بيانات الفورم
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // منع الصفحة من التحديث التلقائي

    // 1. التحقق إذا كانت الخانات فارغة
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all empty fields first!"); 
      return;
    }

    // 2. التحقق من صيغة الإيميل بشكل بسيط
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 3. إظهار رسالة النجاح بالأخضر وتنسيق مخصص
    toast.success("Success! Thank you for your message. Expect a reply from us soon.", {
      duration: 5000, 
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: 'bold',
      }
    });

    // 4. مسح الفورم بعد الإرسال الناجح
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={cn(maxWidth, "pt-32 pb-20 text-white flex justify-center items-center w-full")}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-[#1a1a1a]/90 backdrop-blur-sm p-10 rounded-3xl border border-white/5 shadow-2xl z-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">Get In Touch</h1>
          
          <form className="flex flex-col gap-6" onSubmit={handleSendMessage}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Your Name</label>
              <input 
                type="text" 
                className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl focus:border-primary outline-none transition-all" 
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input 
                type="email" 
                className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl focus:border-primary outline-none transition-all" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Message</label>
              <textarea 
                rows={5} 
                className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl focus:border-primary outline-none transition-all" 
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            {/* زر الإرسال مع تأثيرات الحركة (Framer Motion) */}
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-red-700 py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 text-white"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;