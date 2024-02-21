import {
    FormGroup,
    Label,
    Button
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateSearchCriteria } from "../../utils/validateSearchCriteria";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchCriteriaForm =(props)=>{

    //Make sure to pass these props
    const { clickCancel, handleSubmit } = props;

    return(
        <Formik
            initialValues={{
                endpoint: '',
                country: '',
                category: '',
                keyword:'',
                fromDate:'',
                toDate:'',
                sortBy:'',
                sources:'',
            }}
            onSubmit={handleSubmit}
            validate={validateSearchCriteria}
        >
            <Form>
                <FormGroup>
                    <Label htmlFor='endpoint'>Endpoint:</Label>
                    <Field
                        id='endpoint'
                        name='endpoint'
                        type='select'
                        className='form-control'
                    >
                    </Field>
                    <ErrorMessage name='endpoint'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='country'>Country</Label>
                        <Field
                            id='country'
                            name='country'
                            type='select'
                            className='form-control'
                        />
                    <ErrorMessage name='country'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <Button type='submit' color='primary'>Login</Button>
                {' '}
                <Button onClick={clickCancel} >Cancel</Button>
            </Form>
        </Formik>
    )
}

export default SearchCriteriaForm;