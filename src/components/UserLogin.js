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

const UserLogin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const toggleMenu = () => setDropdownOpen((prevState) => !prevState);
    const handleLogin =() =>{
        setLoginModalOpen(false)
    }


    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggleMenu} direction={'down'}>
                <DropdownToggle caret style={{ ...menuStyle, border: '1px solid white' }}><i className="fa fa-user" /></DropdownToggle>
                <DropdownMenu style={menuStyle} end>
                    <DropdownItem header style={menuStyle}>
                        User
                    </DropdownItem>
                    <DropdownItem style={{ color: 'white' }} onClick={() => setLoginModalOpen(true)}>
                        Login
                    </DropdownItem>
                    <DropdownItem style={{}} disabled>
                        Create Account
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>


            <Modal isOpen={loginModalOpen}>
                <ModalHeader toggle={() => setLoginModalOpen(false)}>
                    Login
                </ModalHeader>
                <ModalBody>
                    <Formik onSubmit={handleLogin}>
                        <Form>
                            <FormGroup>
                                Username
                            </FormGroup>
                            <FormGroup>
                                Password
                            </FormGroup>
                            <Button type='submit' color='primary'>Login</Button>
                            {' '}
                            <Button onClick={()=>setLoginModalOpen(false)} >Cancel</Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    )
}

const menuStyle = {
    color: 'white',
    background: 'black',

}

export default UserLogin