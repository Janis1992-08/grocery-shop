import {useState} from "react";
import Modal from "./Modal.tsx";
import FormAddItem from "./FormAddItem.tsx";

export default function AddItem() {
    const [isVisible, setIsVisible] = useState(false);

    const closeModal = () => setIsVisible(!isVisible);

    return (
        <>
            <button onClick={() => setIsVisible(!isVisible)}>ADD</button>
            <Modal isVisible={isVisible} onClose={closeModal}>
                <FormAddItem></FormAddItem>
            </Modal>
        </>
    )
}