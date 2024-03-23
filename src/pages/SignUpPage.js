import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession } from "../app/selectors/userSlice";
import SignUpView from "../features/signup/SignUpView";

const SignUpPage =()=>{

    const [currentWindow, setCurrentWindow] = useState('menu');
    const [renderMenu, setRenderMenu] = useState(<></>);
    const [renderWindow, setRenderWindow] = useState(<></>);
    const loggedIn = useSelector(state => state.user.userState.loggedIn);

    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getUserSession());
    },[]);

    useEffect(() => {
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
                                onClick={() => { setCurrentWindow('signUp') }}
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
                        <Col>
                            Please log out to create a new account.
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={()=>{}}
                                color='warning'
                            >
                                Should I put a sign out button here?
                            </Button>
                        </Col>
                    </Row>

                </>
            )
        }
    }, [loggedIn]);

    useEffect(() => {
        if (currentWindow === 'signUp') {
            setRenderWindow(
                <SignUpView
                    backFunc={returnToMenuScreen}
                />
            );
        } else {
            setRenderWindow(<></>)
        };
    }, [currentWindow]);

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