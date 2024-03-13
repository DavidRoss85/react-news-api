import { Row } from "reactstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeedRow from "../../components/settings/FeedRow";
import { postUserSettings, updateIsSaved } from "../../app/selectors/userSlice";
import HomeSetButtonRow from "../../components/settings/HomeSetButtonRow";

const SetHomeView = ({ backFunc }) => {

    const [newsRows, setNewsRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const userSettings = useSelector(state => state.settings.data);
    const [currentSettings, setCurrentSettings] = useState(userSettings);
    const { homepage: homePageSettings } = currentSettings.current;

    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentSettings({ ...userSettings });
    }, [userSettings])

    useEffect(() => {
        setNewsRows(() => {
            /*tempArr = [
                [{id: 0,row: 1},{id: 1,row: 1}],
                [{id: 2,row: 2},{id: 3,row: 2}],
                [{id: 4,row: 3}],
            ]*/

            const tempArr = [];
            const maxRows = Math.max(...homePageSettings.map((item) => item.row ? item.row : 1));
            for (let i = 1; i <= maxRows; i++) {
                tempArr.push([]);
            }
            for (const item of homePageSettings) {
                if (item.row) {
                    const rIndex = item.row - 1;
                    tempArr[rIndex].push(item)
                }
            }
            return [...tempArr];
        })
    }, [homePageSettings])

    const saveUserSettings = (newsArray) => {
        const flattenedArray = newsArray.flat()
        const settingsArray = flattenedArray.map((item, idx) => {
            const newItem = { ...item, id: idx }
            return { ...newItem };
        });
        
        const settingsObj = {
            username: userSettings.username || 'defaultUser',
            avatar: '',
            preferences: {
                region: '',
                homepage: settingsArray
            }
        }
        dispatch(postUserSettings(settingsObj));
    }
    const updateFeedRow = (id, value) => {
        setNewsRows(newsRows => {
            newsRows[id] = value;
            return [...newsRows];
        });
        // dispatch(updateIsSaved(false));
    }
    
    const addFeedRow = () => {
        setNewsRows(newsRows => {
            newsRows.push([]);
            return [...newsRows];
        });
    }

    const toggleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows => selectedRows.filter(item => item !== id))
        } else {
            setSelectedRows(selectedRows => {
                selectedRows.push(id);
                return [...selectedRows];
            });
        }
    }

    const deleteSelectedRows = () => {
        selectedRows.map((id) => {
            deleteRow(id);
        })
        setSelectedRows([]);
    }

    const deleteRow = (id) => {
        setNewsRows(newsRows => newsRows.filter((item, idx) => {
            return id !== idx
        }));
    }

    const moveRowsUp = (id) => {
        setNewsRows(newsRows => {
            const tempRow = newsRows[id];
            const moveToRow = id <= 0 ? newsRows.length - 1 : id - 1
            newsRows[id] = newsRows[moveToRow];
            newsRows[moveToRow] = tempRow;
            newsRows[id] = newsRows[id].map((column) => {
                column = { ...column, row: (id + 1) };
                return column;
            });
            newsRows[moveToRow] = newsRows[moveToRow].map((column) => {
                column = { ...column, row: (moveToRow + 1) };
                return column;
            })
            return [...newsRows];
        })
    }
    const moveRowsDown = (id) => {
        setNewsRows(newsRows => {
            const tempRow = newsRows[id];
            const moveToRow = id >= (newsRows.length - 1) ? 0 : id + 1
            newsRows[id] = newsRows[moveToRow];
            newsRows[moveToRow] = tempRow;
            newsRows[id] = newsRows[id].map((column) => {
                column = { ...column, row: (id + 1) };
                return column;
            });
            newsRows[moveToRow] = newsRows[moveToRow].map((column) => {
                column = { ...column, row: (moveToRow + 1) };
                return column;
            })
            return [...newsRows];
        })
    }

    return (
        <>
            <HomeSetButtonRow
                addFunc={addFeedRow}
                deleteFunc={deleteSelectedRows}
                saveFunc={() => { saveUserSettings(newsRows) }}
                backFunc={backFunc}
            />
            <Row>
                {newsRows.map((components, idx) => {
                    return (
                        <FeedRow
                            key={idx}
                            toggleRowSelect={() => toggleRowSelect(idx)}
                            rowSelected={selectedRows.includes(idx) ? true : false}
                            deleteFunc={() => deleteRow(idx)}
                            updateFunc={updateFeedRow}
                            moveUpFunc={() => { moveRowsUp(idx) }}
                            moveDownFunc={() => { moveRowsDown(idx) }}
                            params={{
                                rowNum: idx + 1,
                                idx,
                                components: components
                            }}
                        />
                    )
                })}
            </Row>
            <HomeSetButtonRow
                addFunc={addFeedRow}
                deleteFunc={deleteSelectedRows}
                saveFunc={() => { saveUserSettings(newsRows) }}
                backFunc={backFunc}
            />
        </>
    )
}

export default SetHomeView;