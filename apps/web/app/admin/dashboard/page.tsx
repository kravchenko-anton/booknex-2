"use client";
import { useAuth } from '../../../hooks/useAuth'

export default function Page() {
const { user } = useAuth()
  console.log(user )
  return (
    <div>
    <h1>
      dashboard
    </h1>
    </div>
  )
}
