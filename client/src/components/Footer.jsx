import React from 'react'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <div className='p-3'>
      <div className='flex justify-between p-10'>
        <div className='w-72 self-center'>
          <p className='font-bold text-xl'>JetSetGo</p>
          <p className='text-sm text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eum voluptas amet.</p>
          <div className='flex gap-2 p-5 pt-0 pb-0 w-44'>
            <SocialIcon  url="https://twitter.com" />
            <SocialIcon url="https://instagram.com" />
            <SocialIcon url="https://facebook.com" />
            <SocialIcon url="https://youtube.com" />
          </div>
        </div>
        <div className='text-sm self-center'>
          <p>Destinations</p>
          <p>About Us</p>
          <p>Our Guides</p>
          <p>Blog</p>
          <p>Contact Us</p>
        </div>
        <div className='text-sm self-center'>
          <p>Terms & Conditons</p>
          <p>Terms of Use</p>
          <p>Health & Safety</p>
          <p>Cancellation Policy</p>
          <p>Privacy Policy</p>
        </div>
        <div className='self-center'>
          <div className='p-1'>
            <p>Langauge</p>
            <select className='text-sm border bg-blue-900 text-white ps-2 pe-2 p-[3px]' name="" id="">
              <option value="">English US</option>
              <option value="">English Uk</option>
              <option value="">Gujarati</option>
              <option value="">Hindi</option>
            </select>
          </div>
          <div className='p-1'>
            <p>Currency</p>
            <select className='text-sm border bg-blue-900 text-white ps-2 pe-2 p-[3px]' name="" id="">
              <option value="">US Dollar</option>
              <option value="">INR</option>
              <option value="">Euro</option>
            </select>
          </div>
        </div>
      </div>
      <hr className='border border-slate-500 ms-10 me-10' />
      <div className='p-3 ms-12 me-12'>
        <p className='text-sm'>Copyright @2023 Diyanshu Patel</p>
      </div>
    </div>
  )
}

export default Footer