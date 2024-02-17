import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { attemptLogin, logOutUser } from "../../app/selectors/userSlice";
import { loadUserPreferences } from "../../app/selectors/settingsSlice";
import LoginModal from "./LoginModal";

const UserLoginMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const currentUserName = useSelector((state) => state.user.data.username);
    const userInfo = useSelector((state) => state.user);
    const userState = useSelector((state) => state.user.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loggedIn, userLoading, success } = userState;


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
                        <>
                            <DropdownItem style={{ color: '#333' }} onClick={() => { navigate(`/settings/`) }} >
                                <FontAwesomeIcon icon="fa-solid fa-gear" />{' '} Options
                            </DropdownItem>
                            <DropdownItem style={{ color: '#aaa' }} onClick={signOut}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />{' '} Sign out
                            </DropdownItem>

                        </>

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
                success={success}
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