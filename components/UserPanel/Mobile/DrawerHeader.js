import Button from '@/components/UI/Button'
import { AppDownload } from '@/components/UI/UIcomponents/AppDownload'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { isAndroid, isIOS } from 'react-device-detect'
import { IoArrowBack, IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5'

export const DrawerHeader = ({ setIsOpen }) => {
  const router = useRouter();

  const navigateToUserPanel = () => {
    setIsOpen(false)
  };
  return (
    <div className='flex justify-between px-4 border-b-2 border-gray-300 shadow-md py-4'>
      <div className='flex justify-start gap-4'>
        <IoArrowBack
          size={30}
          className='mt-1 cursor-pointer'
          color='black'
          onClick={navigateToUserPanel}
        />
        <Link href="/">
          <Image src="/logo.png" width={80} height={90} />
        </Link>
      </div>
      <div className="mt-1">
        <AppDownload />

      </div>
    </div>
  )
}
