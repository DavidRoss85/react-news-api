import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSession, resetSignUpVariables } from "../app/selectors/userSlice";
import SignUpView from "../features/signup/SignUpView";

const SignUpPage = () => {

    const [currentWindow, setCurrentWindow] = useState('menu');
    const [renderMenu, setRenderMenu] = useState(<></>);
    const [renderWindow, setRenderWindow] = useState(<></>);
    const loggedIn = useSelector(state => state.user.userState.loggedIn);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserSession());
    }, []);

    useEffect(() => {
        console.log('SignUp page Logged in?', loggedIn)
        if (!loggedIn) {
            setRenderMenu(
                <>
                    <Row>
                        <Col>
                            <h3>Create an account here</h3>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={() => {
                                     setCurrentWindow('signUp');
                                     dispatch(resetSignUpVariables());
                                }}
                                color='warning'
                            >
                                Create Account
                            </Button>
                        </Col>
                    </Row>
                </>

            )
        } else {
            setRenderMenu(
                <>
                    <Row>
                        <Col>
                            You are already signed in.
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Please log out to create a new account.
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={() => {navigate('/') }}
                                color='warning'
                            >
                                Home
                            </Button>
                        </Col>
                    </Row>

                </>
            )
        }
    }, [loggedIn]);

    useEffect(() => {
        if (currentWindow === 'signUp') {
            if(!loggedIn){
                setRenderWindow(
                    <SignUpView
                        backFunc={returnToMenuScreen}
                    />
                );
            }else{
                setCurrentWindow('menu');
                navigate('/');
            }
        } else {
            setRenderWindow(<></>)
        };
    }, [currentWindow, loggedIn]);

    const returnToMenuScreen = () => {
        setCurrentWindow('menu');
    };

    return (
        <Container fluid>
            <Row className='justify-content-center text-center m-1'>
                <Col>
                    {currentWindow === 'menu' ?
                        renderMenu
                        :
                        renderWindow
                    }
                </Col>
            </Row>
        </Container>
    )
};

export default SignUpPage;