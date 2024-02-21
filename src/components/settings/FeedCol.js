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
    
    
    useEffect(() => {
        if (params){
            setLocalParams({...params});
        }
    }, [params]);
    
    const { title = '', tileType = '', row = 1, sizing = {}, innerSizing = {}, componentAttribute = {}, search = {}, numArticles = 1 } = localParams;
    
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
    const chooseNumArticles = (value) => {
        //ensure value is a number less than 100
        const newNumber = (parseInt(value) || 1) > 100 ? 100 : parseInt(value) || 1

        //updates numArticles with a number > 0
        const newParams = { ...localParams, numArticles: (newNumber >= 1) ? newNumber : 1 };
        updateFunc(newParams);
    }
    // console.log(numArticles)
    return (
        <Col
            style={
                isSelected
                    ? { ...styles.basicStyle, ...styles.newsSelected }
                    : { ...styles.basicStyle, ...styles.newsStyle }
            }
            {...localParams.sizing}

        >
            <Row style={styles.topMenu}>
                <Col className='text-no-wrap text-truncate'>
                    <h5>Title: {title}</h5>
                </Col>
                <Col>
                    {/* <SelectBox isSelected={isSelected} onClick={toggleSelect} /> */}
                    <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete'} />
                </Col>
            </Row>
            <Row >
                <Col>
                    <strong>Current Settings:</strong>
                </Col>
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
                        <Col>
                            <Label htmlFor='numArticles' className='text-start'>
                                Number of Articles to display:
                            </Label>
                            <Input
                                className='text-center'
                                placeholder={JSON.stringify(numArticles)}
                                onChange={(e) => { chooseNumArticles(e.target.value) }}
                            // value={JSON.stringify(numArticles)}
                            />
                        </Col>
                    </Row>
                    Search criteria:
                    <p className='text-no-wrap text-truncate'>
                        {JSON.stringify(search)}
                    </p>
                    <Button> Edit search criteria <FontAwesomeIcon icon='fa-solid fa-pen' /></Button>
                </Col>
            </Row>
        </Col>

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
}
export default FeedCol;