import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, Row,Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import RegionFilter from "./RegionFilter"
import SiteLogo from "./SiteLogo";
import { useDispatch } from "react-redux";

const Navmenu = ({ homeClick = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setMenuOpen(false);
    }, [homeClick]);

    function localTest(){
        alert('Test your functions here!')
    }
    

    return (
        <Navbar dark sticky="top" expand="md" className="navbar-light bg-black text-end" >
            <NavbarBrand className="logo" href="/">
                <SiteLogo />
            </NavbarBrand>

            <RegionFilter />

            <NavbarToggler onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }} />

            <Collapse isOpen={menuOpen} navbar className="justify-content-start">

                <Nav navbar id="mainMenu">
                    <NavItem>
                        <NavLink className="nav-link" to="/">
                            <span>Home</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="#topStories">
                            <span>Top Stories</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="#worldNews">
                            <span>World News</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="#about">
                            <span>About</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <a className="nav-link" href="#searchBox">
                            <span><i className="fa fa-search"></i> Search</span>
                        </a>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="#about" onClick={()=>localTest()}>
                            <button className="btn btn-warning">TEST BUTTON</button>
                        </NavLink>
                    </NavItem>

                    {/* <NavItem className="d-inline-block d-md-none">
                        <a className="nav-link" href="#searchBox">
                            <span>TEST</span>
                        </a>
                    </NavItem> */}
                </Nav>
 
            </Collapse>
            {/* <NavItem className="d-none d-md-inline-block">
                <a className="nav-link" href="#searchBox">
                    <span>TEST</span>
                </a>
            </NavItem> */}
        </Navbar>
    )
}

export default Navmenu;