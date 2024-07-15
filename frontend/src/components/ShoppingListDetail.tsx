import ItemComponent from "./ItemComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ShoppingList} from "./ShoppingListSchema.ts";
import AddItem from "./AddItem.tsx";

export default function ShoppingListDetails() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const categories = Array.from(new Set(list?.item.map(item => item.category)));

    useEffect(() => {
        axios.get(`/api/shop/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

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
                setList({ ...list, item: updatedItems })
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    return (
        <>
            <div>
                <h2>{list.listName}</h2>
                {categories.map(category => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <ul>
                            {list.item.filter(item => item.category === category)
                                .map(item => (
                                    <ItemComponent key={item.name} item={item}
                                                   onUpdateDone={(newValue) => handleUpdateDone(list.id, item.name, newValue)}/>
                                ))}
                        </ul>
                    </div>
                ))}
                <AddItem></AddItem>
                <button><Link to={"/"}>Back to Lists overview</Link></button>
            </div>
        </>
    );
}