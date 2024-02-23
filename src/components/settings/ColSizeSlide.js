import { useState, useEffect } from "react";
import { Input } from "reactstrap";

const ColSizeSlide = (props) => {
    const {
        finishChange = (v) => { },
        slideInput,
        forceUpdate,
        title
    } = props;

    const [slideValue, setSlideValue] = useState(0);
    const [restrictUpdate, setRestrictUpdate] = useState(false);

    const handleChange = (e) => {
        const eValue = parseInt(e.target.value) || 1
        if (!restrictUpdate) {
            finishChange(eValue);
            setSlideValue(eValue);
            setRestrictUpdate(true);
            setTimeout(() => setRestrictUpdate(false), 10);
        }
    }
    useEffect(() => {
        if (!slideValue && slideInput) {
            setSlideValue(slideInput)
        }
    }, [slideInput]);

    return (
        <>
            {/* {title}<br /> */}
            {title} {slideValue} <br />
            <Input
                name='columnWidthEditor'
                style={{ width: '100px' }}
                type='range'
                min='1'
                max='12'
                step='1'
                value={slideValue}
                onMouseUp={() => setSlideValue(parseInt(slideInput))}
                onChange={handleChange}
                onKeyUp={() => setSlideValue(parseInt(slideInput))}
            />
        </>
    )
};

export default ColSizeSlide