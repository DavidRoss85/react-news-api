import {
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import { useState, useEffect } from "react";
import SearchCriteriaForm from "./SearchCriteriaForm";


const EditSearchModal = (props) => {

    //Make sure to pass these props
    const { isModalOpen, setIsModalOpen } = props;

    const [renderItem, setRenderItem] = useState(<></>)

    //Determine the items to show in the Modal window
    
    return (
        <Modal isOpen={isModalOpen}>
            <ModalHeader toggle={() => setIsModalOpen(false)}>
                Search Criteria
            </ModalHeader>
            <ModalBody>
                <SearchCriteriaForm 
                    clickCancel={()=>{setIsModalOpen(false)}}
                />
            </ModalBody>
        </Modal>

    )
}

export default EditSearchModal;