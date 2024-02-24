import { Container, Row, Col, Button } from "reactstrap";
import HomeViewSet from "../components/settings/HomeViewSet";
import { useState } from "react";

const SettingsPage = () => {

    const [showHomeSettings, setShowHomeSettings]=useState(false)

    const returnToSettingsScreen=()=>{
        setShowHomeSettings(false);
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
                            <Button 
                                onClick={()=>{setShowHomeSettings(true)}}
                                color='warning'
                            >
                                Edit Home Screen Settings
                            </Button>
                        </>
                    
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SettingsPage;