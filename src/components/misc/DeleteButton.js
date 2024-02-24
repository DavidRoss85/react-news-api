import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = (props) => {
    const { 
        onClick = () => { }, 
        btnText, 
        textInFront = false,
        style 
    } = props
    return (
        <Button
            onClick={onClick}
            {...style}
            className='text-truncate'
        >
            {textInFront
                ? <>{btnText} <FontAwesomeIcon icon="fa-solid fa-trash" /></>
                : <><FontAwesomeIcon icon="fa-solid fa-trash" /> {btnText}</>
            }
        </Button>
    )
}


export default DeleteButton;