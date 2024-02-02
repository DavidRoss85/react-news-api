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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LoginModal = (props) =>{

    const {loginModalOpen, setLoginModalOpen,handleLogin} = props;
    
    return (
        <Modal isOpen={loginModalOpen}>
            <ModalHeader toggle={() => setLoginModalOpen(false)}>
                Login
            </ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }} 
                    onSubmit={handleLogin} 
                    validate={validateUserLoginForm}
                >
                    <Form>
                        <FormGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Field 
                                id='username'
                                name='username'
                                placeholder='Username'
                                className='form-control'
                            />
                            <ErrorMessage name='username'>
                                {(msg)=> <p className='text-danger'>{msg}</p>}
                            </ErrorMessage>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Field
                                id='password'
                                name='password'
                                placeholder='Password'
                                className='form-control'
                            />
                            <ErrorMessage name='password'>
                                {(msg)=> <p className='text-danger'>{msg}</p>}
                            </ErrorMessage>
                        </FormGroup>
                        <Button type='submit' color='primary'>Login</Button>
                        {' '}
                        <Button onClick={()=>setLoginModalOpen(false)} >Cancel</Button>
                    </Form>
                </Formik>
            </ModalBody>
        </Modal>

    )
}

export default LoginModal;