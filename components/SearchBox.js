import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  const router = useRouter();
  const handleMouseDown = (event) => {
    event.preventDefault(); 
  }

  const handleSearchClick = () => {
    router.push('/search?focus=true');
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search your car"
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full outline-none cursor-pointer "
        onMouseDown={handleMouseDown} 
        onClick={handleSearchClick}
      />
      <FaSearch
        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
        onClick={handleSearchClick}
      />
    </div>
  );
}