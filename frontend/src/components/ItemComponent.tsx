import {Item } from "./ShoppingListSchema.ts";
import Checkbox from "./Checkbox.tsx";

interface ItemProps {
    item: Item;
    onUpdateDone: (newValue: boolean) => void;
    onDelete: (itemName: string) => void;
    onEdit: (itemName: string, updatedItem: Item) => void;
}

export default function ItemComponent(props:Readonly<ItemProps>) {


    const handleCheckboxChange = (newValue: boolean) => {
        props.onUpdateDone(newValue);
    };

    const handleEditClick = () => {
        props.onEdit(props.item.name, props.item);
    };

    const handleDeleteClick = () => {
        props.onDelete(props.item.name);
    };

    return (
        <div>
            <h4>{props.item.name}</h4>
            <p>
                {props.item.amount.quantity} {props.item.amount.unit} - {props.item.category}
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </p>
            <Checkbox initialValue={props.item.done} onCheckboxChange={handleCheckboxChange}/>
            <p>{props.item.done ? "Checked" : "Not checked"}</p>
        </div>
    );
}