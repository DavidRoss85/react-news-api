import {
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { Loading, Failed } from "../misc/ComponentStatuses";


const LoginModal = (props) => {

    //Make sure to pass these props
    const { loginModalOpen, setLoginModalOpen, handleLogin, success, isLoading, loadText, failText, loggedIn } = props;
    const [loadingMessage, setLoadingMessage] = useState('Logging in...');
    const [failedMessage, setFailedMessage] = useState('Failed to log in');
    const [tryingToLogIn, setTryingToLogIn] = useState(false);

    const [renderItem, setRenderItem] = useState(<></>)

    useEffect(() => {
        setFailedMessage(failText);
        setLoadingMessage(loadText);
        console.log('Login modal text changed')
    }, [loadText, failText]);

    //Determine the items to show in the Modal window
    useEffect(() => {
        if (isLoading) {
            setTryingToLogIn(true);
            setRenderItem(
                <Loading message={loadingMessage} />
            )
        } else if (!isLoading && !success && tryingToLogIn) {
            setRenderItem(
                <Failed
                    message={failedMessage}
                    buttonText='OK'
                    reset={
                        () => {
                            setTryingToLogIn(false);
                            setLoginModalOpen(!loggedIn)
                        }
                    }
                />
            )
        } else if (success) {
            setTryingToLogIn(false)
        } else {
            setRenderItem(
                <LoginForm
                    clickCancel={() => setLoginModalOpen(false)}
                    handleSubmit={handleLogin}
                />
            )
        }
    }, [isLoading, success, tryingToLogIn,loadingMessage,failedMessage])

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