import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectBox = (props) => {
    const {
        isSelected,
        onClick = () => { },
        btnText,
        textInFront,
        selectedStyle,
        unselectedStyle,
    } = props;
    return (
        <Button
            onClick={onClick}
            style={
                isSelected
                    ? { ...styles.defaultStyle, ...selectedStyle }
                    : { ...styles.defaultStyle, ...unselectedStyle }
            }
        >
            {isSelected
                ? textInFront
                    ? <>{btnText} <FontAwesomeIcon icon="fa-regular fa-square-check" /></>
                    : <><FontAwesomeIcon icon="fa-regular fa-square-check" /> {btnText}</>
                : textInFront
                    ? <>{btnText} <FontAwesomeIcon icon="fa-regular fa-square" /></>
                    : <><FontAwesomeIcon icon="fa-regular fa-square" /> {btnText}</>
            }
        </Button>

    )
}

const styles = {
    defaultStyle: {
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
}
export default SelectBox;