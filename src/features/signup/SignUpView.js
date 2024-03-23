import { Row, Col, Button } from "reactstrap";
import SignUpButtonRow from "../../components/signup/SignUpButtonRow";
import SignUpForm from "../../components/signup/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { postSignup, resetSignUpVariables } from "../../app/selectors/userSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SignUpView = ({ backFunc }) => {

    const signUpState = useSelector(state => state.user.signUp);
    // const { isLoading,success,message} = signUpState;
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');

    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        const { username, displayname, email, password } = values;
        const newUser = {
            username,
            displayname,
            email,
            password,
        };
        dispatch(postSignup(newUser));
    }

    useEffect(() => {
        setIsLoading(signUpState.isLoading);
        setSuccess(signUpState.success);
        setMessage(signUpState.message);
        setResult(signUpState.result);
    }, [signUpState]);


    return (
        <>
            <SignUpButtonRow
                backFunc={backFunc}
                message={message}
                isLoading={isLoading}
                success={success}
                result={result}
            />
            <Row className='justify-content-center'>
                {(success === true && result === 'success') ?
                    <Col lg='6' xl='4'>
                        <Row>
                            <Col>
                                Use the dropdown in the top left to sign in...
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    {...styles.thumbsUpButton}
                                    onClick={backFunc}
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    :
                    <Col lg='6' xl='4'>
                        <SignUpForm
                            clickCancel={backFunc}
                            handleSubmit={handleSubmit}
                        />
                    </Col>
                }
            </Row>
            <SignUpButtonRow
                backFunc={backFunc}
            />
        </>
    )
};

const styles = {
    thumbsUpButton: {
        color: 'success',
        style: {
            marginLeft: '3px',
            marginRight: '3px',
        },
    },
}
export default SignUpView;