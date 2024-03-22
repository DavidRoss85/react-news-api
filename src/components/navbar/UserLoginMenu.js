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
import { attemptLogin, fetchUserSettings, logOutUser } from "../../app/selectors/userSlice";
import { loadUserPreferences } from "../../app/selectors/settingsSlice";
import LoginModal from "./LoginModal";
import { INITIAL_PREF } from "../../app/shared/DEFAULTS";

const UserLoginMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Logging in...');
    const [failedMessage, setFailedMessage] = useState('Failed to log in');


    const currentUserName = useSelector(state => state.user.data.username);
    const userInfo = useSelector(state => state.user);
    const errMsg = useSelector(state=> state.user.dataState.errMsg)
    const userState = useSelector(state => state.user.userState);
    const userDataState = useSelector(state => state.user.dataState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loggedIn, userLoading, success: userSuccess } = userState;
    const { isLoading: dataLoading, success: dataSuccess, errMsg: dataErr } = userDataState;

    const toggleMenu = (event) => {
        event.stopPropagation();
        setDropdownOpen((prevState) => !prevState);
    };
    const handleLogin = (values) => {
        const currentUser = {
            username: values.username,
            password: values.password
        }
        dispatch(attemptLogin(currentUser));
    };

    //reset settings
    const signOut = () => {
        dispatch(logOutUser());
        navigate('/');
        dispatch(loadUserPreferences(INITIAL_PREF)); //Investigate this later
    }

    useEffect(() => {
        if (loggedIn) {
            if (dataLoading) {
                setLoadingMessage('Getting your preferences...');
            } else if (!dataLoading && dataSuccess) {
                setLoginModalOpen(false);
                dispatch(loadUserPreferences(userInfo));
            } else if (!dataLoading && !dataSuccess){
                setFailedMessage(errMsg);
            }
        } else {
            setLoadingMessage('Logging in...');
            setFailedMessage(errMsg);
        }
    }, [loggedIn, dataLoading, dataSuccess, dataErr, errMsg]);

    useEffect(() => {
        dataLoading || userLoading ? setIsLoading(true) : setIsLoading(false);
        dataSuccess && userSuccess ? setSuccess(true) : setSuccess(false);
    }, [dataLoading, userLoading, userSuccess, dataSuccess])


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
                            <DropdownItem style={{ color: '#aaa' }} onClick={() => { navigate(`/settings/`) }} >
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
                loadText={loadingMessage}
                failText={failedMessage}
                success={success}
                isLoading={isLoading}
                loggedIn={loggedIn}
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