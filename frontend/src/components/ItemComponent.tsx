import {Item } from "./ShoppingListSchema.ts";
import Checkbox from "./Checkbox.tsx";

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
            <Checkbox initialValue={item.done} />
            <p>{item.done ? "Checked" : "Not checked"}</p>
        </div>
    );
}