import { SyntheticEvent } from "react";
import { useParams } from 'react-router-dom';
import './FormAddItem.css';
import axios from "axios";

export default function FormAddItem() {
    const { id } = useParams<{ id: string }>();


    const formHandler = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        axios.post(`/api/shop/${id}/items`, {
            name: formData.get('item'),
            amount: {
                quantity: formData.get('quantity'),
                unit: formData.get('unit')
            }
        })
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <form className="form" onSubmit={formHandler}>
            <label>
                <p>Item:</p>
                <input type="text" name="item" required={true}/>
            </label>
            <label>
                <p>Quantity:</p>
                <input type="number" name="quantity" min={0} required={true}/>
            </label>
            <label>
                <p>Unit:</p>
                <select name="unit" required={true}>
                    <option value={"PIECES"}>Pieces</option>
                    <option value={"KILOGRAM"}>Kilogram</option>
                    <option value={"GRAM"}>Gram</option>
                    <option value={"LITER"}>Liter</option>
                    <option value={"MILLILITERS"}>Milliliters</option>
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}