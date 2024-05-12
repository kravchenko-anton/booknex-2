import { getStyleTag } from '@/screens/reading/scripts/styles-injection';
import { useState } from 'react';
export const useStyleTag = (properties, scrollPosition) => {
    const { lineHeight, fontSize, font, colorScheme, padding } = properties;
    const styleTag = getStyleTag({
        colorPalette: colorScheme.colorPalette,
        fontFamily: font.fontFamily,
        fontSize: fontSize,
        lineHeight,
        padding
    });
    const [defaultProperties] = useState({
        scrollPosition,
        theme: styleTag
    });
    return { styleTag, defaultProperties };
};
//# sourceMappingURL=useStyleTag.js.map