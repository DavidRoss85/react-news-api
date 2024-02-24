import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import RegionFilter from "../misc/RegionFilter"
import SiteLogo from "./SiteLogo";
import UserLoginMenu from "./UserLoginMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Navmenu = ({ homeClick = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        setMenuOpen(false);
    }, [homeClick]);

    // const testThis=()=>{
        //For testing
    // }
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
                    <NavItem>
                        <a className="nav-link" href="#searchBox">
                            <span><FontAwesomeIcon icon="fa fa-search"/> Search</span>
                        </a>
                    </NavItem>
                </Nav>

                <Nav className="ms-auto">
                    {/* <NavItem>
                        <Button onClick={()=>{testThis()}}>Test</Button>
                    </NavItem> */}

                    <NavItem className="ms-auto">
                        <UserLoginMenu />
                    </NavItem>
                </Nav>
 
            </Collapse>
        </Navbar>
    )
}

export default Navmenu;