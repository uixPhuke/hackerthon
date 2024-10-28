
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 bg-opacity-75 p-4 fixed top-0 w-full shadow-lg transition-transform duration-300 transform hover:scale-105">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white transition hover:opacity-80">
                    SmartServe
                </Link>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <Link to="/user/profile" className="text-white text-lg hover:underline hover:opacity-80">
                        Dashboard
                    </Link>
                    <Link to="/map-view" className="text-white text-lg hover:underline hover:opacity-80">
                        Map View
                    </Link>
                    <Link to="/payment" className="text-white text-lg hover:underline hover:opacity-80">
                        Payment
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
