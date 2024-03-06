import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const HomeSetButtonRow = (props) => {

    const {
        backFunc = () => { },
        addFunc = () => { },
        deleteFunc = () => { },
        saveFunc = () => { },
    } = props;

    const [springs, api] = useSpring(() => ({ from: { opacity: 0 } }));
    const [animating, setAnimating] = useState();
    const saveState = useSelector(state => state.user.saveState);
    const [statusText, setStatusText] = useState('...');
    const [statusColor, setStatusColor] = useState('red');
    const dispatch = useDispatch();

    useEffect(() => {
        if (saveState.isSaving) {
            setStatusText('saving...');
            setStatusColor('orange');
            showNotification();
        } else if (saveState.success) {
            setStatusText('Save Successful!');
            setStatusColor('green')
            fadeNotification();
        } else if (!saveState.isSaved) {
            showNotification();
            setStatusText(saveState.status || 'Changes not saved...');
            setStatusColor('red');
        }
    }, [saveState])
    const showNotification = () => {
        api.start({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
        })

    };
    const fadeNotification = () => {
        setTimeout(() => {
            api.start({
                from: {
                    opacity: springs.opacity.get(),
                },
                to: {
                    opacity: 0,
                },
            })
        }
            , 1000)
    }

    const SaveButton = () => {
        if (saveState.isSaving) {
            return (
                <Button
                    {...styles.saveButton}
                >
                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /> Saving...
                </Button>
            )
        }

        return (
            <Button
                {...styles.saveButton}
                onClick={saveFunc}
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

                <SaveButton />

                <animated.span
                    className={'text-nowrap'}
                    style={{
                        paddingLeft: '5px',
                        color: statusColor,
                        fontWeight: 'bolder',
                        ...springs
                    }}
                >
                    {statusText}
                </animated.span>
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