import Link from 'next/link'
import React from 'react'

export const AppDownload = () => {
  return (
    <section className="bg-orange-400 text-white p-4 flex flex-col md:flex-row items-center rounded-xl justify-between shadow-lg max-w-md md:max-w-7xl mx-auto">
      <div className="flex flex-col md:hidden items-center space-y-3 ">
        <div className="flex items-center space-x-4">
          <img
            src="/heroImage.png"
            alt="Hero Image"
            className="w-24 h-19 object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-black">Drive smart</h2>
            <p className="text-sm text-white font-medium">with our app</p>
          </div>
        </div>
        <p className="text-center text-md text-black px-4">
          Unlock exclusive discounts, special offers, and price drops every day.
        </p>
        <div className="flex space-x-4">
          <Link
            href="https://apps.apple.com/in/app/jkcarmart/id1629198882"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <img
              src="/app-store.svg"
              alt="App Store Link"
              className="w-28 h-8"
            />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            >
            <img
              src="/play-store.svg"
              alt="Play Store Link"
              className="w-28 h-8"
              />
          </Link>
        </div>
      </div>

      <div className="hidden md:flex w-full items-center justify-between">
        <div className="w-1/3 flex justify-center mb-4 md:mb-0">
          <img
            src="/heroImage.png"
            alt="Left Illustration"
            className="w-20 h-20 md:w-64 md:h-44 object-cover"
          />
        </div>

        <div className="w-1/3 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg md:text-2xl font-bold text-black">Drive smart</h2>
          <p className="text-xs text-white md:text-base font-medium">with our app</p>
          <p className="mt-2 text-black text-xs md:text-base">
            Unlock exclusive discounts, special offers, and price drops every day.
          </p>
        </div>
        <div className="w-1/3 flex flex-col items-center space-y-2 md:space-y-4">
          <Link
            href="https://apps.apple.com/in/app/jkcarmart/id1629198882"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <img
              src="/app-store.svg"
              alt="App Store Link"
              className="w-12 h-12 md:w-40 md:h-20"
            />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <img
              src="/play-store.svg"
              alt="Play Store Link"
              className="w-12 h-12 md:w-40 md:h-20"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
