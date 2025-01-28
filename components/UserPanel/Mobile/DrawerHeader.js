import Button from '@/components/UI/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { isAndroid, isIOS } from 'react-device-detect'
import { IoArrowBack, IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5'

export const DrawerHeader = ({setIsOpen}) => {
    const router = useRouter();

    const navigateToUserPanel = () => {
        setIsOpen(false)
    };
  return (
    <div className='flex justify-center gap-32 border-b-2 border-gray-300 shadow-md py-4'>
        <div className='flex justify-start gap-4'>
        <IoArrowBack 
        size={30} 
        className='mt-1 cursor-pointer' 
        color='black'
        onClick={navigateToUserPanel}
        />
        <Image src="/logo.png" width={80} height={100}/>
        </div>
        <div className="mt-1">
              <Button className="flex md:hidden justify-center gap-1 px-1 items-center w-full text-center bg-orange-500 text-white text-md font-small py-1 rounded-xl">
              {/* <Link href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"> */}
                {isAndroid && <IoLogoGooglePlaystore size={20}/>}
                {isIOS && <IoLogoApple color="white" size={20}/> }
                <span className="text-white">Get the App</span>
                {/* </Link> */}
              </Button>
              </div>
    </div>
  )
}
