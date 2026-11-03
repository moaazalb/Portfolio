import { notFound } from 'next/navigation';

/** Catch-all route: any unknown URL renders the localized 404 page. */
export default function CatchAllPage(): never {
  notFound();
}