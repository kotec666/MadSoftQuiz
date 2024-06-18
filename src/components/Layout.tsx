import {PropsWithChildren} from "react";
import Navbar from "./Navbar.tsx";

interface ILayoutProps extends PropsWithChildren {
}

const Layout = (props: ILayoutProps) => {
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
}

export default Layout