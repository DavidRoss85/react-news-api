import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "../misc/LoginForm";
import { Loading, Failed } from "../misc/ComponentStatuses";


const LoginModal = (props) => {

    //Make sure to pass these props
    const { loginModalOpen, setLoginModalOpen, handleLogin, success, isLoading } = props;
    const [tryingToLogIn, setTryingToLogIn] = useState(false);

    let renderItem = <LoginForm clickCancel={() => setLoginModalOpen(false)} handleSubmit={handleLogin} />
    console.log('isLoading', isLoading)

    useEffect(() => {
        console.log('Activated')
        if (isLoading) {
            setTryingToLogIn(true);
            renderItem = <Loading message='Logging in...' />
        }
        if (!isLoading && !success && tryingToLogIn) {
            renderItem = <Failed message='Failed to log in' buttonText='OK' reset={() => setTryingToLogIn(false)} />
        }
    }, [isLoading, success, tryingToLogIn])




    return (
        <Modal isOpen={loginModalOpen}>
            <ModalHeader toggle={() => setLoginModalOpen(false)}>
                Login
            </ModalHeader>
            <ModalBody>
                {renderItem}
            </ModalBody>
        </Modal>

    )
}

export default LoginModal;