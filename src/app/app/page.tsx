import { redirect } from 'next/navigation'
import React from 'react'

const Page = () => {

  redirect('/app/home')

  return (
    <div>Page</div>
  )
}

export default Page