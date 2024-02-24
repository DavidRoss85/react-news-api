import {
    FormGroup,
    Label,
    Button
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = (props) => {

    //Make sure to pass these props
    const { clickCancel, handleSubmit } = props;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={handleSubmit}
            validate={validateUserLoginForm}
        >
            <Form >
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Field
                        id='username'
                        name='username'
                        placeholder='Username'
                        className='form-control'
                        autoComplete='on'
                    />
                    <ErrorMessage name='username'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <div className="form-control p-0" style={{ display: 'flex', justifyContent: 'end' }}>
                        <Field
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='form-control'
                            style={{ border: 'none' }}
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? ['far', 'fa-eye'] : ['far', 'fa-eye-slash']}
                            className='p-2'
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute' }}
                        />
                    </div>
                    <ErrorMessage name='password'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <Button type='submit' color='primary'>Login</Button>
                {' '}
                <Button onClick={clickCancel} >Cancel</Button>
            </Form>
        </Formik>
    )
}

export default LoginForm;