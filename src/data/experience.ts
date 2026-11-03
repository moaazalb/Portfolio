import type { TimelineItem } from '@/types/content';

/** Work experience and education, newest first. */
export const experience: readonly TimelineItem[] = [
  {
    id: 'boost-solutions',
    kind: 'work',
    title: { en: 'Front-end Developer', ar: 'مطور واجهات أمامية' },
    organization: 'Boost Solutions',
    period: { en: 'Feb 2025 – Jul 2026', ar: 'فبراير 2025 – يوليو 2026' },
    points: [
      {
        en: 'Developed scalable front-end applications with Next.js and TypeScript in a Git-based workflow.',
        ar: 'طورت تطبيقات واجهات أمامية قابلة للتوسع باستخدام Next.js وTypeScript ضمن سير عمل يعتمد على Git.',
      },
      {
        en: 'Worked closely with backend developers to integrate RESTful APIs and deliver features end to end.',
        ar: 'عملت عن قرب مع مطوري الخلفية لربط واجهات RESTful وتسليم الميزات بشكل متكامل.',
      },
      {
        en: 'Built reusable Tailwind CSS components that cut development time and ensured cross-browser compatibility.',
        ar: 'بنيت مكونات Tailwind CSS قابلة لإعادة الاستخدام قللت وقت التطوير وضمنت التوافق بين المتصفحات.',
      },
      {
        en: 'Managed complex application state with Redux Toolkit, improving data flow and reducing redundant API calls.',
        ar: 'أدرت حالة التطبيق المعقدة بـ Redux Toolkit مما حسّن تدفق البيانات وقلل طلبات API المكررة.',
      },
      {
        en: 'Contributed to the core front-end features of the GoPublic project.',
        ar: 'ساهمت في تطوير الميزات الأساسية للواجهة الأمامية في مشروع GoPublic.',
        link: 'https://www.gopublic.sy',
},
    ],
  },
  {
    id: 'damascus-university',
    kind: 'education',
    title: {
      en: "Bachelor's Degree in Electronics and Telecommunication Engineering",
      ar: 'إجازة في هندسة الإلكترونيات والاتصالات',
    },
    organization: 'Damascus University',
    period: { en: 'Graduated November 2024', ar: 'التخرج: تشرين الثاني 2024' },
    points: [],
  },
];