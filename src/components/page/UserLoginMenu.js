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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { fetchUserData, attemptLogin, logOutUser } from "../../app/selectors/userSlice";
import { loadUserPreferences } from "../../app/selectors/settingsSlice";
import LoginModal from "./LoginModal";

const UserLoginMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const currentUserName = useSelector((state) => state.user.data.username);
    const userInfo = useSelector((state)=>state.user);
    const userState = useSelector((state) => state.user.userState);
    const {loggedIn, userLoading, success} = userState;
    const dispatch = useDispatch()


    const toggleMenu = (event) => {
        event.stopPropagation()
        setDropdownOpen((prevState) => !prevState)
    };
    const handleLogin = (values) => {
        const currentUser = {
            username: values.username,
            password: values.password
        }
        dispatch(attemptLogin(currentUser))
        //setLoginModalOpen(false);
    };

    //reset settings
    const signOut = () => {
        dispatch(logOutUser());
    }

    useEffect(() => {
        if (loggedIn) {
            setLoginModalOpen(false)
        }
        dispatch(loadUserPreferences(userInfo));
    }, [loggedIn])


    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggleMenu} direction={'down'}>
                <DropdownToggle caret style={{ ...menuStyle, border: '1px solid white' }}>
                    {loggedIn ?
                        <>
                            {currentUserName} {' '}
                            <FontAwesomeIcon icon="fa-solid fa-user" />
                        </>
                        :
                        <FontAwesomeIcon icon="fa-regular fa-user" />
                    }
                </DropdownToggle>
                <DropdownMenu style={menuStyle} end>
                    <DropdownItem header style={menuStyle}>
                        User
                    </DropdownItem>
                    {loggedIn ? (
                        <DropdownItem style={{ color: '#aaa' }} onClick={signOut}>
                            Sign out
                        </DropdownItem>
                    ) : (
                        <>
                            <DropdownItem style={{ color: '#aaa' }} onClick={() => setLoginModalOpen(true)}>
                                Sign in
                            </DropdownItem>
                            <DropdownItem style={{ color: '#333' }} disabled>
                                Create Account
                            </DropdownItem>
                        </>
                    )}
                </DropdownMenu>
            </Dropdown>

            <LoginModal
                success = {success}
                isLoading={userLoading}
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