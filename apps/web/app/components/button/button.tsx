import type { FC } from 'react'
import { shadeRGBColor } from '../../../../../libs/global/utils/shade-color'
import { Color } from '../../../../../libs/ui/colors'
import Spiner from '../spiner/spiner'

interface ButtonProperties {
  isLoading?: boolean
  disabled?: boolean
  color: keyof typeof Color
  children?: React.ReactNode
 }
const Button: FC<ButtonProperties> = ({ children, color = "vibrant", disabled = false, isLoading = false }) => {
  return <button
    type="button"
    data-te-ripple-init
    disabled={disabled || isLoading}
    data-te-ripple-color={shadeRGBColor(color, 10)}
    style={{
      backgroundColor: Color[color],
    }}
    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
    {isLoading ? <Spiner color={shadeRGBColor(color, 50)
    } /> : children}
  </button>
}

export default Button
