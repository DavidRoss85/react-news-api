import { Container, Row, Col } from "reactstrap";
import HomeViewSet from "../components/settings/HomeViewSet";

const SettingsPage = () => {

    return (
        <Container fluid>
            <Row className='justify-content-center text-center m-1'>
                <Col >
                    <HomeViewSet />
                </Col>
            </Row>
        </Container>
    )
}

export default SettingsPage;