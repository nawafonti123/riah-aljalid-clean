// frontend/components/sections/ContactSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding } from 'react-icons/fa';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#2C5364] dark:to-[#0F2027] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">اتصل بنا</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات الاتصال</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">الرياض - طريق الملك عبدالعزيز</span>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a href="https://wa.me/966565247407" target="_blank" className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff]">+966 56 524 7407</a>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a href="mailto:RiaHaljalid@icloud.com" className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff]">RiaHaljalid@icloud.com</a>
              </div>
              <div className="flex items-start gap-3">
                <FaRegBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">سجل: 1010632725</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">أرسل رسالة</h3>
            <form className="space-y-3 sm:space-y-4">
              <input type="text" placeholder="الاسم" className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              <input type="email" placeholder="البريد" className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              <textarea rows={3} placeholder="الرسالة" className="w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none" />
              <button className="w-full py-2 sm:py-3 text-xs sm:text-sm bg-[#01AEBE] dark:bg-[#00c6ff] text-white font-bold rounded-lg hover:bg-[#0199a8] dark:hover:bg-[#00a0cc] transition">إرسال</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
