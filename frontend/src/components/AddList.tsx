import axios from "axios";
import {ChangeEvent, MouseEvent, useState} from "react";

export default function AddList() {
    const [listName, setListName] = useState('')

    const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        axios.post('/api/shop', { listName })
            .catch(() => console.error('Error adding list.'));

        setListName('');
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