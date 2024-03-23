import {
    FormGroup,
    Label,
    Button,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateUserAccountForm } from "../../utils/validateFormData";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { clearQueryUsername, queryUsername } from "../../app/selectors/userSlice";

const SignUpForm = (props) => {

    //Make sure to pass these props
    const { clickCancel, handleSubmit } = props;

    const userExistsStatus = useSelector(state => state.user.userExists);
    const { isUpdated, success, available } = userExistsStatus
    const signUpStatus = useSelector(state=>state.user.signUp);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showUserCheck, setShowUserCheck] = useState(false);
    const [showUserX, setShowUserX] = useState(false);


    const dispatch = useDispatch();
    const checkUserNameAvailability = (nameValue) => {
        if (nameValue) {
            dispatch(queryUsername(nameValue));
        }
    };

    useEffect(()=>{
        setIsLoading(signUpStatus.isLoading);
    },[signUpStatus.isLoading]);

    useEffect(() => {
        if (isUpdated) {
            setShowUserCheck(available);
            setShowUserX(!available);
        } else {
            setShowUserCheck(false);
            setShowUserX(false);
        }
    }, [isUpdated, success, available]);

    return (
        <Formik
            initialValues={{
                username: '',
                displayname: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            onSubmit={handleSubmit}
            validate={validateUserAccountForm}
        >
            {props =>
                <Form >
                    {/*Username*/}
                    <FormGroup>
                        <Label htmlFor='username'>Username </Label>
                        <div className="form-control p-0" style={{ display: 'flex', justifyContent: 'end' }}>
                            <Field
                                id='username'
                                name='username'
                                placeholder='Username'
                                className='form-control'
                                onBlur={(e) => { props.handleBlur(e); checkUserNameAvailability(e.target.value) }}
                                onChange={(e) => { props.handleChange(e); dispatch(clearQueryUsername()) }}
                                autoComplete='off'
                                disabled={isLoading}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-x"
                                className='p-2'
                                hidden={!showUserX}
                                style={{ position: 'absolute', color: 'red' }}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-check"
                                className='p-2'
                                hidden={!showUserCheck}
                                style={{ position: 'absolute', color: 'green' }}
                            />
                            {/* <Button className='mx-2'>
                        Check Availability
                    </Button> */}
                        </div>
                        <ErrorMessage name='username'>
                            {(msg) => {
                                if (!msg && showUserX) {
                                    return <p className='text-danger'>{'Username unavailable'}</p>
                                };
                                return <p className='text-danger'>{msg}</p>
                            }}
                        </ErrorMessage>
                    </FormGroup>
                    {/*Display Name*/}
                    <FormGroup>
                        <Label htmlFor='displayname'>Display Name</Label>
                        <Field
                            id='displayname'
                            name='displayname'
                            placeholder='Welcome'
                            className='form-control'
                            autoComplete='off'
                            disabled={isLoading}
                        />
                        <ErrorMessage name='displayname'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    {/*Email*/}
                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Field
                            id='email'
                            name='email'
                            placeholder='1234@email.com'
                            className='form-control'
                            disabled={isLoading}
                        />
                        <ErrorMessage name='email'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    {/*Password*/}
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
                                autoComplete='new-password'
                                disabled={isLoading}
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
                    {/*Confirm Password*/}
                    <FormGroup>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <div className="form-control p-0" style={{ display: 'flex', justifyContent: 'end' }}>
                            <Field
                                id='confirmPassword'
                                name='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='form-control'
                                style={{ border: 'none' }}
                                autoComplete='new-password'
                                disabled={isLoading}
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? ['far', 'fa-eye'] : ['far', 'fa-eye-slash']}
                                className='p-2'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute' }}
                            />
                        </div>
                        <ErrorMessage name='confirmPassword'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <Button type='submit' color='primary' disabled={isLoading}>Create Account</Button>
                    {' '}
                    <Button onClick={clickCancel} disabled={isLoading} >Cancel</Button>
                </Form>
            }
        </Formik>
    )
}

export default SignUpForm;