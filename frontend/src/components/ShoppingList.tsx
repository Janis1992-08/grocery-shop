import {useEffect, useState} from "react";
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

    return (
        <div>
            {lists.map(list => (
                <div key={list.id}>
                    <h2>{list.listName}</h2>

                </div>
            ))}
            <AddList></AddList>
        </div>
    );


}