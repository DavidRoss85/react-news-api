import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SignUpButtonRow = (props) => {

    const {
        backFunc = () => { },
        handleSubmit = () => { },
        message = '',
        isLoading = false,
        success = false,
        result = ''
    } = props;

    const [messageFormat, setMessageFormat] = useState('text-danger');

    useEffect(() => {
        if (result === 'success') {
            setMessageFormat('text-success');
        } else {
            setMessageFormat('text-danger')
        }
    }, [result]);

    return (
        <>
            <Row>
                <Col style={{ padding: '8px', textAlign: 'start' }}>
                    <Button
                        {...styles.backButton}
                        onClick={backFunc}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back to Menu
                    </Button>


                </Col>
            </Row>
            <Row>
                <Col className='pb-3'>
                    <span className={messageFormat}>
                        {message} <br/>
                        {(result === 'success' ?
                            ('Please log in to customize your account')
                            :
                            '')
                        }
                    </span>
                </Col>
            </Row>
        </>

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