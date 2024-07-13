import ItemComponent from "./ItemComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Item, ShoppingList} from "./ShoppingListSchema.ts";

export default function ShoppingListDetails() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get(`/api/shop/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const fetchShoppingList = () => {
        axios.get(`/api/shop/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    if (!list?.item) {
        return(
            <>
                <p>List not found</p>
                <button><Link to={"/"}>Back to Lists overview</Link></button>
            </>)
    }

    const handleUpdateDone = (listId: string, itemName: string, newValue: boolean) => {
        axios.post(`/api/shop/${listId}/items/${itemName}/updateDone`, { done: newValue })
            .then(() => {
                const updatedItems = list.item.map(item => {
                    if (item.name === itemName) {
                        return { ...item, done: newValue };
                    }
                    return item;
                });
                setItems(updatedItems);
                fetchShoppingList();
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    return (
        <>
            <div>
                <h2>{list.listName}</h2>
                {list.item.map(item => (
                    <ItemComponent key={item.name} item={item} onUpdateDone={(newValue) => handleUpdateDone(list.id, item.name, newValue)}/>
                ))}
            </div>
            <button><Link to={"/"}>Back to Lists overview</Link></button>
        </>
    );
}