import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { Row, Col, Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteButton from './DeleteButton';
import previewPic1 from '../../app/img/carouselPic.png';
import previewPic2 from '../../app/img/pallettePic.png';
import previewPic3 from '../../app/img/headlinesPic.png';
import previewPic4 from '../../app/img/topicPic.png';
import { COMPONENT_TYPES } from '../../app/shared/DEFAULTS';
import { capitalizeFirstLetter } from '../../utils/miscConversions';
import EditSearchModal from './EditSearchModal';

const componentPic = {
    slide: previewPic1,
    pallette: previewPic2,
    list: previewPic3,
    topic: previewPic4
}
const FeedCol = (props) => {
    const {
        isSelected,
        toggleSelect = () => { },
        updateFunc = () => { console.log('function undefined') },
        deleteFunc = () => { },
        moveLeftFunc = () => { },
        moveRightFunc = () => { },
        params
    } = props

    const [springs, api] = useSpring(() => ({ from: { x: 0, opacity:1 },  })); //animation spring
    const colRef = useRef(null); //used to get width of column

    const [localParams, setLocalParams] = useState(params);
    const { id = 0, title = '', tileType = '', sizing = {}, style = {}, innerSizing = {}, componentAttribute = {}, search = {}, numArticles = 1 } = localParams;
    // {border:'2px black solid'}
    const [titleText, setTitleText] = useState('');
    const [numberText, setNumberText] = useState('');
    const [borderSelect, setBorderSelect] = useState(!!style.border)
    const [editTitle, setEditTitle] = useState(false);
    const [editNumber, setEditNumber] = useState(false);
    const [editSearchModalOpen, setEditSearchModalOpen] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (params) {
            setLocalParams({ ...params });
        }
    }, [params]);


    const updateAttribute = (value) => {
        const newParams = {
            ...localParams,
            componentAttribute: value,
        };
        updateFunc(newParams);
    }

    const updateBorders = (value) => {

        const newStyle = value ? { border: '2px solid black' } : {}
        const newParams = {
            ...localParams,
            style: {
                ...localParams.style,
                ...newStyle
            }
        };
        setBorderSelect(value);
        updateFunc(newParams);
    }

    const updateType = (value) => {
        let attribute = {};
        let thisInnerSizing = {};
        switch (value) {
            case 'slide':
                thisInnerSizing = { className: 'slideHolder' };
                break;
            case 'pallette':
                attribute = componentAttribute;
                break;
            case 'list':
                break;
            case 'topic':
                break;
            default:
        }

        const newParams = {
            ...localParams,
            tileType: value,
            componentAttribute: attribute,
            innerSizing: thisInnerSizing
        };
        updateFunc(newParams);
    }
    const updateNumber = (value) => {
        //ensure value is a number less than 100
        const newNumber = (parseInt(value) || 1) > 100 ? 100 : parseInt(value) || 1

        //updates numArticles with a number > 0
        const newParams = { ...localParams, numArticles: (newNumber >= 1) ? newNumber : 1 };
        updateFunc({ ...newParams });
        setEditNumber(false);
        setNumberText('');
    }
    // console.log(numArticles)

    const updateTitle = (value) => {
        if (value !== '') {
            const newParams = { ...localParams, title: value };
            updateFunc({ ...newParams });
            setTitleText('');
        }
        setEditTitle(false);
    }

    const updateSearchCriteria = (value) => {
        const searchCriteria = {
            ...value,
            errorMode: false,
        }
        const newParams = { ...localParams, search: searchCriteria };
        updateFunc({ ...newParams });
    }

    const displaySearchCriteria = (search) => {
        if (search.endpoint === 'top-headlines') {
            return (
                <>
                    Search criteria:
                    <p className='text-no-wrap text-truncate'>
                        {capitalizeFirstLetter(search.endpoint)}<br />
                        Country - {capitalizeFirstLetter(search.country)}<br />
                        Category - {capitalizeFirstLetter(search.category)}<br />
                        Keywords - {capitalizeFirstLetter(search.keyword)}<br />
                    </p>
                </>
            )
        } else {

            return (
                <>
                    Search criteria:
                    <p>
                        {capitalizeFirstLetter(search.endpoint)}<br />
                        Date Range {capitalizeFirstLetter(search.fromDate)}{' - '}
                        {capitalizeFirstLetter(search.toDate)}<br />
                        Language - {search.language.toUpperCase()}<br />
                        Sort By - {capitalizeFirstLetter(search.sortBy)}
                    </p>
                </>
            )
        }
    }

    const animateLeft = () => {
        if(animating) return;
        setAnimating(true);
        api.start({
            from: {
                x: springs.x.get(),
            },
            to: async (next, cancel) => {
                const mX = springs.x.get();
                await next({ x: mX - (colRef.current ? colRef.current.offsetWidth : 200), opacity: 0 });
                moveLeftFunc();
                await next({ x: mX, opacity: 1 });
                setAnimating(false);
            },
        })
    }
    const animateRight = () => {
        if(animating) return;
        setAnimating(true);
        api.start({
            from: {
                x: springs.x.get(),
            },
            to: async (next, cancel) => {
                const mX = springs.x.get();
                await next({ x: mX + colRef.current ? colRef.current.offsetWidth : 200, opacity: 0, });
                moveRightFunc();
                await next({ x: mX, opacity: 1 });
                setAnimating(false);
            },
        })

    }

    const animateDelete = ()=>{
        if(animating)return;
        setAnimating(true);
        api.start({
            from: { opacity: 1},
            to: async(next, cancel)=>{
                await next({opacity:0});
                deleteFunc();
                setAnimating(false);
                await next({opacity:1});
            }
        })
    }
    return (
        <>
            <Col
                {...localParams.sizing}
            >

                <animated.div
                    ref={colRef}
                    style={
                        isSelected
                            ? { ...springs, ...styles.basicStyle, ...styles.newsSelected, ...springs }
                            : { ...springs, ...styles.basicStyle, ...styles.newsStyle, ...springs }
                    }

                >
                    <Row style={styles.topMenu}>
                        <Col className='text-start'>
                            <strong>Current Settings:</strong>
                        </Col>
                        <Col>
                            {/* <SelectBox isSelected={isSelected} onClick={toggleSelect} /> */}
                            <DeleteButton
                                onClick={animateDelete}
                                style={styles.deleteButton}
                                btnText={'Delete'}
                            />
                        </Col>
                    </Row>
                    <Row className='text-center p-1'>
                        <Col className='text-start d-none d-md-inline-block'>
                            <Button {...styles.moveButton} onClick={animateLeft} title={'Switch positions'}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                            </Button>
                        </Col>
                        <Col className='text-start d-md-none'>
                            <Button {...styles.moveButton} onClick={animateLeft} title={'Switch positions'}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                            </Button>
                        </Col>
                        <Col className='text-end d-none d-md-inline-block'>
                            <Button {...styles.moveButton} onClick={animateRight} title={'Switch positions'}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                            </Button>
                        </Col>
                        <Col className='text-end d-md-none'>
                            <Button {...styles.moveButton} onClick={animateRight} title={'Switch positions'}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {editTitle ?
                            <Col className={classes.titleClass + 'text-end'}>
                                <Input
                                    type={'text'}
                                    placeholder='Enter new Title'
                                    value={titleText}
                                    onChange={(e) => { setTitleText(e.target.value) }}
                                    onKeyDown={(e) => e.key === 'Enter' ? updateTitle(titleText) : e}
                                />
                                <Button onClick={() => { updateTitle(titleText) }} style={styles.saveButton} title={'Save'}>
                                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" />
                                </Button>
                                <Button onClick={() => { setEditTitle(false); setTitleText('') }} style={styles.cancelButton} title={'Cancel'}>
                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                </Button>
                            </Col>
                            :
                            <Col className={classes.titleClass + 'text-center'}>
                                <span>Title: {title} </span>
                                <Button onClick={() => { setEditTitle(true) }} style={styles.editButton} title={'Edit'}>
                                    <FontAwesomeIcon icon='fa-solid fa-pen' />
                                </Button>
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Input
                                        id={`borderSelect${id}`}
                                        name={`borderSelect${id}`}
                                        type='checkbox'
                                        onChange={(e) => { updateBorders(e.target.checked) }}
                                        checked={borderSelect}
                                    />
                                    {' '}
                                    <Label htmlFor={`borderSelect${id}`}>
                                        Borders
                                    </Label>
                                </Col>
                            </Row>
                            <Row className='justify-content-center text-start'>
                                <Col>
                                    <Label htmlFor={`type-selector${id}`}>
                                        Type:
                                    </Label>
                                    <Input
                                        type='select'
                                        value={tileType}
                                        id={`type-selector${id}`}
                                        onChange={(e) => { updateType(e.target.value) }}
                                    >
                                        {COMPONENT_TYPES.map((item, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    className='text-center'
                                                    value={item}
                                                >
                                                    {capitalizeFirstLetter(item)}
                                                </option>)
                                        })}
                                    </Input>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <Row>
                                        <Col>
                                            <img src={componentPic[tileType]} className='img-fluid'  title={'Example of how your news will display'}/>
                                        </Col>
                                    </Row>
                                    {tileType === 'pallette' ?
                                        <Row>
                                            <Col className='text-center justify-content-center'>
                                                <Label htmlFor={`optionsSelector${id}`}>
                                                    Columns:
                                                </Label>
                                                <Input
                                                    id={`optionsSelector${id}`}
                                                    className='text-center'
                                                    type='select'
                                                    defaultValue={componentAttribute.md}
                                                    onChange={(e) => { updateAttribute({ md: e.target.value }) }}
                                                >
                                                    <option value={'12'}>1</option>
                                                    <option value={'6'}>2</option>
                                                    <option value={'4'}>3</option>
                                                    <option value={'3'}>4</option>
                                                    <option value={'2'}>6</option>
                                                    <option value={'1'}>12</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        :
                                        <></>
                                    }
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                {editNumber ?
                                    <Col className={classes.titleClass + 'text-end'}>
                                        <Input
                                            type={'text'}
                                            placeholder='Enter a number (1-100)'
                                            value={numberText}
                                            onChange={(e) => { setNumberText(e.target.value) }}
                                            onKeyDown={(e) => e.key === 'Enter' ? updateNumber(numberText) : e}
                                        />
                                        <Button onClick={() => { updateNumber(numberText) }} style={styles.saveButton}>
                                            <FontAwesomeIcon icon="fa-regular fa-floppy-disk" />
                                        </Button>
                                        <Button onClick={() => { setEditNumber(false); setNumberText('') }} style={styles.cancelButton}>
                                            <FontAwesomeIcon icon="fa-solid fa-x" />
                                        </Button>
                                    </Col>
                                    :
                                    <Col className={classes.titleClass + 'text-center'}>
                                        <span>Number of Articles: {numArticles} </span>
                                        <Button onClick={() => { setEditNumber(true) }} style={styles.editButton} title={'Change number of articles loaded'}>
                                            <FontAwesomeIcon icon='fa-solid fa-pen' />
                                        </Button>
                                    </Col>
                                }
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    {displaySearchCriteria(search)}
                                    <Button style={styles.editButton} onClick={() => { setEditSearchModalOpen(true) }}>
                                        Edit search criteria <FontAwesomeIcon icon='fa-solid fa-pen' />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </animated.div>
            </Col>

            <EditSearchModal
                search={search}
                updateFunc={updateSearchCriteria}
                isModalOpen={editSearchModalOpen}
                setIsModalOpen={setEditSearchModalOpen}
            />
        </>
    )
}
const myColors = {
    lightRed: 'rgb(255,80,80)',
    selectedGreen: 'rgb(80,255,80)'
};

const styles = {
    basicStyle: {
        marginTop: '5px',
        border: '2px solid black',
        borderRadius: '20px',
        paddingBottom: '5px',
    },
    topMenu: {
        textAlign: 'right',
        paddingTop: '5px'
    },
    deleteButton: {
        color: 'dark',
        outline: true,
        style: {
            border: '1px dashed black',
            fontWeight: 'bold',
        }
    },
    moveButton: {
        color: 'dark',
        outline: true,
        style: {
            border: '1px dashed black',
            fontWeight: 'bold',
        }
    },
    newsStyle: {
        background: 'white',
    },
    newsSelected: {
        background: myColors.selectedGreen,
    },
    editButton: {
        border: 'none',
        color: 'rgb(100,50,50)',
        backgroundColor: 'rgba(50,50,50,.2)',
    },
    saveButton: {
        border: 'none',
        color: 'green',
        backgroundColor: 'rgba(50,100,50,.5)',
    },
    cancelButton: {
        border: 'none',
        color: 'red',
        backgroundColor: 'rgba(100,50,50,.5)',
    },
}

const classes = {
    titleClass: 'text-no-wrap text-truncate '
}
export default FeedCol;