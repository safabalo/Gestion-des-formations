import React from 'react'
import error4 from '../images/404.gif'

export default function ErrorPage() {
  return (
    <div className='w-screen'>
      <img src={error4} alt="404" className='w-screen h-screen'/>
    </div>
  )
}
