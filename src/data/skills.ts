import type { SkillGroup } from '@/types/content';

/** Skill groups shown in the Skills section. */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'frontend',
    items: [
      'React',
      'Next.js',
      'Redux Toolkit',
      'Context API',
      'Tailwind CSS',
      'Bootstrap',
      'shadcn/ui',
      'React Hook Form',
      'Zod',
      'Framer Motion',
    ],
  },
  { id: 'languages', items: ['JavaScript (ES6+)', 'TypeScript', 'C++', 'HTML5', 'CSS3'] },
  {
    id: 'tools',
    items: ['Git', 'Firebase (Auth/Firestore)', 'Cloudinary', 'Postman', 'Swagger', 'Netlify'],
  },
  { id: 'infra', items: ['Linux', 'Docker', 'CI/CD', 'Networking'] },
];