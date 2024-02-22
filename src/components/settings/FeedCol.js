import { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectBox from '../misc/SelectBox';
import DeleteButton from '../misc/DeleteButton';
import previewPic1 from '../../app/img/carouselPic.png';
import previewPic2 from '../../app/img/pallettePic.png';
import previewPic3 from '../../app/img/headlinesPic.png';
import previewPic4 from '../../app/img/topicPic.png';
import { COMPONENT_TYPES } from '../../app/shared/DEFAULTS';
import { capitalizeFirstLetter } from '../../utils/miscConversions';
import EditSearchModal from './EditSearchModal';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

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
        params
    } = props

    const [localParams, setLocalParams] = useState(params);
    const { title = '', tileType = '', row = 1, sizing = {}, innerSizing = {}, componentAttribute = {}, search = {}, numArticles = 1 } = localParams;
    
    const [titleText, setTitleText] = useState('');
    const [numberText, setNumberText]=useState('');
    const [editTitle, setEditTitle]=useState(false);
    const [editNumber, setEditNumber]= useState(false);
    const [editSearchModalOpen, setEditSearchModalOpen] = useState(false);
    
    useEffect(() => {
        if (params){
            setLocalParams({...params});
        }
    }, [params]);
    
    
    const chooseType = (value) => {
        let attribute = {};
        let thisInnerSizing={};
        switch (value) {
            case 'slide':
                thisInnerSizing={className:''};
                break;
            case 'pallette':
                attribute = { md: '6' };
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
        updateFunc({...newParams});
        setEditNumber(false);
        setNumberText('');
    }
    // console.log(numArticles)
    
    const updateTitle=(value)=>{
        if (value!==''){
            const newParams = {...localParams, title: value};
            updateFunc({...newParams});
            setTitleText('');
        }
        setEditTitle(false);
    }
    
    const updateSearchCriteria=(value)=>{
        const searchCriteria ={
            ...value,
            errorMode: false,
        }
        console.log('search value: ', value)
        console.log('update Search criteria: ', searchCriteria)
        const newParams ={...localParams, search: searchCriteria};
        updateFunc({...newParams});
    }
    return (
        <>
            <Col
                style={
                    isSelected
                        ? { ...styles.basicStyle, ...styles.newsSelected }
                        : { ...styles.basicStyle, ...styles.newsStyle }
                }
                {...localParams.sizing}

            >
                <Row style={styles.topMenu}>
                    <Col className='text-start'>
                        <strong>Current Settings:</strong>
                    </Col>
                    <Col>
                        {/* <SelectBox isSelected={isSelected} onClick={toggleSelect} /> */}
                        <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete'} />
                    </Col>
                </Row>
                <Row>
                    {editTitle ?
                            <Col className={classes.titleClass + 'text-end'}>
                                <Input
                                    type={'text'}
                                    placeholder='Enter new Title'
                                    value={titleText}
                                    onChange={(e)=>{setTitleText(e.target.value)}}
                                    onKeyDown={(e) => e.key === 'Enter' ? updateTitle(titleText) : e}
                                />
                                <Button onClick={()=>{updateTitle(titleText)}} style={styles.saveButton}>
                                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" />
                                </Button>
                                <Button onClick={()=>{setEditTitle(false);setTitleText('')}} style={styles.cancelButton}>
                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                </Button>
                            </Col>
                    : 
                        <Col className={classes.titleClass + 'text-center'}>
                            <span>Title: {title} </span> 
                            <Button onClick={()=>{setEditTitle(true)}} style={styles.editButton}>
                                <FontAwesomeIcon icon='fa-solid fa-pen' />
                            </Button>
                        </Col>
                    }
                </Row>
                <Row >
                </Row>
                <Row>
                    <Col>
                        <Row className='justify-content-center text-start'>
                            <Col>
                                <Label htmlFor='type-selector'>
                                    Type:
                                </Label>
                                <Input
                                    type='select'
                                    defaultValue={tileType}
                                    id='type-selector'
                                    onChange={(e) => { chooseType(e.target.value) }}
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
                        <Row>
                            <Col className='mt-2'>
                                <img src={componentPic[tileType]} className='img-fluid' />
                            </Col>
                        </Row>
                        <Row>
                            {editNumber ?
                                <Col className={classes.titleClass + 'text-end'}>
                                    <Input
                                        type={'text'}
                                        placeholder='Enter a number (1-100)'
                                        value={numberText}
                                        onChange={(e)=>{setNumberText(e.target.value)}}
                                        onKeyDown={(e) => e.key === 'Enter' ? updateNumber(numberText) : e}
                                    />
                                    <Button onClick={()=>{updateNumber(numberText)}} style={styles.saveButton}>
                                        <FontAwesomeIcon icon="fa-regular fa-floppy-disk" />
                                    </Button>
                                    <Button onClick={()=>{setEditNumber(false);setNumberText('')}} style={styles.cancelButton}>
                                        <FontAwesomeIcon icon="fa-solid fa-x" />
                                    </Button>
                                </Col>
                            : 
                                <Col className={classes.titleClass + 'text-center'}>
                                    <span>Number of Articles: {numArticles} </span> 
                                    <Button onClick={()=>{setEditNumber(true)}} style={styles.editButton}>
                                        <FontAwesomeIcon icon='fa-solid fa-pen' />
                                    </Button>
                                </Col>
                            }
                        </Row>
                        Search criteria:
                        <p className='text-no-wrap text-truncate'>
                            {JSON.stringify(search)}
                        </p>
                        <Button style={styles.editButton} onClick={()=>{setEditSearchModalOpen(true)}}>
                            Edit search criteria <FontAwesomeIcon icon='fa-solid fa-pen' />
                        </Button>
                    </Col>
                </Row>
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
        textAlign: 'right'
    },
    deleteButton: {
        border: '1px dashed black',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold',
    },
    newsStyle: {
        background: 'white',
    },
    newsSelected: {
        background: myColors.selectedGreen,
    },
    editButton:{
        border: 'none',
        color: 'rgb(100,50,50)',
        backgroundColor: 'rgba(50,50,50,.2)',
    },
    saveButton:{
        border: 'none',
        color:'green',
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