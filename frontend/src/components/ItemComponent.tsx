import {Item } from "./ShoppingListSchema.ts";
import Checkbox from "./Checkbox.tsx";

interface ItemProps {
    item: Item;
    onUpdateDone: (newValue: boolean) => void;
}

export default function ItemComponent(props:Readonly<ItemProps>) {

    const handleCheckboxChange = (newValue: boolean) => {
        props.onUpdateDone(newValue);
    };

    return (
        <div>
            <h3>{props.item.name}</h3>
            <p>
                {props.item.amount.quantity} {props.item.amount.unit} - {props.item.category}
            </p>
            <Checkbox initialValue={props.item.done} onCheckboxChange={handleCheckboxChange} />
            <p>{props.item.done ? "Checked" : "Not checked"}</p>
        </div>
    );
}