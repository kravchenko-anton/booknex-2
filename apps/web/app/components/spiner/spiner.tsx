import type { FC } from 'react'
import { Color } from '../../../../../libs/ui/colors'

interface SpinerProperties {
  color?: string
}
const Spiner: FC<SpinerProperties> = ({ color = 'primary' }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2" style={{
        borderColor: Color[color],
      }}></div>
    </div>
  )
}

export default Spiner
