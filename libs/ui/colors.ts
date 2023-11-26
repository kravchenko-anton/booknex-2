export const Color = {
    gray: '#202127' as "#202127",
    primary: '#A53F2B' as "#A53F2B",
    secondary: '#9E2B25' as "#9E2B25",
    pale: '#3c424c' as "#3c424c",
    dust: '#161618' as "#161618",
    canvas: '#1b1b1f' as "#1b1b1f",
    black: '#000000' as "#000000",
    white: '#ffffff' as "#ffffff",
    alert: '#DC3F41' as "#DC3F41",
    highlight: '#FFBE0B' as "#FFBE0B",
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
