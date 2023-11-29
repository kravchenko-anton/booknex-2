import type { ChangeEvent, FC, FocusEvent } from 'react'
import { shadeRGBColor } from '../../../../../libs/global/utils/shade-color'
import { Color } from '../../../../../libs/ui/colors'

interface InputProperties {
  error?: string | null
  placeholder?: string
  value?: string
  background?: keyof typeof Color
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}
const Input: FC<InputProperties> = ({ background = Color.shade, onBlur, value, placeholder, onChange, error }) => {
  return <>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      style={{
        backgroundColor: background,
      }}
      className={`w-full rounded px-4 py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${`hover: ${shadeRGBColor(background, 10)}`} ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
    {!!error && <p className="text-red-500 text-xs italic">{error}</p>}
  </>

}

export default Input
