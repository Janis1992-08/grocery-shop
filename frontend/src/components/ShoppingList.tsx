import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import Item from "./Item";
import AddList from "./AddList.tsx";

interface Amount {
    quantity: number;
    unit: string;
}

interface Item {
    name: string;
    done: boolean;
    amount: Amount;
    category: string;
}

interface ShoppingList {
    id: string;
    listName: string;
    item: Item[];
}

export default function ShoppingList() {
    const [lists, setLists] = useState<ShoppingList[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [editingListId, setEditingListId] = useState<string | null>(null);
    const fetchLists = () => {
        axios.get("/api/shop")
            .then(response => {
                setLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(fetchLists, [])

    if(!lists) {
        return <p>Loading...</p>
    }

    function deleteList(id:string) {

        axios.delete("/api/shop/"+id)
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
            axios.put("/api/shop/" + id , {id: id, listName: inputValue })
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
            {lists.map(list => (
                <div key={list.id}>
                    <h2>{list.listName}</h2>
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