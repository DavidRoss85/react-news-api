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
    const [showPassword, setShowPassword] = useState(false)

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
                            <div className="form-control p-0" style={{display:'flex', justifyContent:'end'}}>
                                <Field
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text':'password'}
                                    placeholder='Password'
                                    className='form-control'
                                    style={{border:'none'}}
                                />
                                <FontAwesomeIcon 
                                    icon={showPassword ? ['far','fa-eye'] : ['far','fa-eye-slash']} 
                                    className='p-2'
                                    onClick={()=>setShowPassword(!showPassword)}
                                    style={{position:'absolute'}}
                                />
                            </div>
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