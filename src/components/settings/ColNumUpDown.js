import { useState, useEffect } from "react";
import { Input } from "reactstrap";

const ColNumUpDown = (props) => {
    const {
        finishChange = (v) => { },
        numInput,
        title
    } = props;

    const [numValue, setNumValue] = useState(0);
    const [restrictUpdate, setRestrictUpdate] = useState(false);


    const handleChange = (e) => {
        const eValue = parseInt(e.target.value) || 1
        //Limit updates to DOM: Updating too often causes error in react
        if (!restrictUpdate) {
            finishChange(eValue);
            // setNumValue(eValue);
            setRestrictUpdate(true);
            setTimeout(() => setRestrictUpdate(false), 10);
        }
    }
    useEffect(() => {
        setNumValue(numInput);
    }, [numInput]);

    return (
        <>
            {/* {title}<br /> */}
            {title}<br />
            <Input
                name='columnWidthEditor'
                style={{ width: '7vw' }}
                type='number'
                min='1'
                max='12'
                step='1'
                value={numValue || 1}
                // onMouseUp={() => setNumValue(parseInt(numInput))}
                onChange={handleChange}
            // onKeyUp={() => setNumValue(parseInt(numInput))}
            />
        </>
    )
};

export default ColNumUpDown