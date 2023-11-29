import type { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className='mt-[70px]'> {children}</div>
}

export default Layout
