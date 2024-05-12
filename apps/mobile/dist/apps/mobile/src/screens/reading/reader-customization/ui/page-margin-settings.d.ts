import type { CustomizationStoreActionsType } from '@/screens/reading/store/customization-store';
import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import type { FC } from 'react';
interface PageMarginSettingsProperties {
    padding: number;
    changePadding: CustomizationStoreActionsType['changePadding'];
    colorScheme: ThemePackType;
}
export declare const PageMarginSettings: FC<PageMarginSettingsProperties>;
export {};
