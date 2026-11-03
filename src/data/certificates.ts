import type { Certificate } from '@/types/content';

/** Certificates shown in the Certificates section. */
export const certificates: readonly Certificate[] = [
  {
    id: 'cisco-networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    credentialUrl: 'https://www.credly.com/badges/6176cc83-3ff6-4830-9351-036e3d7e4239/public_url',
  },
  {
    id: 'cisco-linux-essentials',
    title: 'Linux Essentials',
    issuer: 'Cisco Networking Academy',
    credentialUrl: 'https://www.credly.com/badges/f3c5e1c4-039c-4754-9587-c096dc153024/public_url',
  },
  {
    id: 'kodekloud-docker-essentials',
    title: 'Docker Essentials',
    issuer: 'KodeKloud',
    credentialUrl: 'https://learn.kodekloud.com/learn/certificate/046b6f3f-23a4-4edf-a95e-61161ca421ff',
  },
];