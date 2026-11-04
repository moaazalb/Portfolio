import type { Project } from '@/types/content';

/** All projects shown in the portfolio. */
export const projects: readonly Project[] = [
  {
    slug: 'ecomnest',
    title: { en: 'EcomNest E-commerce', ar: 'EcomNest للتجارة الإلكترونية' },
    summary: {
      en: 'A complete online store with authentication, an admin dashboard, order tracking and a Firestore-backed cart.',
      ar: 'متجر إلكتروني متكامل مع المصادقة ولوحة إدارة وتتبع الطلبات وسلة مشتريات مرتبطة بـ Firestore.',
    },
    role: { en: 'Developer (personal project)', ar: 'مطور (مشروع شخصي)' },
    features: [
      {
        en: 'User authentication and account management with Firebase Authentication',
        ar: 'مصادقة المستخدمين وإدارة الحسابات عبر Firebase Authentication',
      },
      {
        en: 'Admin dashboard with product CRUD, order status tracking (Pending, Confirmed, Delivered) and sales statistics',
        ar: 'لوحة إدارة لإدارة المنتجات (إضافة وتعديل وحذف) وتتبع حالة الطلبات (قيد الانتظار، مؤكد، تم التسليم) وإحصائيات المبيعات',
      },
      {
        en: 'Cloud Firestore for products, categories, users and orders, and Cloudinary for image uploads',
        ar: 'استخدام Cloud Firestore للمنتجات والتصنيفات والمستخدمين والطلبات، وCloudinary لرفع الصور',
      },
      {
        en: 'Redux Toolkit shopping cart synchronized with Firestore, plus a checkout flow with order summary',
        ar: 'سلة مشتريات بـ Redux Toolkit متزامنة مع Firestore، وعملية دفع مع ملخص للطلب',
      },
      {
        "en": "Implemented dark/light theme switching and bilingual support (Arabic/English) with dynamic RTL/LTR layout adaptation.",
        "ar": "تم تنفيذ خاصية التبديل بين النمطين الداكن والفاتح، ودعم لغتين (العربية/الإنجليزية) مع تكييف ديناميكي لتخطيط الصفحة (من اليمين إلى اليسار أو من اليسار إلى اليمين)."
      },
      {
        en: 'Role-based admin access using Firebase Custom Claims and Firestore Security Rules',
        ar: 'صلاحيات إدارة قائمة على الأدوار عبر Firebase Custom Claims وقواعد أمان Firestore',
      },
      {
        en: 'Forms validated with React Hook Form and Zod, with Toastify notifications and Framer Motion animations',
        ar: 'نماذج مدققة بـ React Hook Form وZod مع إشعارات Toastify وحركات Framer Motion',
      },
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Redux Toolkit',
      'Firebase Auth',
      'Cloud Firestore',
      'Cloudinary',
      'Bootstrap',
      'Framer Motion',
    ],
    category: 'ecommerce',
    cover: '/projects/ecomnest/cover.webp',
    gallery: [
      {
        src: '/projects/ecomnest/desktop-home.webp',
        alt: { en: 'EcomNest home page', ar: 'الصفحة الرئيسية لـ EcomNest' },
        device: 'desktop',
      },
      {
        src: '/projects/ecomnest/mobile-home.webp',
        alt: { en: 'EcomNest on mobile', ar: 'EcomNest على الجوال' },
        device: 'mobile',
      },
    ],
    liveUrl: 'https://ecomnest-ecommerce.netlify.app',
    repoUrl: 'https://github.com/moaazalb/Ecommerce-v2',
    embeddable: true,
  },
  {
    slug: 'modern-clothing',
    title: { en: 'Modern Clothing E-commerce', ar: 'متجر ملابس عصري' },
    summary: {
      en: 'A modern clothing storefront built with the Next.js App Router, with category browsing, authentication and a persistent cart.',
      ar: 'متجر ملابس عصري مبني بـ Next.js App Router مع تصفح حسب التصنيف ومصادقة وسلة مشتريات محفوظة.',
    },
    role: { en: 'Developer (personal project)', ar: 'مطور (مشروع شخصي)' },
    features: [
      {
        en: 'Next.js App Router and TypeScript with reusable components and responsive layouts',
        ar: 'Next.js App Router وTypeScript مع مكونات قابلة لإعادة الاستخدام وتصاميم متجاوبة',
      },
      {
        en: 'Login, signup and logout flows with form validation and error handling (React Hook Form + Zod)',
        ar: 'تسجيل الدخول وإنشاء الحساب والخروج مع تدقيق النماذج ومعالجة الأخطاء (React Hook Form + Zod)',
      },
      {
        en: 'Dynamic product catalog with category browsing and detailed product pages',
        ar: 'كتالوج منتجات ديناميكي مع التصفح حسب التصنيف وصفحات تفصيلية للمنتجات',
      },
      {
        en: 'Redux Toolkit cart with browser-storage persistence and real-time UI feedback',
        ar: 'سلة مشتريات بـ Redux Toolkit محفوظة في المتصفح مع استجابة فورية للواجهة',
      },
      {
        en: 'Smooth Framer Motion animations and SweetAlert2 success and error notifications',
        ar: 'حركات سلسة بـ Framer Motion وإشعارات نجاح وخطأ عبر SweetAlert2',
      },
      {
        en: 'Configured and deployed on Netlify',
        ar: 'إعداد المشروع ونشره على Netlify',
      },
    ],
    tags: [
      'Next.js 16',
      'TypeScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'shadcn/ui',
      'React Hook Form',
      'Zod',
      'Framer Motion',
      'SweetAlert2',
    ],
    category: 'ecommerce',
    cover: '/projects/modern-clothing/cover.webp',
    gallery: [
      {
        src: '/projects/modern-clothing/desktop-home.webp',
        alt: { en: 'Clothing store home page', ar: 'الصفحة الرئيسية لمتجر الملابس' },
        device: 'desktop',
      },
      {
        src: '/projects/modern-clothing/mobile-home.webp',
        alt: { en: 'Clothing store on mobile', ar: 'متجر الملابس على الجوال' },
        device: 'mobile',
      },
    ],
    liveUrl: 'https://modern-clothing-ecommerce.netlify.app',
    repoUrl: 'https://github.com/moaazalb/Clothing-Ecommerce-v2',
    embeddable: true,
  },
];

/**
 * Finds a project by its slug.
 * @param slug - URL slug of the project.
 * @returns The matching project, or `undefined` if none exists.
 */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);