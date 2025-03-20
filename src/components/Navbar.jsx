import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">Tasks System For Your Company</Link>
      <section>
        <Link className="px-4 font-bold" to="/">HOME</Link>
        <Link className="px-4 font-bold" to="/add-task">ADD TASK</Link>
      </section>
    </nav>
  );
};

export default Navbar;
