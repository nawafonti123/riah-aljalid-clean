export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2027] to-[#2C5364] text-white">
      {/* الهيدر */}
      <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center"></div>
        </div>
        <h1 className="relative z-20 text-5xl md:text-6xl font-bold text-center">اتصل بنا</h1>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* معلومات الاتصال */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#00c6ff]">معلومات الاتصال</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">العنوان</h3>
                  <p className="text-gray-300">المملكة العربية السعودية - الرياض - طريق الملك عبدالعزيز</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">الهاتف</h3>
                  <p className="text-gray-300">055 223 8222</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
                  <p className="text-gray-300">RiaHaljalid@icloud.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">السجل التجاري</h3>
                  <p className="text-gray-300">1010632725</p>
                </div>
              </div>
            </div>

            {/* الخريطة أو صورة الموقع */}
            <div className="mt-8 glass-card p-4 rounded-xl h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.171407678913!2d46.675476315001!3d24.713555584118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0388d9c9a8b7%3A0x8e8e8e8e8e8e8e8e!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-[#00c6ff]">أرسل لنا رسالة</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">الاسم</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#00c6ff] focus:outline-none"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#00c6ff] focus:outline-none"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">الرسالة</label>
                <textarea
                  rows={5}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#00c6ff] focus:outline-none"
                  placeholder="أكتب رسالتك هنا..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#00c6ff] text-white font-bold rounded-lg hover:bg-[#00a0cc] transition"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}