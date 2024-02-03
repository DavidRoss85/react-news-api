import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import RegionFilter from "../misc/RegionFilter"
import SiteLogo from "./SiteLogo";
import { useDispatch, useSelector } from "react-redux";
import UserLoginMenu from "./UserLoginMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navmenu = ({ homeClick = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const peekInfo = useSelector((state)=>state.settings.data.current)
    const dispatch = useDispatch();
    useEffect(() => {
        setMenuOpen(false);
    }, [homeClick]);

    function localTest(){
        console.log('Settings:', peekInfo)
    }
    

    return (
        <Navbar dark sticky="top" expand="md" className="navbar-light bg-black text-end" >
            <NavbarBrand className="logo" href="/">
                <SiteLogo />
            </NavbarBrand>

            <RegionFilter />

            <NavbarToggler onClick={(event) => { event.stopPropagation(); setMenuOpen(!menuOpen) }} />

            <Collapse isOpen={menuOpen} navbar className="justify-content-start">

                <Nav navbar id="mainMenu">
                    <NavItem>
                        <NavLink className="nav-link" to="/">
                            <span>Home</span>
                        </NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink className="nav-link" to="#topStories">
                            <span>Top Stories</span>
                        </NavLink>
                    </NavItem> */}
                    {/* <NavItem>
                        <NavLink className="nav-link" to="#worldNews">
                            <span>World News</span>
                        </NavLink>
                    </NavItem> */}
                    {/* <NavItem>
                        <NavLink className="nav-link" to="#about">
                            <span>About</span>
                        </NavLink>
                    </NavItem> */}
                    <NavItem>
                        <a className="nav-link" href="#searchBox">
                            <span><FontAwesomeIcon icon="fa fa-search"/> Search</span>
                        </a>
                    </NavItem>

                </Nav>
                <Nav className="ms-auto">
                    {/* <NavItem>
                        <NavLink className="nav-link" to="#about" onClick={()=>localTest()}>
                            <button className="btn btn-warning">TEST BUTTON</button>
                        </NavLink>
                    </NavItem> */}
                    <NavItem className="">
                        <UserLoginMenu />
                    </NavItem>

                </Nav>
 
            </Collapse>
        </Navbar>
    )
}

export default Navmenu;