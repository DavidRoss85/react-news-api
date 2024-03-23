import { Container, Row, Col, Button } from "reactstrap";
import SetHomeView from "../features/settings/SetHomeView"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCache } from "../app/selectors/cacheSlice";
import { getUserSession } from "../app/selectors/userSlice";
import { loadUserPreferences } from "../app/selectors/settingsSlice";

const SettingsPage = () => {

    const [currentWindow, setCurrentWindow] = useState('menu');
    const [renderMenu, setRenderMenu] = useState(<></>);
    const [renderWindow, setRenderWindow] = useState(<></>);
    const loggedIn = useSelector(state => state.user.userState.loggedIn);
    const userSettings = useSelector(state=>state.user)

    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getUserSession());
    //    dispatch(loadUserPreferences(userSettings));
    },[]);

    useEffect(() => {
        if (loggedIn) {
            setRenderMenu(
                <>
                    <Row>
                        <Col>
                            <h3>User Settings</h3>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={() => { setCurrentWindow('homeSettings') }}
                                color='warning'
                            >
                                Edit Home Screen Settings
                            </Button>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                color='warning'
                                disabled
                            >
                                Account (Coming soon...)
                            </Button>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={clearCache}
                                color='warning'
                            >
                                Clear Cache
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
                            Please log in to access settings Menu
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Button
                                onClick={clearCache}
                                color='warning'
                            >
                                Clear Cache
                            </Button>
                        </Col>
                    </Row>

                </>
            )
        }
    }, [loggedIn]);

    useEffect(() => {
        if (currentWindow === 'homeSettings') {
            setRenderWindow(
                <SetHomeView
                    backFunc={returnToSettingsScreen}
                />
            );
        } else {
            setRenderWindow(<></>)
        };
    }, [currentWindow]);

    const returnToSettingsScreen = () => {
        setCurrentWindow('menu');
    };

    const clearCache = () => {
        dispatch(emptyCache());
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
}

export default SettingsPage;