import { Container, Row, Col, Button } from "reactstrap";
import HomeViewSet from "../features/settings/HomeViewSet"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emptyCache } from "../app/selectors/cacheSlice";

const SettingsPage = () => {

    const [showHomeSettings, setShowHomeSettings]=useState(false)
    const dispatch=useDispatch();

    const returnToSettingsScreen=()=>{
        setShowHomeSettings(false);
    }

    const clearCache=()=>{
        dispatch(emptyCache());
    }
    return (
        <Container fluid>
            <Row className='justify-content-center text-center m-1'>
                <Col >
                    {showHomeSettings ?
                        <HomeViewSet 
                            backFunc={returnToSettingsScreen}
                        />
                    :
                        <>
                            <Row>
                                <Col>
                                    <h3>User Settings</h3>
                                </Col>
                            </Row>
                            <Row className="m-3">
                                <Col>
                                    <Button 
                                        onClick={()=>{setShowHomeSettings(true)}}
                                        color='warning'
                                    >
                                        Edit Home Screen Settings
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
                            <Row className="m-3">
                                <Col>
                                    <Button 
                                        color= 'warning'
                                        disabled
                                    >
                                        Account (Coming soon...)
                                    </Button> 
                                </Col>
                            </Row>
                        </>
                    
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SettingsPage;