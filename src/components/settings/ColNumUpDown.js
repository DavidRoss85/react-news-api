import { useState, useEffect } from "react";
import { Input } from "reactstrap";

const ColNumUpDown = (props) => {
    const {
        finishChange = (v) => { },
        numInput,
        forceUpdate,
        title
    } = props;

    const [numValue, setNumValue] = useState(0);
    const [restrictUpdate, setRestrictUpdate] = useState(false);


    const handleChange = (e) => {
        const eValue = parseInt(e.target.value) || 1
        if (!restrictUpdate) {
            finishChange(eValue);
            setNumValue(eValue);
            setRestrictUpdate(true);
            setTimeout(() => setRestrictUpdate(false), 10);
        }
    }
    useEffect(() => {
        if (!numValue && numInput) {
            setNumValue(numInput)
        }
    }, [numInput]);

    return (
        <>
            {/* {title}<br /> */}
            {title}<br />
            <Input
                name='columnWidthEditor'
                style={{ width: '100px' }}
                type='number'
                min='1'
                max='12'
                step='1'
                value={numValue}
                onMouseUp={() => setNumValue(parseInt(numInput))}
                onChange={handleChange}
                onKeyUp={() => setNumValue(parseInt(numInput))}
            />
        </>
    )
};

export default ColNumUpDown