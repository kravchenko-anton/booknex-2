export const Color = {
    gray: '#90989f' as "#90989f",
    foreground: '#202127' as "#202127",
    vibrant: '#3c424c' as "#3c424c",
    shade: '#161618' as "#161618",
    background: '#1b1b1f' as "#1b1b1f",
    primary: '#A53F2B' as "#A53F2B",
    secondary: '#9E2B25' as "#9E2B25",
    black: '#000000' as "#000000",
    white: '#ffffff' as "#ffffff",
    danger: '#DC3F41' as "#DC3F41",
    warning: '#FFBE0B' as "#FFBE0B",
    transparent: 'transparent' as "transparent",
}




export type LineColorType = {
  [K in keyof
  typeof Color
]: typeof Color[K]
}[keyof typeof Color]
export interface ColorProperties {
  color?: LineColorType | string
}
