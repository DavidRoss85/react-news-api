import {
    FormGroup,
    Label,
    Button
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateSearchCriteria } from "../../utils/validateSearchCriteria";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINTS, LOCATIONLIST, CATEGORIES, LANGUAGES, SORT_BY } from "../../app/shared/DEFAULTS";
import { capitalizeFirstLetter } from "../../utils/miscConversions";
import { legacy_createStore } from "redux";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";


const SearchCriteriaForm = (props) => {

    //Make sure to pass these props
    const { clickCancel, handleSubmit = ()=>{}, search } = props;

    const [localParams, setLocalParams] = useState(search);
    const [localEndpoint, setlocalEndpoint] = useState(search.endpoint)

    useEffect(() => {
        if (search) {
            setLocalParams({ ...search });
        }
    }, [search]);

    const {
        endpoint = 'top-headlines',
        country = '',
        category = '',
        keyword = '',
        fromDate = '',
        toDate = '',
        language='',
        sortBy = '',
        sources = '',
    } = localParams;

    const renderTopHeadlines = () => {
        return (
            <>
                <FormGroup>
                    <Label htmlFor='country'>Country:</Label>
                    <Field
                        id='country'
                        name='country'
                        as='select'
                        className='form-control'
                    >
                        {LOCATIONLIST.map((item, idx) => {
                            const immItem = item || 'none';
                            return (
                                <option
                                    key={idx}
                                    className='text-center'
                                    value={item}
                                >
                                    {immItem.toUpperCase()}
                                </option>
                            )
                        })}
                    </Field>
                    <ErrorMessage name='country'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='category'>Category:</Label>
                    <Field
                        id='category'
                        name='category'
                        as='select'
                        className='form-control'
                    >
                        {CATEGORIES.map((item, idx) => {
                            const immItem = item || 'all';
                            return (
                                <option
                                    key={idx}
                                    className='text-center'
                                    value={item}
                                >
                                    {capitalizeFirstLetter(immItem)}
                                </option>
                            )
                        })}
                    </Field>
                    <ErrorMessage name='country'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

            </>

        )
    }

    const renderEvery = () => {
        return (
            <>
                <FormGroup>
                    <Label htmlFor='fromDate'>from:</Label>
                    <Field
                        id='fromDate'
                        name='fromDate'
                        placeholder='from (Date)'
                        className='form-control'
                    />
                    <ErrorMessage name='fromDate'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='toDate'>From:</Label>
                    <Field
                        id='toDate'
                        name='toDate'
                        placeholder='To (Date)'
                        className='form-control'
                    />
                    <ErrorMessage name='toDate'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='language'>Language:</Label>
                    <Field
                        id='language'
                        name='language'
                        as='select'
                        className='form-control'
                    >
                        {LANGUAGES.map((item, idx) => {
                            const immItem = item || 'any';
                            return (
                                <option
                                    key={idx}
                                    className='text-center'
                                    value={item}
                                >
                                    {immItem.toUpperCase()}
                                </option>
                            )
                        })}
                    </Field>
                    <ErrorMessage name='language'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='sortBy'>Sort By:</Label>
                    <Field
                        id='sortBy'
                        name='sortBy'
                        as='select'
                        className='form-control'
                    >
                        {SORT_BY.map((item, idx) => {
                            const immItem = item || 'no sort';
                            return (
                                <option
                                    key={idx}
                                    className='text-center'
                                    value={item}
                                >
                                    {capitalizeFirstLetter(immItem)}
                                </option>
                            )
                        })}
                    </Field>
                    <ErrorMessage name='sortBy'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

            </>
        )
    }

    const handleFormChange = (event) => {
        if (event.target.id === 'endpoint') {
            setlocalEndpoint(event.target.value);
        }
        console.log('form change')
    }

    function testFunc(v){
        console.log('test func: ')
    }
    
    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                endpoint,
                country,
                category,
                keyword,
                fromDate,
                toDate,
                language,
                sortBy,
                sources,
            }}
            validate={()=>{}}
        >
            <Form onChange={handleFormChange}>
                <FormGroup>
                    <Label htmlFor='endpoint'>Endpoint:</Label>
                    <Field
                        id='endpoint'
                        name='endpoint'
                        as='select'
                        className='form-control'
                    // onChange={(e)=>{console.log(e);}}
                    >
                        {ENDPOINTS.map((item, idx) => {
                            return (
                                <option
                                    key={idx}
                                    className='text-center'
                                    value={item}
                                >
                                    {capitalizeFirstLetter(item)}
                                </option>
                            )
                        })}
                    </Field>
                    <ErrorMessage name='endpoint'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                {localEndpoint === 'top-headlines' ?
                    renderTopHeadlines()
                    :
                    renderEvery()
                }

                <FormGroup>
                    <Label htmlFor='keyword'>Keywords:</Label>
                    <Field
                        id='keyword'
                        name='keyword'
                        placeholder='Place quotations around terms for exact matches...'
                        className='form-control'
                    />
                    <ErrorMessage name='keyword'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <Button type='submit' color='primary'>Save</Button>
                {' '}
                <Button onClick={clickCancel} >Cancel</Button>
            </Form>
        </Formik>
    )

}

export default SearchCriteriaForm;