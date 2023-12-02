import type { FC } from 'react'

export interface SpinerProperties {
  color?: "white" | "black"
  size?: 'sm' | 'md' | 'lg'
}

const spinnerSizeSettigs = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-12 h-12",
}
const Spiner: FC<SpinerProperties> = ({ size = 'sm', color = 'primary' }) => {
  return (
  <svg
      className={`animate-spin ${spinnerSizeSettigs[size]}`}
      style={{ color: color }}
      fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  )
}

export default Spiner
