import { LOCATIONLIST } from '../../app/shared/DEFAULTS';
import { Row, Col, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentRegion } from '../../app/selectors/settingsSlice';
import { changeRegion } from '../../app/selectors/settingsSlice';

const RegionFilter = () => {

    const currentRegion = useSelector(getCurrentRegion);
    const dispatch = useDispatch();

    const chooseRegion = (event) => {
        dispatch(changeRegion(
            event.target.value.toLowerCase()
        ));
    }
    return (
        <Row>
            <Label htmlFor='country-select' md='4' className='text-start'>
                Region:
            </Label>
            <Col xs='8'>
                <Input
                    type='select'
                    value={currentRegion}
                    id='country-select'
                    onChange={(e) => chooseRegion(e)}
                    className='blackDropdown'
                >
                    {LOCATIONLIST.map((location, idx) => {
                        return (
                            <option
                                key={idx}
                                value={location}
                            >
                                {location.toUpperCase()}
                            </option>
                        )
                    })}
                </Input>
            </Col>
        </Row>
    )
}

export default RegionFilter;