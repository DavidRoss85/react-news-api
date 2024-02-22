import { Row,Col,Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeSetButtonRow = (props) => {

    const { buttonStyle, addFunc = () => { }, deleteFunc = () => { }, saveFunc = () => { } } = props;

    return (
        <Row>
            <Col style={{ padding: '8px', textAlign: 'start' }}>
                <Button style={buttonStyle} onClick={addFunc}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Row</Button>
                <Button style={buttonStyle} onClick={deleteFunc}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected Rows</Button>
                <Button
                    style={buttonStyle}
                    onClick={saveFunc}
                >
                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Save Settings
                </Button>
            </Col>
        </Row>

    )
};

export default HomeSetButtonRow