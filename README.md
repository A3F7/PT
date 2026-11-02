# Peachtree Master 🍑

موقع تعليمي تفاعلي لمادة **حزم البرامج المحاسبية (Peachtree / Sage 50)** — ياخدك من الصفر لحد ما تحل أي سؤال:

- 📚 **6 فصول** بشرح كامل عربي + إنجليزي مع أنيميشن
- 🏦 **بنك 214 سؤال** (اختياري + صح/خطأ) بترجمة وشرح لكل سؤال
- ⏱️ **وضع امتحان حقيقي**: 30 سؤال في 45 دقيقة مع مؤقت ونتيجة بشهادة
- 💾 تقدمك محفوظ تلقائياً في المتصفح (localStorage)

مبني بـ Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion.

---

## 🚀 النشر على Vercel

المشروع جاهز للنشر مباشرة — لا يحتاج أي متغيرات بيئة ولا قاعدة بيانات.

### الطريقة 1: عبر GitHub (الموصى بها)

1. ارفع المشروع على مستودع GitHub جديد:
   ```bash
   git init
   git add .
   git commit -m "Peachtree Master v1.0"
   git branch -M main
   git remote add origin https://github.com/USERNAME/peachtree-master.git
   git push -u origin main
   ```
2. افتح [vercel.com/new](https://vercel.com/new) وسجّل الدخول بحساب GitHub.
3. اضغط **Import** واختر المستودع.
4. Vercel يكتشف Next.js تلقائياً — سيب كل الإعدادات كما هي واضغط **Deploy**.
5. بعد دقيقة تقريباً الموقع يكون لايف على رابط مثل:
   `https://peachtree-master.vercel.app`

### الطريقة 2: عبر Vercel CLI (من غير GitHub)

```bash
npm install -g vercel
cd peachtree-master
vercel          # أول مرة: يسألك تسجيل دخول وإعدادات — اقبل الافتراضي
vercel --prod   # للنشر النهائي
```

### التشغيل محلياً

```bash
npm install
npm run dev     # يفتح على http://localhost:3000
```

> **متطلبات:** Node.js 20.9 أو أحدث.

---

## 📁 هيكل المشروع

```
src/
├── app/            # الصفحات والتخطيط العام
├── components/
│   ├── study/      # مكونات الموقع (الرئيسية، الدروس، البنك، الامتحان...)
│   └── ui/         # مكونات الواجهة (Toast)
├── data/           # 214 سؤال + 6 فصول دروس (عربي/إنجليزي)
├── hooks/          # إدارة التقدم والتنبيهات
└── lib/            # أدوات مساعدة
public/             # التوقيع الذهبي والشعارات
```

## 🛠️ ملاحظات

- كل البيانات (الأسئلة والدروس) محلية داخل `src/data/` — أي تعديل عليها يظهر مباشرة بعد إعادة النشر.
- لا توجد أسرار أو مفاتيح API في المشروع.
- لإضافة أسئلة جديدة: أضفها في ملفات `src/data/q-*.ts` بنفس النمط الموجود.
