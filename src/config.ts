export const appConfig = {
  // إعدادات الخطوط (النوع والحجم)
  typography: {
    // يمكنك تغيير نوع الخط هنا. مثال: 'Tajawal, sans-serif' أو 'Cairo, sans-serif'
    // افتراضياً يستخدم خطوط النظام الأساسية
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // أحجام الخطوط (تستخدم مقاسات Tailwind CSS مثل text-xl, text-2xl, text-3xl)
    sizes: {
      continentTitle: "text-2xl sm:text-3xl", // حجم عنوان القارة
      continentText: "text-xl sm:text-2xl",   // حجم تفاصيل القارة
      hintTitle: "text-2xl",                  // حجم عنوان نافذة التعليمات
      hintText: "text-xl",                    // حجم نص التعليمات
    }
  },

  // إعدادات الأصوات (مسارات ومسميات الملفات)
  audio: {
    clickEffect: "/sounds/click.mp3",  // مسار صوت النقرات (الكليكات)
    hintSound: "/sounds/hint.mp3",     // مسار صوت نافذة التعليمات
    
    // دالة تحدد مسار ملف صوت القارة بناءً على اسمها
    // إذا أردت تغيير الامتداد إلى .wav أو تغيير المسار يمكنك تعديله هنا
    getContinentSound: (continentId: string) => `/sounds/${continentId}.mp3`
  },

  // نصوص عامة في التطبيق
  texts: {
    hintTitle: "تعليمات التفاعل",
    hintMessage: "استكشفِ الكرةَ الأرضية، واضغطْ على كلِّ قارَّةٍ لتَتَعرَّفَ موقِعَها وأهمَّ خصائصِها الجُغْرافية."
  }
};
