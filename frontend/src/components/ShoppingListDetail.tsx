import ItemComponent from "./ItemComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ShoppingList} from "./ShoppingListSchema.ts";




export default function ShoppingListDetails() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);

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


    return (
        <>
            <div>
                <h2>{list.listName}</h2>
            {list.item.map(item => (
                <ItemComponent key={item.name} item={item} />
            ))}
        </div>
        <button><Link to={"/"}>Back to Lists overview</Link></button>
        </>
    );
}