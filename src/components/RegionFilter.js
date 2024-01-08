import { LOCATIONLIST } from "../app/shared/DEFAULTS";
import { Row, Col, Label, Input } from "reactstrap";

const RegionFilter = (props) => {
    const { region, setRegion = () => { console.log("Region changed") } } = props;

    function chooseRegion(event){
        setRegion(event.target.value.toLowerCase())
    }

    return (
        <Row>
            <Label htmlFor="country-select" md="4" className="text-start">
                Region:
            </Label>
            <Col xs="8">
                <Input type="select" onChange={(e) => chooseRegion(e)} id="country-select" className="blackDropdown">
                    {LOCATIONLIST.map((location, idx) => <option key={idx} value={location}>{location.toUpperCase()}</option>)}
                </Input>
            </Col>
        </Row>
    )
}

export default RegionFilter;