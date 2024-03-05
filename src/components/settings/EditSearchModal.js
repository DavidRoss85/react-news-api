import {
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import SearchCriteriaForm from "./SearchCriteriaForm";


const EditSearchModal = (props) => {

    //Make sure to pass these props
    const { isModalOpen, setIsModalOpen, updateFunc, search } = props;

    // const [renderItem, setRenderItem] = useState(<></>)

    const handleSubmit=(value)=>{
        updateFunc(value);
        setIsModalOpen(false);
    }
    return (
        <Modal isOpen={isModalOpen}>
            <ModalHeader toggle={() => setIsModalOpen(false)}>
                Search Criteria
            </ModalHeader>
            <ModalBody>
                <SearchCriteriaForm
                    search={search}
                    handleSubmit={handleSubmit} 
                    clickCancel={()=>{setIsModalOpen(false)}}
                />
            </ModalBody>
        </Modal>

    )
}

export default EditSearchModal;