// Start with array of window objects:
// wArray = [
// 	{ id: 0, width, type, ...rest },
// 	{ id: 1, width, type, ...rest },
// 	... rest
// ]
// Also Require an Array to represent window changes:
// newArray = [
// 	{ id: 0, width, type, ...rest },
// 	{ id: 1, width, type, ...rest },
// 	... rest
// ]

// Current Window: (currentWindow)
// On Mouse down => Start calculating change (wChange)
// Get total # of windows: (numWindows = wArray.length)
// Get total width of all other windows:  (otherWidths = wArray.reduce().map(item=>item.width) - currentWindow.width)

// with currentWindow
// 	.newWidth = .oldWidth + wChange
// 	if .newWidth < minWidth {
// 		.newWidth = minWidth
// 	}
// 	overFlow = (.newWidth + otherWidths) - 100
// 	if overFlow > 0 {
// 		divide overFlow among other windows=()=>{
// 			shrinkAmount = overFlow/ (numWindows -1)
// 			newArray.map(window=>{
// 				thisShrinkAmount = shrinkAmount + carriedOverNum
// 				window.width -= thisShrinkAmount
// 				minDiff = minWidth - window.width
// 				if minDiff > 0 {
// 					window.width = minWidth
// 					carriedOverNum = minDiff
// 				else {
// 					carriedOverNum = 0
// 				}
// 			}
// 			if carriedOverNum > 0 {
// 				.newWidth = .newWidth - carriedOverNum
// 			}
// 		}
// 	}
// On Mouse up => make wArray = newArray values
// Resize windows
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeedRow from "../components/settings/FeedRow";

const MIN_WIDTH = 9;
const percentToCol = (value) => {
    return Math.floor(12 * (value / 100));
}
const adjustValues = (index = 0, newValue, vArray = []) => {
    let newArray = [...vArray]
    const numWindows = vArray.length;
    const otherWidths = vArray.map(item => item).reduce((total, num) => {
        return total + num;
    }) - vArray[index];

    newArray[index] = newValue;
    if (newArray[index] < MIN_WIDTH) {
        newArray[index] = MIN_WIDTH
    }
    const overflow = (newArray[index] + otherWidths) - 100;
    if (overflow > 0) {
        const shrinkAmount = overflow / (numWindows - 1);
        let carriedOverNum = 0;
        const newerArray = newArray.map((window, idx) => {
            if (idx === index) return window;
            const thisShrinkAmount = shrinkAmount + carriedOverNum;
            let windowWidth = window - thisShrinkAmount;
            const minDiff = MIN_WIDTH - windowWidth;
            if (minDiff > 0) {
                windowWidth = MIN_WIDTH
                carriedOverNum = minDiff
            } else {
                carriedOverNum = 0
            }
            return windowWidth;
        });
        if (carriedOverNum > 0) {
            newerArray[index] -= carriedOverNum
        }
        newArray = [...newerArray];
    }
    return newArray
}


const SettingsPage = () => {
    const [slideTotal, setSlideTotal] = useState([9, 9, 9]);
    const [calculation, setCalculation] = useState([9, 9, 9]);

    const [newsRows, setNewsRows] = useState([{ title: 'Row' }]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleChange = (idx, value) => {
        setSlideTotal((slideTotal) => {
            slideTotal[idx] = parseInt(value);
            setCalculation(adjustValues(idx, parseInt(value), slideTotal))
            slideTotal = calculation;
            return slideTotal;
        })
    }

    const addFeedRow = () => {
        setNewsRows(newsRows => {
            newsRows.push({ title: 'Row' });
            return newsRows;
        })
    }

    const toggleRowSelect = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows => selectedRows.filter(item => item !== index))
        } else {
            setSelectedRows(selectedRows => {
                selectedRows.push(index);
                return selectedRows;
            })
        }
    }

    const deleteSelectedRows = () => {
        setNewsRows(newsRows => newsRows.filter((item, idx) => !selectedRows.includes(idx)));
        setSelectedRows([])
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className='justify-content-center text-center'>
                        Settings Page
                        <br />
                        Calculated Total:
                        {percentToCol(calculation.reduce((total, num) => {
                            return total + num
                        }, 0))}
                        <Row>
                            {slideTotal.map((value, idx) => {
                                return (
                                    <Col key={idx}>
                                        {percentToCol(value)}
                                        <input
                                            type='range'
                                            min='9'
                                            max='100'
                                            value={value}
                                            onChange={(e) => handleChange(idx, e.target.value)}
                                        />
                                    </Col>

                                )
                            })}
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={addFeedRow}>Add Row</Button>
                                <Button onClick={deleteSelectedRows}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected Rows</Button>
                            </Col>
                        </Row>
                        {newsRows.map((item, idx) => {
                            return (
                                <FeedRow
                                    key={idx}
                                    toggleRowSelect={() => toggleRowSelect(idx)}
                                    rowSelected={selectedRows.includes(idx) ? true : false}
                                />
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default SettingsPage;