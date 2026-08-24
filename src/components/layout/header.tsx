import { getSections } from '@/lib/api';
import { HeaderClient } from './header-client';

export type Section = {
  name: string;
  slug: string;
  order: number;
  is_active: boolean;
};

export async function Header({ activeSection }: { activeSection?: string }) {
  const sections = await getSections();

  return (
    <HeaderClient
      activeSection={activeSection}
      initialSections={Array.isArray(sections) ? sections : []}
    />
  );
}
