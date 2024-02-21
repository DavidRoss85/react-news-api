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

    const handleChange = (e) => {
        finishChange(e.target.value);
        setSlideValue(e.target.value);
    }
    useEffect(() => {
        if (!slideValue && slideInput) {
            setSlideValue(slideInput)
        }
    }, [slideInput]);

    return (
        <>
            {/* {title}<br /> */}
            {title} {slideValue} <br/>
            <Input
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