import type { FC, InputHTMLAttributes, SVGProps } from 'react'
import type { Control, FieldPath, FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { Color } from '../../../../libs/ui/colors'


export interface FieldProperties<T extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onChangeText' | 'value' | 'testID'
  > {
  control: Control<T>
  name: FieldPath<T>
  placeholder?: string
  icon?:  FC<SVGProps<SVGElement>>
  color?: keyof Pick<typeof Color, "gray" | "foreground" | "vibrant" | "shade" | 'background'>
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}


const colorPallete = {
  gray: "bg-gray placeholder-white text-white hover:bg-vibrant focus:bg-vibrant",
  foreground: "bg-foreground placeholder-white text-white hover:bg-vibrant focus:bg-vibrant",
  vibrant: "bg-vibrant placeholder-white text-white hover:bg-gray focus:bg-gray",
  shade: "bg-shade placeholder-white text-white hover:bg-foreground focus:bg-foreground",
  background: "bg-background placeholder-white text-white hover:bg-foreground focus:bg-foreground"
}
const Field = <T extends Record<string, any>>({
                                                color = 'foreground', className, icon:Icon, ...properties
                                              }: FieldProperties<T>): JSX.Element | null => {
  return <Controller
    control={properties.control}
    name={properties.name}
    rules={properties.rules}
    defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <>
        <input
          onBlur={onBlur}
          onChange={onChange}
          defaultValue={properties.defaultValue}
          value={(value ?? '').toString()}
          className={`w-full rounded-xl px-4 py-3 text-sm text-gray duration-200 border-0 ease-linear focus:outline-0 focus:shadow-outline ${colorPallete[color]} ${error ? 'border-danger' : ''} ${className || ''}`}
          {...properties}
        />
        {!!error && <p className={`text-danger text-xs italic`}>{error.message}</p>}
      </>
    )}
  />
}



export default Field
