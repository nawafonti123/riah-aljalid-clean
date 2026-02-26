// frontend/components/sections/ContactSection.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding } from 'react-icons/fa';
import { contactApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.sendMessage(formData);
      toast.success('تم إرسال رسالتك بنجاح');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('حدث خطأ أثناء الإرسال، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#2C5364] to-[#0F2027]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">اتصل بنا</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-4 sm:p-6 md:p-8 rounded-xl"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4">معلومات الاتصال</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-300">
                  8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، 3988، الرياض 12274
                </span>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/966565247407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm md:text-base text-gray-300 hover:text-[#00c6ff] transition underline"
                >
                  <span dir="ltr">+966 56 524 7407</span>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:RiaHaljalid@icloud.com"
                  className="text-xs sm:text-sm md:text-base text-gray-300 hover:text-[#00c6ff] transition underline"
                >
                  RiaHaljalid@icloud.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaRegBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-300">سجل: 1010632725</span>
              </div>
            </div>

            {/* خريطة جوجل - العنوان الدقيق */}
            <div className="mt-6 rounded-lg overflow-hidden h-48 sm:h-64">
              <iframe
                src="https://www.google.com/maps?q=8246+طريق+الملك+عبدالعزيز+الفرعي+الملك+فهد+3988+الرياض+12274+السعودية&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع الشركة على الخريطة"
                className="rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-4 sm:p-6 md:p-8 rounded-xl"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4">أرسل رسالة</h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="الاسم"
                required
                className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#00c6ff] outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                required
                className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#00c6ff] outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="الرسالة"
                required
                className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#00c6ff] outline-none resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 text-xs sm:text-sm bg-[#00c6ff] text-white font-bold rounded-lg hover:bg-[#00a0cc] transition disabled:opacity-50"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}