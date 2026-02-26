export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2027] to-[#2C5364] text-white">
      {/* الهيدر */}
      <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center"></div>
        </div>
        <h1 className="relative z-20 text-5xl md:text-6xl font-bold text-center">عن رياح الجليد</h1>
      </div>

      {/* المحتوى */}
      <div className="container mx-auto px-6 py-16">
        {/* نظرة عامة */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#00c6ff]">نظرة عامة</h2>
          <p className="text-lg leading-relaxed text-gray-200">
            نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد باستخدام التقنيات الحديثة 
            والمبتكرة. نحرص على تحقيق أفضل النتائج بأفضل الأسعار وفي إطار الالتزام بالمعايير الصحية والبيئية، 
            وذلك لتوفير بيئة مريحة وصحية لعملائنا، سواء في المنازل أو الشركات أو المصانع. يتميز فريق عملنا 
            بالكفاءة والاحترافية، ما يجعلنا من الرواد في هذا المجال. ونحن نهدف دائمًا إلى تحسين خدماتنا 
            وتلبية احتياجات عملائنا بأفضل الطرق الممكنة، وذلك لضمان رضاهم التام عن خدماتنا.
          </p>
        </div>

        {/* الرؤية والرسالة */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#00c6ff]">رؤيتنا</h3>
            <p className="text-gray-200 leading-relaxed">
              تتجلى رؤيتنا في توفير حلول تكييف متطورة وخدمات مميزة لعملائنا، وتحسين جودة الهواء والبيئة 
              في المناطق التي نخدمها، والاستمرار في الابتكار والتطوير لتحقيق النجاح والنمو المستدام. نؤمن 
              بأن فريقنا هو الأساس لنجاحنا وتحقيق رؤيتنا، لذلك نعمل على توفير بيئة عمل إيجابية وملهمة 
              ونشجع التعاون والابتكار والتحسين المستمر.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#00c6ff]">رسالتنا</h3>
            <p className="text-gray-200 leading-relaxed">
              تؤمن شركتنا بأهمية الابتكار والتطوير لتحسين أدائنا وتلبية متطلبات السوق الذي يشهد نموًا كبيرًا 
              بالتزامن مع رؤية 2030. ولذلك نسعى دائمًا إلى الاستمرار في تعزيز الجودة والكفاءة والاستدامة 
              في جميع جوانب أعمالنا، ونعمل بشكل مستمر على تحسين أدائنا وتطوير قدراتنا للحفاظ على مكانتنا 
              كشركة رائدة في هذا المجال.
            </p>
          </div>
        </div>

        {/* القيم */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#00c6ff] text-center">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold mb-2">الإخلاص والتفاني</h4>
              <p className="text-gray-300">
                نحرص على تقديم خدماتنا بإخلاص وتفاني، ونسعى جاهدين لتحسين جودة الخدمات التي نقدمها 
                وتلبية احتياجات عملائنا، مما ينعكس في شهاداتهم الإيجابية وثقتهم بنا.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-bold mb-2">الجودة</h4>
              <p className="text-gray-300">
                نلتزم بتقديم أعلى مستوى من الجودة في المواد والخدمات التي نقدمها لعملائنا، حيث نولي أهمية 
                كبيرة لتوفير المنتجات والخدمات ذات الجودة العالية بهدف تحقيق الرضا الكامل لعملائنا.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">💡</div>
              <h4 className="text-xl font-bold mb-2">الابتكار</h4>
              <p className="text-gray-300">
                نؤمن بأن الابتكار هو مفتاح النجاح، ونعمل دائمًا على تطوير حلول جديدة ومبتكرة تلبي احتياجات 
                الساق وتواكب أحدث التقنيات في مجال التكييف والتبريد.
              </p>
            </div>
          </div>
        </div>

        {/* السجل التجاري */}
        <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-[#00c6ff] text-center">السجل التجاري</h3>
          <div className="space-y-3 text-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold">رقم السجل:</span>
              <span>1010632725</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">تاريخ السجل:</span>
              <span>1441/07/26</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">الاسم التجاري:</span>
              <span>رياح الجليد</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">المدير:</span>
              <span>عبدالله عبدالرحمن عون الشمراني</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">العنوان:</span>
              <span>الرياض - طريق الملك عبدالعزيز</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}