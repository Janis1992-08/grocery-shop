import axios from "axios";
import {ChangeEvent, useState} from "react";

export default function AddList() {
    const [listName, setListName] = useState('')

    const submitHandler = () => {
        axios.post('/api/shop', { listName })
            .then(() => setListName(''))
            .catch(() => console.error('Error adding list.'));
    }

    const handleListNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setListName(event.target.value);
    }

    return (
        <form>
            <input
                onChange={handleListNameChange}
                value={listName}
                type={"text"}
                name={"name"}
                required={true}
                minLength={2}/>
            <button onClick={submitHandler}>Submit</button>
        </form>
    )
}