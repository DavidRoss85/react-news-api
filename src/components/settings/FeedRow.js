import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultPageColumn } from "../../app/shared/DEFAULTS";
import { makeRoomInArray, restrictArrayValues } from "../../utils/miscConversions";

import SelectBox from "../misc/SelectBox";
import FeedCol from "./FeedCol";
import DeleteButton from "../misc/DeleteButton";
import ColSizeSlide from "./ColSizeSlide";
import ColNumUpDown from "./ColNumUpDown";

const MAX_COLUMNS = 5;
const FeedRow = (props) => {
    const {
        rowSelected,
        toggleRowSelect = () => { },
        deleteFunc = () => { },
        updateFunc = () => { },
        toggleUpdate,
        params
    } = props;

    const [newsColumns, setNewsColumns] = useState(params.components);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [columnWidths, setColumnWidths] = useState([]);

    useEffect(() => {
        updateFunc(params.idx, newsColumns);
        setColumnWidths(columnWidths => {
            const value = newsColumns.map(column => column.sizing.md);
            return [...value];
        });
    }, [newsColumns])

    useEffect(() => {
        setNewsColumns(params.components);
    }, [params.components])

    const addNewsColumn = () => {
        setColumnWidths(columnWidths => {
            if (columnWidths.length < MAX_COLUMNS) {
                const newArray = makeRoomInArray(columnWidths)
                updateNewsColumnsWidth(newArray)
                return [...newArray]
            }
            return [...columnWidths];
        });
        setNewsColumns(newsColumns => {
            if (newsColumns.length < MAX_COLUMNS) {
                newsColumns.push({ ...defaultPageColumn, row: params.rowNum })
            }
            return [...newsColumns];
        });
    };

    const toggleColumnSelect = (id) => {
        if (selectedColumns.includes(id)) {
            setSelectedColumns(selectedColumns => selectedColumns.filter(item => item !== id))
        } else {
            setSelectedColumns(selectedColumns => {
                selectedColumns.push(id);
                return [...selectedColumns];
            })
        }
    }

    const deleteSelected = () => {
        selectedColumns.map((id) => {
            deleteColumn(id);
        })
        setSelectedColumns([])
    }

    const deleteColumn = (id) => {
        setNewsColumns(newsColumns => newsColumns.filter((item, idx) => id !== idx));
    }

    const changeColumnWidth = (id) => (value) => {
        setColumnWidths(columnWidths => {
            const newWidths = restrictArrayValues(id, parseInt(value), columnWidths);
            updateNewsColumnsWidth([...newWidths]);
            return [...newWidths]
        });
    }
    const updateNewsColumnsWidth = (newWidths) => {
        setNewsColumns(newsColumns => {
            const newValue = newsColumns.map((column, idx) => {
                //updates column.sizing.md
                return { ...column, sizing: { ...column.sizing, md: newWidths[idx] } };
            })
            return [...newValue]
        });
    }
    const updateColumnContents = (id) => (values) => {
        setNewsColumns(newsColumns => {
            newsColumns[id] = { ...newsColumns[id], ...values };
            return [...newsColumns];
        })
    }
    return (
        <>
            <Row style={
                rowSelected
                    ? { ...styles.basicStyle, ...styles.rowSelected }
                    : { ...styles.basicStyle, ...styles.rowStyle }
            }
            >
                <Col>
                    <Row style={styles.menuRow}>
                        <Col style={{ textAlign: 'start', fontWeight: 'bold' }}>
                            Row: #{params.rowNum}
                        </Col>
                        <Col style={{ textAlign: 'end', }}>
                            <SelectBox isSelected={rowSelected} onClick={toggleRowSelect} />
                            <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete Row'} />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'start' }}>
                        <Col>
                            <Button style={styles.buttonStyle} onClick={addNewsColumn}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Column</Button>
                            <Button style={styles.buttonStyle} onClick={() => updateColumnContents(0)({ ...newsColumns[0], tileType: 'pallette' })}>Test</Button>
                            {/* <Button style={styles.buttonStyle} onClick={deleteSelected}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected</Button> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Row className='justify-content-start'>
                                {newsColumns.map((item, idx) => {
                                    return (
                                        <Col key={idx} className="d-none d-md-inline-block text-start">
                                            <ColNumUpDown
                                                title={`Column ${idx + 1} width:`}
                                                numInput={columnWidths[idx]}
                                                finishChange={changeColumnWidth(idx)}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                        <Col md='6'>
                        </Col>
                    </Row>

                    <Row>
                        {/*Mapping twice to simplify layout code and readability*/}
                        {newsColumns.map((item, idx) => {
                            //inserts the md value into the object
                            const immItem = {
                                ...item,
                                sizing: {
                                    ...item.sizing,
                                    md: columnWidths[idx]
                                        ? columnWidths[idx].toString()
                                        : '1'
                                }
                            }
                            return (
                                <FeedCol
                                    key={idx}
                                    deleteFunc={() => deleteColumn(idx)}
                                    updateFunc={updateColumnContents(idx)}
                                    isSelected={selectedColumns.includes(idx)}
                                    toggleSelect={() => toggleColumnSelect(idx)}
                                    params={immItem}
                                />
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const myColors = {
    lightRed: 'rgb(255,80,80)',
    selectedGreen: 'rgb(80,255,80)'
};

const styles = {
    basicStyle: {
        padding: '5px',
        border: '3px solid black',
        borderRadius: '14px',
        marginTop: '8px',
    },
    buttonStyle: {
        backgroundColor: 'rgba(80,80,255,.8)',
        marginLeft: '3px',
        marginRight: '3px'
    },
    deleteButton: {
        border: '1px solid black',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
    menuRow: {
        borderRadius: '10px',
        padding: '5px',
    },
    rowStyle: {
        background: myColors.lightRed
    },
    rowSelected: {
        background: 'blue'
    },
};

export default FeedRow;