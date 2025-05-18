import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex gap-4">
        <li><Link to="/artikels">Artikel</Link></li>
        <li><Link to="/komentars">Komentar</Link></li>
        <li><Link to="/kategoris">Kategori</Link></li>
        <li><Link to="/penulis">Penulis</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
