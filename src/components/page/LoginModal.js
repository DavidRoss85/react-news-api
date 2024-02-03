import {
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import { useState, useEffect } from "react";
import LoginForm from "../misc/LoginForm";
import { Loading, Failed } from "../misc/ComponentStatuses";


const LoginModal = (props) => {

    //Make sure to pass these props
    const { loginModalOpen, setLoginModalOpen, handleLogin, success, isLoading } = props;
    const [tryingToLogIn, setTryingToLogIn] = useState(false);

    const [renderItem, setRenderItem] = useState(<></>)

    //Determine the items to show in the Modal window
    useEffect(() => {
        if (isLoading) {
            setTryingToLogIn(true);
            setRenderItem(
                <Loading message='Logging in...' />
            )
        } else if (!isLoading && !success && tryingToLogIn) {
            setRenderItem(
                <Failed 
                    message='Failed to log in' 
                    buttonText='OK' 
                    reset={() => setTryingToLogIn(false)} 
                />
            )
        }else if(success){
            setTryingToLogIn(false)
        } else {
            setRenderItem(
                <LoginForm 
                    clickCancel={() => setLoginModalOpen(false)} 
                    handleSubmit={handleLogin} 
                />
            )
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