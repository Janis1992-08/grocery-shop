import {Item } from "./ShoppingListSchema.ts";

interface ItemProps {
    item: Item;
}

export default function ItemComponent({ item }: ItemProps) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>
                {item.amount.quantity} {item.amount.unit} - {item.category}
            </p>
            <p>{item.done ? "Checked" : "Not checked"}</p>
        </div>
    );
}