import Link from 'next/link'
import React from 'react'
import { isAndroid, isIOS } from 'react-device-detect'
import Button from '../Button'
import { IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5'

export const AppDownload = () => {
    return (
        <div>
            <Link
                href={isAndroid
                    ? "https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"
                    : isIOS
                        ? "https://apps.apple.com/in/app/jkcarmart/id1629198882"
                        : "https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button className="flex md:hidden justify-center gap-1 px-1 items-center w-full text-center bg-orange-500 text-white text-md font-small py-1 rounded-xl">
                    {isAndroid && <IoLogoGooglePlaystore size={20} />}
                    {isIOS && <IoLogoApple color="white" size={20} />}
                    <span className="text-white">Get the App</span>
                </Button>
            </Link>
        </div>
    )
}
