import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { Color } from '../../../../../libs/ui/colors'
import Spiner from '../spiner/spiner'

interface ButtonProperties
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: keyof Omit<typeof Color, 'background' | 'black' | 'white' | "transparent">
  children?: string
  fullWidth?: boolean
 }


  const colorPallete = {
    gray: "bg-gray text-white hover:bg-vibrant",
    foreground: "bg-foreground text-white hover:bg-vibrant",
    vibrant: "bg-vibrant text-white hover:bg-foreground",
    shade: "bg-shade text-white hover:bg-foreground",
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-primary",
    danger: "bg-danger text-white hover:bg-danger",
    success: "bg-success text-white hover:bg-success",
    warning: "bg-warning text-white hover:bg-warning",
  }

const sizeProperty = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-md',
  lg: 'px-4 py-3 text-lg',
}
const Button: FC<ButtonProperties> = ({ children, fullWidth, size = 'sm', color = Color.gray, disabled = false, isLoading = false, className = 'hover:bg-primary', ...rest }) => {
  return <button
    disabled={disabled || isLoading}
    style={{
      opacity: disabled || isLoading ? 0.5 : 1,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      width: fullWidth ? '100%' : 'auto'
    }}
    className={`p-2 px-3 justify-center rounded-lg flex gap-2 items-center font-semibold duration-200 ease-linear ${colorPallete[color]} ${sizeProperty[size]} ${className}`} {...rest}>
  {isLoading  && <Spiner size={size} color={'white'} /> }
  {children}
  </button>
}

export default Button


