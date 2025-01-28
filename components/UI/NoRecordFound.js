import Image from 'next/image';
import Link from 'next/link';

const NoRecordFound = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-5 md:mx-auto md:py-32">
      <div className="mb-4">
      <Image src="/empty-wishlist.svg" alt="Empty" width={280} height={200} />
      </div>

      <p className="text-gray-600 text-lg font-medium mb-4 max-w-lg">
        Browse through all cars and Wishlist your favorite.
      </p>

      <Link href="/buy">
        <button className="bg-orange-500 text-white font-medium py-2 px-6 rounded-lg text-lg hover:bg-orange-600 transition">
          Browse All Cars
        </button>
      </Link>
    </section>
  );
};

export default NoRecordFound;
