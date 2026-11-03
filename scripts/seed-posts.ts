/** Sample blog posts, uploaded by `npm run seed`. Edit freely. */
export const seedPosts = [
 {
  slug: 'securing-firebase-admin-with-environment-variables',
  publishedAt: '2026-11-03',
  title: {
    en: 'Securing Firebase Admin SDK with Environment Variables',
    ar: 'تأمين Firebase Admin SDK باستخدام متغيرات البيئة',
  },
  excerpt: {
    en: 'How I secured Firebase Admin credentials using environment variables and kept sensitive service account keys out of the Git repository.',
    ar: 'كيف أمّنت بيانات اعتماد Firebase Admin باستخدام متغيرات البيئة ومنعت تسريب مفاتيح حساب الخدمة إلى مستودع Git.',
  },
  content: {
    en: 'While developing my portfolio, I needed Firebase Admin SDK to upload projects and blog posts to Cloud Firestore through a custom seeding script. Since the Admin SDK requires service account credentials, I had to make sure these sensitive credentials were never exposed in the source code or Git repository.\n\nInitially, the service account credentials were stored in a local JSON file. However, committing this file to Git could expose private keys and compromise the Firebase project. To prevent this, I moved the credentials into an environment variable named FIREBASE_SERVICE_ACCOUNT.\n\nI updated the seeding script to read the credentials from process.env and parse the JSON value before initializing Firebase Admin with cert(). This allowed the script to continue working without depending on a credentials file inside the project.\n\nI also added the local environment file and service account JSON file to .gitignore. This ensures that sensitive configuration files remain on my local machine and are not included in future commits.\n\nAnother important step was handling missing configuration explicitly. Before initializing Firebase Admin, the script checks whether FIREBASE_SERVICE_ACCOUNT is available and throws a descriptive error if it is not configured.\n\nThis approach separates application code from sensitive configuration, makes the seeding process safer, and provides a more maintainable way to manage Firebase credentials across different environments.',
    ar: 'أثناء تطوير معرض أعمالي، احتجت إلى استخدام Firebase Admin SDK لرفع المشاريع ومقالات المدونة إلى Cloud Firestore من خلال سكربت مخصص. وبما أن Admin SDK يحتاج إلى بيانات اعتماد حساب الخدمة، كان من الضروري التأكد من عدم كشف هذه البيانات الحساسة داخل الكود المصدري أو مستودع Git.\n\nفي البداية، كانت بيانات اعتماد حساب الخدمة محفوظة داخل ملف JSON محلي. لكن رفع هذا الملف إلى Git قد يؤدي إلى كشف المفاتيح الخاصة وتعريض مشروع Firebase للخطر. لتجنب ذلك، نقلت بيانات الاعتماد إلى متغير بيئة باسم FIREBASE_SERVICE_ACCOUNT.\n\nبعد ذلك، عدّلت سكربت رفع البيانات ليقرأ بيانات الاعتماد من process.env ويحوّل قيمة JSON باستخدام JSON.parse قبل تهيئة Firebase Admin من خلال cert(). وبهذه الطريقة، أصبح السكربت يعمل دون الاعتماد على وجود ملف بيانات الاعتماد داخل المشروع.\n\nأضفت أيضاً ملف البيئة المحلي وملف JSON الخاص بحساب الخدمة إلى .gitignore، لضمان بقائهما على جهازي وعدم تضمينهما في عمليات Git المستقبلية.\n\nومن الخطوات المهمة أيضاً التعامل مع غياب الإعدادات بشكل واضح؛ إذ يتحقق السكربت من وجود FIREBASE_SERVICE_ACCOUNT قبل تهيئة Firebase Admin، ويعرض رسالة خطأ واضحة إذا لم يكن المتغير مضبوطاً.\n\nيساعد هذا الأسلوب على فصل الكود البرمجي عن الإعدادات الحساسة، ويجعل عملية رفع البيانات أكثر أماناً، ويوفر طريقة أسهل وأكثر قابلية للصيانة لإدارة بيانات اعتماد Firebase في بيئات التشغيل المختلفة.',
  },
},
];