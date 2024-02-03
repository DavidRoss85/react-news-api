import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import LoginModal from "./LoginModal";

const UserLoginMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const toggleMenu = (event) => {
        event.stopPropagation()
        setDropdownOpen((prevState) => !prevState)
    };
    const handleLogin =(values) =>{
        const currentUser = {
            username: values.username,
            password: values.password
        }
        setLoginModalOpen(false);
    };


    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggleMenu} direction={'down'}>
                <DropdownToggle caret style={{ ...menuStyle, border: '1px solid white' }}>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                </DropdownToggle>
                <DropdownMenu style={menuStyle} end>
                    <DropdownItem header style={menuStyle}>
                        User
                    </DropdownItem>
                    <DropdownItem style={{ color: '#aaa' }} onClick={() => setLoginModalOpen(true)}>
                        Sign in
                    </DropdownItem>
                    <DropdownItem style={{color: '#333'}} disabled>
                        Create Account
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <LoginModal 
                loginModalOpen={loginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
                handleLogin={handleLogin} 
            />
        </>
    )
}

const menuStyle = {
    color: 'white',
    background: 'black',

}

export default UserLoginMenu;