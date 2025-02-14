import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {ShoppingList as ShoppingListType} from "./ShoppingListSchema.ts";
import AddList from "./AddList.tsx";
import {Status as StatusType} from "./ShoppingListSchema.ts";


export default function ShoppingList() {
    const [inputValue, setInputValue] = useState<string>('');
    const [editingListId, setEditingListId] = useState<string | null>(null);
    const [lists, setLists] = useState<ShoppingListType[]>([]);
    const [status, setStatus] = useState<StatusType>({});

    const fetchLists = () => {
        axios.get("/api/shop")
            .then(response => {
                setLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(fetchLists, []);
    useEffect(() => {
        lists.forEach(list => {
            axios.get(`/api/shop/status/${list.id}`)
                .then(response => {
                    setStatus(prevStatus => ({
                        ...prevStatus,
                        [list.id]: response.data,
                    }));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
    }, [lists]);

    if(!lists) {
        return <p>Loading...</p>
    }

    function deleteList(id:string) {

        axios.delete(`/api/shop/${id}`)
            .then(fetchLists)
            .catch(error => console.log(error))
    }


    const handleButtonClick = (id: string) => {
        if (editingListId === id) {
            setLists(prevLists =>
                prevLists.map(list =>
                    list.id === id ? { ...list, listName: inputValue } : list
                )
            );
            axios.put(`/api/shop/${id}`, {id: id, listName: inputValue })
                .then(response => console.log(response.data))
                .then(fetchLists)
                .catch(error => console.log(error))
            setEditingListId(null);
            setInputValue(""); // Input-Feld zurücksetzen
        } else {
            setEditingListId(id);
            const list = lists.find(list => list.id === id);
            if (list) setInputValue(list.listName);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };



    return (
        <div>
            <header className="App-header">
                <h1>Shopping Lists</h1>
            </header>
            {lists.map(list => (
                <div key={list.id}>
                    <Link to={`/${list.id}`}>{list.listName}</Link>
                    <p>Done Items: {status[list.id]}</p>
                    <button onClick={() => deleteList(list.id)}>Delete</button>
                    <button onClick={() => handleButtonClick(list.id)}>
                        {editingListId === list.id ? 'Submit' : 'Edit'}
                    </button>

                    {editingListId === list.id && (
                        <input
                            type="text"
                            placeholder="Change Name"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    )}

                </div>
            ))}
            <AddList/>
        </div>
    );


}