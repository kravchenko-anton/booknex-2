import type { ChangeEvent, FC, FocusEvent, InputHTMLAttributes } from 'react'
import type { Color } from '../../../../../libs/ui/colors'

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
  placeholder?: string
  value?: string
  color?: keyof Pick<typeof Color, "gray" | "foreground" | "vibrant" | "shade" | 'background'
  >
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

const colorPallete = {
  gray: "bg-gray placeholder-white text-white hover:bg-vibrant focus:bg-vibrant",
  foreground: "bg-foreground placeholder-white text-white hover:bg-vibrant focus:bg-vibrant",
  vibrant: "bg-vibrant placeholder-white text-white hover:bg-gray focus:bg-gray",
  shade: "bg-shade placeholder-white text-white hover:bg-foreground focus:bg-foreground",
  background: "bg-background placeholder-white text-white hover:bg-foreground focus:bg-foreground"
}
const Input: FC<InputProperties> = ({ color = 'foreground', className, onBlur, value, placeholder, onChange, error, ...rest }) => {
  return <>
    <input
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      className={`w-full rounded-xl px-4 py-3 text-sm text-gray duration-200 border-0 ease-linear focus:outline-0 focus:shadow-outline ${colorPallete[color]} ${error ? 'border-danger' : ''} ${className}`}
      {...rest}
    />
    {!!error && <p className="text-danger text-xs italic">{error}</p>}
  </>

}

export default Input
