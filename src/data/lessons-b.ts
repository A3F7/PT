import type { Lesson } from "./lesson-types";

export const lessonsB: Lesson[] = [
  {
    id: "c4",
    n: 4,
    ar: "إنشاء شركة جديدة",
    en: "Creating a New Business",
    blurb: "معالج الإعداد: طريقة، أساس محاسبة، ترحيل، فترات — وإيه اللي بيتقفل للأبد.",
    blocks: [
      {
        k: "exam",
        t: "ثلاث قواعد ذهبية: طريقة المحاسبة لا تتغير أبدًا بعد الإنشاء. هيكل الفترات المحاسبية لا يتغير. طريقة الترحيل تتغير في أي وقت — بشرط ترحيل الدفعات غير المرحّلة قبل التحويل من Batch إلى Real-Time.",
      },
      { k: "h", t: "منين تبدأ إنشاء الشركة الجديدة؟" },
      {
        k: "list",
        items: [
          "File ← New Company من شريط القوائم (اختصار Ctrl+N).",
          "زر Create a new company على نافذة بدء التشغيل Startup Window.",
          "Options ← open new windows مش طريقة — الاختيار ده فخ.",
        ],
      },
      {
        k: "p",
        t: "المعالج Wizard بيمر بالمعايير الخمسة بالترتيب: اسم الشركة وعنوانها ← نوع النشاط Business Type ← طريقة المحاسبة ← طريقة الترحيل ← الفترات المحاسبية والسنة المالية. كل خطوة Next، وفي الآخر Finish.",
      },
      {
        k: "win",
        title: "Company Information Window",
        menus: ["File", "New Company"],
        open: "New Company",
        items: [{ label: "Company Information ← Next" }],
        pick: "Company Information",
        fields: [
          "Company Name — مطلوب (بعلامة *)",
          "Address / City / State / Zip / Country",
          "Telephone / Fax / Email / Web Site",
          "Federal Employer ID — هوية ضريبية رسمية",
          "Business Type: Corporation / Partnership / Sole Proprietorship-LLC",
        ],
        note: "النافذة تأخذ الاسم والعنوان وبيانات الاتصال والأرقام الضريبية الرسمية، وكلها قابلة للتعديل لاحقًا. نوع النشاط بيحدد شكل قطاع حقوق الملكية Equity في شجرة الحسابات.",
      },
      {
        k: "table",
        heads: ["نوع النشاط", "هيكل حقوق الملكية"],
        rows: [
          ["Corporation مساهمة", "Common Stock + Paid-in Capital + Retained Earnings (حقوق المساهمين)"],
          ["Partnership تضامن", "حساب رأس مال منفصل لكل شريك + الأرباح/الخسائر غير الموزعة"],
          ["Sole Proprietorship / LLC", "Member Capital Accounts — حسابات رأس مال الأعضاء"],
        ],
      },
      { k: "h", t: "طرق إنشاء الشركة وشجرة الحسابات" },
      {
        k: "table",
        heads: ["الطريقة", "امتى", "قائمة الحسابات؟"],
        rows: [
          [
            "A. Use a sample business type",
            "اختيار معظم الشركات — تختار النوع الأقرب لنشاطك: Simplified (حسابات أقل) أو Detailed (أكثر تفصيلًا وتعقيدًا).",
            "تُعرض قائمة جاهزة تعدّلها لاحقًا.",
          ],
          [
            "B. Copy from an existing Peachtree company",
            "تنسخ الإعدادات من شركة موجودة مثل Bellwether.",
            "تُعرض قائمة جاهزة.",
          ],
          [
            "C. Build your own chart of accounts",
            "للمحاسبين والمستخدمين المتقدمين فقط.",
            "لن تُعرض أي قائمة — أنت تصمّم كل شيء.",
          ],
        ],
      },
      {
        k: "exam",
        t: "قائمة الحسابات تُعرض لو اخترت العينة أو النسخ (A أو B). لو بنيت شجرتك بنفسك: لا قائمة. وفي الامتحان: «الطريقة التي تختارها معظم الشركات» = العينة.",
      },
      { k: "h", t: "طريقة المحاسبة — لا تتغير بعد الإنشاء" },
      {
        k: "table",
        heads: ["الأساس", "الإيراد يُسجل عند", "المصروف يُسجل عند"],
        rows: [
          ["Accrual الاستحقاق — يختاره معظم الشركات", "تحقق الإيراد (وقت البيع) حتى لو النقد لم يُحصل", "تكبد المصروف (استلام البضاعة/الخدمة) حتى لو لم يُدفع"],
          ["Cash النقدي", "استلام النقد فعليًا", "دفع النقد فعليًا"],
        ],
      },
      {
        k: "exam",
        t: "المعالج يكتب حرفيًا: «This cannot be changed after your company is created» — طريقة المحاسبة مش طريقة الترحيل.",
      },
      { k: "h", t: "طريقة الترحيل Posting Method" },
      {
        k: "list",
        items: [
          "Real-Time: كل معاملة تُرحّل وتُحفظ لحظة إدخالها — اختيار معظم الشركات.",
          "Batch: تُحفظ مؤقتًا لمراجعتها ثم تُرحّل كمجموعة في خطوة منفصلة.",
          "يمكن تغييرها في أي وقت من Maintain Company Information.",
          "قبل التحويل من Batch إلى Real-Time: رحّل كل الدفعات غير المرحّلة بالكامل.",
        ],
      },
      { k: "h", t: "الفترات المحاسبية والسنة المالية" },
      {
        k: "list",
        items: [
          "الخيار الأول: 12 فترة شهرية تطابق أشهر التقويم — يختاره معظم الشركات (تبدأ يناير).",
          "الخيار الثاني: فترات لا تطابق الأشهر التقويمية — للأنشطة الموسمية (عدد الفترات 12 أو 6 أو 3 مع تحديد تاريخ البدء).",
          "بعد حفظ هيكل الفترات: لا يمكن تغييره.",
        ],
      },
      {
        k: "steps",
        title: "خطوات المعالج بالترتيب",
        items: [
          "افتح New Company (File أو Ctrl+N أو نافذة البدء).",
          "Company Information — الاسم والعنوان.",
          "اختَر طريقة الإنشاء (عينة / نسخ / بناء).",
          "Accounting Method — استحقاق أو نقدي.",
          "Posting Method — فوري أو دفعي.",
          "Accounting Periods & Fiscal Year.",
          "Finish — «You are ready to create your company» ثم يُفتح Setup Guide تلقائيًا.",
        ],
      },
      {
        k: "exam",
        t: "دليل الإعداد Setup Guide يفتح تلقائيًا بعد إنشاء الشركة، ويمكن فتحه لاحقًا من File ← Setup Guide أو Help ← Setup Guide — نفس طريقتي الفصل الثاني.",
      },
    ],
  },
  {
    id: "c5",
    n: 5,
    ar: "دفتر الأستاذ العام وشجرة الحسابات",
    en: "General Ledger & Chart of Accounts",
    blurb: "الدفاتر الثلاثة، الترميز، خطوات الإعداد، الموازنات، وحساب التقريب.",
    blocks: [
      {
        k: "exam",
        t: "فرّق بين ثلاث جمل بتتكرر في الاختيارات: GL = ملخص. Subsidiary = تفصيل لأي حساب له حسابات فرعية كثيرة. Chart = قائمة كل حسابات الأستاذ وهي النظام الأساسي لشغل Peachtree.",
      },
      { k: "h", t: "الدفاتر الثلاثة" },
      {
        k: "table",
        heads: ["الدفتر", "ماذا يسجّل"],
        rows: [
          ["General Ledger الأستاذ العام", "Summary-level data — بيانات مجموع تراكمي لكل أصل والتزام وحقوق ملكية وإيراد ومصروف."],
          ["Subsidiary Ledger الأستاذ المساعد", "كل البيانات التفصيلية لأي حساب أستاذ له حسابات فرعية فردية كثيرة."],
          ["AR Subsidiary دفتر المدينين", "البيانات التفصيلية للعملاء الذين يشترون بالأجل."],
          ["AP Subsidiary دفتر الدائنين", "البيانات التفصيلية لمشتريات البضائع بالآجل من كل مورد."],
        ],
      },
      { k: "h", t: "شجرة الحسابات Chart of Accounts" },
      {
        k: "list",
        items: [
          "قائمة بكل حسابات دفتر الأستاذ العام التي تستخدمها المنشأة.",
          "تنظيم الدليل يعادل تنظيم الشركة — لأن ما يظهر في القوائم المالية يعتمد على ما أُعدّ في الدليل.",
          "هي النظام التحتاني (Underlying System) لكل العمل داخل Peachtree.",
          "الدليل الموصى به أثناء إنشاء الشركة يمكن تعديله بعد الإنشاء.",
        ],
      },
      { k: "h", t: "الترميز Coding" },
      {
        k: "p",
        t: "Coding technique هو التعيين المنهجي المنظم للأرقام أو الحروف للعناصر لتصنيفها وتنظيمها. النوعان في الكتاب:",
      },
      {
        k: "table",
        heads: ["النوع", "الفكرة"],
        rows: [
          ["Sequence Codes أكواد تسلسلية", "تمثيل العناصر بترتيب رقمي متسلسل تصاعدي أو تنازلي."],
          ["Block Codes أكواد كتل", "تخصيص كتل رقمية داخل تسلسل معين لتمييز فئات محاسبية — تضيف كودًا جديدًا داخل كتلة فئته من غير إعادة ترقيم الهيكل كله."],
        ],
      },
      { k: "h", t: "خطوات إعداد الأستاذ العام (5 خطوات)" },
      {
        k: "steps",
        items: [
          "قرارات أولية أثناء إنشاء الشركة: اختيار طريقة بناء الشجرة (عينة / نسخ / بناء).",
          "إدخال أو تعديل الحسابات من Maintain ← Chart of Accounts.",
          "الأرصدة الافتتاحية وتعديلات الفترات السابقة Prior-Period Adjustments.",
          "إعداد الموازنات Maintain Budgets.",
          "إعداد حساب التقريب Rounding Account.",
        ],
      },
      {
        k: "win",
        title: "Maintain ← Chart of Accounts",
        menus: ["Maintain", "Tasks"],
        open: "Maintain",
        items: [{ label: "Chart of Accounts" }, { label: "Budgets" }, { label: "Default Information" }],
        pick: "Chart of Accounts",
        fields: [
          "Add New Accounts — إضافة حساب",
          "Modify Description — تعديل الوصف",
          "Delete Account — حذف (إن لم توجد معاملات)",
          "Make Inactive — إيقاف الحساب",
          "Change Account ID — تغيير الكود (من شريط الأدوات)",
        ],
        note: "التعديل من Maintain مش Tasks. شريط الأدوات يضيف ويحذف ويغيّر رقم الحساب. Prior-Period Adjustments: تصحيحات للرصيد الافتتاحي للأرباح المبقاة — من Account Beginning Balances ثم اختيار الفترة ← OK.",
      },
      {
        k: "win",
        title: "الموازنة Budgets",
        menus: ["Maintain", "Tasks"],
        open: "Maintain",
        items: [{ label: "Budgets" }, { label: "Chart of Accounts" }],
        pick: "Budgets",
        fields: [
          "Autofill: Use Actual Amounts from Peachtree",
          "Autofill: Copy Amounts from the Open Budget",
          "Excel: انسخ للموازنة ← احسب ← أعد النسخ إلى Peachtree",
        ],
        note: "Maintain ← Budgets تبني توقعات بمبالغ الدولارات لحسابات تختارها. بناء الموازنة: استخدم البيانات الفعلية سريعًا ثم عدّلها لاحقًا. المسار من Maintain مش Tasks.",
      },
      {
        k: "win",
        title: "حساب التقريب Rounding Account",
        menus: ["Maintain"],
        open: "Maintain",
        items: [{ label: "Default Information" }, { label: "General Ledger" }],
        pick: "General Ledger",
        fields: ["Rounding Account", "التوصية: 39005 Retained Earnings"],
        note: "منطقة احتجاز مؤقتة لفروق تقريب كسور العملة في القوائم المالية. المسار: Maintain ← Default Information ← General Ledger. التوصية: حساب حقوق ملكية — تحديدًا الأرباح المبقاة.",
      },
    ],
  },
  {
    id: "c6",
    n: 6,
    ar: "إعداد العملاء وضرائب المبيعات",
    en: "Setting up Customers & Sales Taxes",
    blurb: "الافتراضي مقابل الخاص، الكشوف ورسائل التذكير، الضريبة، وبطاقة العميل.",
    blocks: [
      {
        k: "exam",
        t: "العميل في جملة الفصل: الأشخاص الذين تبيع لهم الشركة منتجاتها أو تقدم لهم خدماتها. المورد هو اللي نشتري منه. الافتراضي ينطبق على الكل — والخاص لعميل واحد.",
      },
      { k: "h", t: "طبقتان من معلومات العملاء" },
      {
        k: "list",
        items: [
          "Default information: صالحة لكل العملاء — تساعد في إدخال المعاملات وتعبئة التقارير والنماذج تلقائيًا.",
          "Specific information: كل عميل يحتاج معاملة خاصة — حدود ائتمان وخصومات مختلفة.",
        ],
      },
      {
        k: "win",
        title: "Customer Defaults",
        menus: ["Maintain"],
        open: "Maintain",
        items: [{ label: "Default Information" }, { label: "Customers" }],
        pick: "Customers",
        fields: [
          "Terms and Credit",
          "Account Aging",
          "Custom Fields",
          "Finance Charges",
          "Pay Methods",
        ],
        note: "المسار: Maintain ← Default Information ← Customers — التبويبات الخمسة كلها جوّه نافذة الافتراضيات.",
      },
      {
        k: "table",
        heads: ["التبويب", "ماذا تملأ"],
        rows: [
          [
            "Terms and Credit",
            "Net due in (أيام استحقاق صافي الفاتورة مثل 30)، Discount in (أيام سريان الخصم مثل 10)، Discount Percent (2%)، Credit Limit (50,000)، وحالة الائتمان Credit Status.",
          ],
          [
            "Account Aging",
            "تقادم الفواتير حسب Invoice date (عمر الفاتورة) أو Due date (مدى التأخر). الفئات: 0-30 و31-60 و61-90 وOver 90 — ونتيجتها تقرير Aged Receivable.",
          ],
          [
            "Custom Fields",
            "فعّل خانة Enabled لكل حقل مخصص تحتاجه — معلومات إضافية عن العملاء. والمعلومات الخاصة بعميل معين (بريد/تليفون) في تبويب General من Maintain ← Customers/Prospects.",
          ],
          [
            "Finance Charges",
            "رسوم تأخير على الفواتير المتأخرة: الأيام والنسبة السنوية (مثال 18%) والحد الأدنى. لعميل لا تُحسب عليه الرسوم: عدّل سجله من تبويب Payment & Credit.",
          ],
          [
            "Pay Methods",
            "حتى 10 طرق دفع (كاش، شيك، بطاقات). Assign Deposit Ticket IDs: اختيار In Receipts يملأ رقم قسيمة الإيداع تلقائيًا في نافذة القبض.",
          ],
        ],
      },
      { k: "h", t: "الكشوف ورسائل التذكير Dunning Messages" },
      {
        k: "p",
        t: "خيارات طباعة الكشوف تُضبط على مستوى المنشأة (Business Level) وليس على العميل الفرد. المسار: Maintain ← Default Information ← Statement/Invoices. وللطباعة: Reports & Forms ← Forms ← Customer Statements ← Preview and Print.",
      },
      {
        k: "win",
        title: "Dunning Messages",
        menus: ["Maintain"],
        open: "Maintain",
        items: [{ label: "Default Information" }, { label: "Statement/Invoices" }, { label: "Dunning Messages" }],
        pick: "Dunning Messages",
        fields: [
          "أقل من 0 يوم: Thanks for your business",
          "أقل من 30: You may have forgotten this bill",
          "أقل من 60: Please attend to this payment as soon as possible",
          "كل الفواتير الأخرى: الرسالة الرابعة (أقوى تنبيه)",
        ],
        note: "إشعارات قصيرة تنبّه العملاء بوجود فواتير متأخرة بعدد معين من الأيام — بناءً على أقدم فاتورة للعميل. تُطبع الرسالة عندما يكون أيام تأخر أقدم فاتورة أقل من أو يساوي الرقم في الخانة.",
      },
      { k: "h", t: "ضريبة المبيعات قبل الفوترة" },
      {
        k: "p",
        t: "لازم إعداد ضرائب المبيعات قبل إصدار أي فواتير. أولاً جهات الضريبة Sales Taxes Agencies — وهي جهات فرض الضريبة كل على حدة: الولاية state، أو دولة/مدينة معينة، أو ضريبة خاصة. ثم الضريبة نفسها.",
      },
      {
        k: "steps",
        items: [
          "Maintain ← Sales Taxes ← Set up a new sales tax ← Next.",
          "«ما إجمالي المعدل؟» مثال الكتاب: ولاية 4% + مقاطعة 2% = 6%.",
          "«كم عدد المعدلات الفردية؟» = 2.",
          "أدخل جهات الضريبة المكوّنة ← Next.",
          "اربط الضريبة بسجل كل عميل لتُستدعى تلقائيًا في الفواتير.",
        ],
      },
      {
        k: "win",
        title: "بطاقة العميل Customers/Prospects",
        menus: ["Maintain"],
        open: "Maintain",
        items: [{ label: "Customers/Prospects" }],
        pick: "Customers/Prospects",
        fields: [
          "Header: Customer ID فريد + Name + بيانات الاتصال",
          "General: العنوان والاتصال والحقول المخصصة",
          "Contacts: جهات الاتصال وعنوان الشحن",
          "History: تواريخ الفواتير والسداد",
          "Sales Info: طرق الشحن والأسعار",
          "Payment & Credit: شروط الدفع وإيقاف رسوم التأخير لعميل بعينه",
        ],
        note: "بعد الافتراضيات تدخل بيانات كل عميل من Maintain ← Customers/Prospects. الرأس Header يحوي الرقم والاسم والاتصال فقط — التاريخ والمبيعات والائتمان تبويبات منفصلة. ولمنح عميل رئيسي ميزة ائتمان خاصة: تبويب Payment & Credit في سجله هو.",
      },
    ],
  },
];
