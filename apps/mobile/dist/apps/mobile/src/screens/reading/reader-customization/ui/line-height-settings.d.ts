import type { CustomizationStoreActionsType } from '@/screens/reading/store/customization-store';
import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import type { FC } from 'react';
interface LineHeightSettingsProperties {
    lineHeight: number;
    changeLineHeight: CustomizationStoreActionsType['changeLineHeight'];
    colorScheme: ThemePackType;
}
export declare const LineHeightSettings: FC<LineHeightSettingsProperties>;
export {};
