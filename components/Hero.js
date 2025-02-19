import Image from "next/image";

export default function Hero() {
  return (
    <div
      id="hero"
      className="bg-cover mt-16 bg-center pt-4 md:px-16 flex flex-row items-center justify-between"
      style={{ backgroundImage: "url('/hero bg.png')" }}
    >
      <div className="max-w-lg text-left md:flex-1 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold whitespace-nowrap">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">Buy</span>
          <span className="text-neutral-700"> and </span>
          <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Sell</span>
        </h2>
        <p className="text-md font-medium text-gray-800 mt-2">
          from Jammu and <br /> Kashmir's only trusted <br /> car platform.
        </p>
      </div>
      <div className="mt-0 w-[140px] md:mt-0 md:w-1/2 flex justify-end">
        <Image
          src="/hero_visual.png"
          alt="Cars"
          width={500}
          height={300}
          className="w-[230px] h-[200px]  max-w-lg md:max-w-none md:w-auto"
        />
      </div>
    </div>
  );
}