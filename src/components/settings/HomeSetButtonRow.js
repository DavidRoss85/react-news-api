import { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const HomeSetButtonRow = (props) => {

    const {
        backFunc = () => { },
        addFunc = () => { },
        deleteFunc = () => { },
        saveFunc = () => { },
    } = props;

    return (
        <Row>
            <Col style={{ padding: '8px', textAlign: 'start' }}>
                <Button
                    {...styles.backButton}
                    onClick={backFunc}
                >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back to Settings
                </Button>
                <Button
                    {...styles.addButton}
                    onClick={addFunc}
                >
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Row
                </Button>
                <Button
                    {...styles.deleteButton}
                    onClick={deleteFunc}
                >
                    <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected Rows
                </Button>
                <Button
                    {...styles.saveButton}
                    onClick={saveFunc}
                >
                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Save Settings
                </Button>
            </Col>
        </Row>

    )
};

const styles = {
    addButton: {
        color: 'primary',
        style: {
            marginLeft: '3px',
            marginRight: '3px'
        }
    },
    deleteButton: {
        color: 'danger',
        style: {
            marginLeft: '3px',
            marginRight: '3px'
        }
    },
    saveButton: {
        color: 'success',
        style: {
            marginLeft: '3px',
            marginRight: '3px'
        }
    },
}
export default HomeSetButtonRow;