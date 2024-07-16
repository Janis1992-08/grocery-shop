import ItemComponent from "./ItemComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ShoppingList} from "./ShoppingListSchema.ts";
import AddItem from "./AddItem.tsx";

export default function ShoppingListDetails() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [showCompleted, setShowCompleted] = useState(false);
    const categories = Array.from(new Set(list?.item.map(item => item.category)));

    useEffect(() => {
        axios.get(`/api/shop/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id, list]);

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

    const setCheckboxesToFalse = () => {
        axios.put(`/api/shop/${id}/uncheck`)
            .then(() => window.location.reload());
    };

    return (
        <>
            <div>
                <h2>{list.listName}</h2>
                {categories.map(category => (
                    <div key={category}>
                        <h3>{list.item.filter(item => item.category === category && !item.done)
                            .map(item => item.category)}</h3>
                        <ul>
                            {list.item.filter(item => item.category === category && !item.done)
                                .map(item => (
                                    <ItemComponent key={item.name} item={item}
                                                   onUpdateDone={(newValue) => handleUpdateDone(list.id, item.name, newValue)}/>
                                ))}
                        </ul>
                    </div>
                ))}

                <button onClick={() => setCheckboxesToFalse()}>Uncheck all</button>

                <button onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? `Hide done tasks` : `Show done tasks`}
                </button>
                {categories.map(category => (
                    <div key={category}>
                        {showCompleted && (
                            <h3>
                                {list.item.filter(item => item.category === category && item.done)
                                    .map(item => item.category)}
                            </h3>
                        )}
                        {showCompleted && (
                            <ul>
                                {list.item.filter(item => item.category === category && item.done)
                                    .map(item => (
                                        <ItemComponent key={item.name} item={item}
                                                       onUpdateDone={(newValue) => handleUpdateDone(list.id, item.name, newValue)}/>
                                    ))}
                            </ul>
                        )}
                    </div>
                ))}

                <AddItem></AddItem>
                <button><Link to={"/"}>Back to Lists overview</Link></button>
            </div>
        </>
    );
}