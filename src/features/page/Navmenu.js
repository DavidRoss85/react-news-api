import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import RegionFilter from "../../components/misc/RegionFilter"
import SiteLogo from "../../components/page/SiteLogo";
import UserLoginMenu from "../../components/page/UserLoginMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Navmenu = ({ homeClick = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        setMenuOpen(false);
    }, [homeClick]);
    
    //For testing:
    // const testVar=useSelector(state=>state.cache)
    // const testThis=()=>{
    //     console.log(testVar)
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