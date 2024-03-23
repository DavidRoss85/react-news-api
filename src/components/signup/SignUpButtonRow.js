import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SignUpButtonRow = (props) => {

    const {
        backFunc = () => { },
        handleSubmit = () => { },
        message = ''
    } = props;


    const SignUpButton = () => {
        // if (saveState.isSaving) {
        //     return (
        //         <Button
        //             {...styles.saveButton}
        //         >
        //             <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Saving...
        //         </Button>
        //     )
        // }

        return (
            <Button
                {...styles.signUpButton}
                onClick={handleSubmit}
            >
                <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Save Settings
            </Button>
        )
    }

    return (
        <Row>
            <Col style={{ padding: '8px', textAlign: 'start' }}>
                <Button
                    {...styles.backButton}
                    onClick={backFunc}
                >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back to Menu
                </Button>

                <span className='text-danger'>{message}</span>

            </Col>
        </Row>
    )

};

const styles = {
    signUpButton: {
        color: 'primary',
        style: {
            marginLeft: '3px',
            marginRight: '3px',
        },
    },
    backButton: {
        color: 'secondary',
        style: {
            marginLeft: '3px',
            marginRight: '3px',
        },
    },
};

export default SignUpButtonRow;