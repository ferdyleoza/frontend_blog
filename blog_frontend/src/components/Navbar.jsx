import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-5 rounded-lg shadow-lg flex items-center justify-between">
      <div className="font-semibold text-xl tracking-wider">
        <Link to="/" className="hover:text-blue-200 transition duration-300">
          MyBlog
        </Link>
      </div>
      <ul className="flex gap-6">
        <li><Link to="/artikel" className="relative hover:text-blue-200 transition duration-300 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 before:transition-all before:duration-300 hover:before:w-full">Artikel</Link></li>
        <li><Link to="/komentar" className="relative hover:text-blue-200 transition duration-300 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 before:transition-all before:duration-300 hover:before:w-full">Komentar</Link></li>
        <li><Link to="/kategori" className="relative hover:text-blue-200 transition duration-300 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 before:transition-all before:duration-300 hover:before:w-full">Kategori</Link></li>
        <li><Link to="/penulis" className="relative hover:text-blue-200 transition duration-300 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 before:transition-all before:duration-300 hover:before:w-full">Penulis</Link></li>
      </ul>
    </nav>
    
  );
};

export default Navbar;