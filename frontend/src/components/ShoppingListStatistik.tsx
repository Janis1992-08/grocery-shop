import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShoppingListStatistik() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchShoppingList() {
            try {
                const response = await axios.get("/api/shop/stats");
                setList(response.data);
            } catch (error) {
                console.error("Error fetching ShoppingLists:", error);
            }
        }

        fetchShoppingList();
    }, []);

    return (
        <div>
            <h1>ToDo Listen</h1>
            {list.map(liste => (
                <div key={liste.id}>
                    <h2>{liste.name}</h2>
                    <p>Done Items: {liste.completed}/{liste.total}</p>
                </div>
            ))}
        </div>
    );
}
