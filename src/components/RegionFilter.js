import { LOCATIONLIST } from "../app/shared/DEFAULTS";
import { Row, Col, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentRegion } from "../app/selectors/settingsSlice";
import { changeRegion } from "../app/selectors/settingsSlice";

const RegionFilter = () => {

    const currentRegion = useSelector(getCurrentRegion);
    const dispatch = useDispatch();

    const chooseRegion = (event)=>{
        dispatch(changeRegion(event.target.value.toLowerCase()));
    }

    return (
        <Row>
            <Label htmlFor="country-select" md="4" className="text-start">
                Region:
            </Label>
            <Col xs="8">
                <Input type="select" defaultValue={currentRegion.toUpperCase}  onChange={(e) => chooseRegion(e)} id="country-select" className="blackDropdown">
                    {LOCATIONLIST.map((location, idx) => <option key={idx} value={location}>{location.toUpperCase()}</option>)}
                </Input>
            </Col>
        </Row>
    )
}

export default RegionFilter;