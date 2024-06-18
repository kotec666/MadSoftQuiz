import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-white font-bold text-lg">
                    Главная
                </Link>
                {/*<Link to="/create-test" className="text-white font-bold text-lg bg-green-500 block px-[10px] py-[5px] rounded-[6px]">*/}
                {/*    Создать тест*/}
                {/*</Link>*/}
            </div>
        </nav>
    )
}

export default Navbar