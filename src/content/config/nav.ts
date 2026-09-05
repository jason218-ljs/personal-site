import { Locale } from '@/content/config/i18n';

export interface NavItem {
  href: string;
  label: Record<Locale, string>;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    href: '/',
    label: { zh: '关于', en: 'About' },
  },
  {
    href: '/projects',
    label: { zh: '项目', en: 'Projects' },
  },
  {
    href: '/contact',
    label: { zh: '联系', en: 'Contact' },
  },
];

export function getNavItems(locale: Locale): Array<{ href: string; label: string }> {
  return navItems.map(item => ({
    href: item.href,
    label: item.label[locale],
  }));
}
