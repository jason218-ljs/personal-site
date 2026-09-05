'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeNames, Locale, addLocaleToPath, removeLocaleFromPath } from '@/content/config/i18n';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Icon } from '@/components/ui/Icon';

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
}

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: Locale) => {
    const newPath = addLocaleToPath(removeLocaleFromPath(pathname), newLocale);
    router.push(newPath);
  };

  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange as (value: Locale) => void}
    >
      <SelectTrigger aria-label="Select language" className={cn('w-[100px]', className)}>
        <Icon icon={Globe} className="mr-2 h-4 w-4" />
        <SelectValue placeholder={localeNames[locale]} />
      </SelectTrigger>
      <SelectContent position="popper">
        {locales.map(loc => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}