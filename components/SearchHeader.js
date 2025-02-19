import { IoArrowBack } from 'react-icons/io5';

import { useRouter } from 'next/router';
import { AppDownload } from './UI/UIcomponents/AppDownload';
import Link from 'next/link';
import Image from 'next/image';


const SearchHeader = () => {
    const router = useRouter();

    return (
        <div className="fixed w-full top-0 left-0 right-0 flex bg-white justify-between px-4 border-b-2 border-gray-300 shadow-md py-4">
            <div className="flex justify-start gap-4">
                <IoArrowBack
                    size={30}
                    className="mt-1 cursor-pointer"
                    color="black"
                    onClick={() => router.push('/')}
                />
                <Link href="/">
                <Image src="/logo.png" width={80} height={90} alt="Logo" />
                </Link>
            </div>
            <div className="mt-1">
                <AppDownload />
            </div>
        </div>
    );
};

export default SearchHeader;