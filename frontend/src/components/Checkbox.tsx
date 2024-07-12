import {useState} from "react";
import axios from "axios";

interface CheckboxProps {
    initialValue: boolean;
}

export default function Checkbox(props:Readonly<CheckboxProps>) {
    const [checked, setChecked] = useState(props.initialValue);

    const updateValue = async () => {
        setChecked(!checked);
        try {
            await axios.post(`api/shop`, {
                value: !checked,
            });
        } catch (error) {
            console.error(`Error updating value:`, error);
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={updateValue}
            />
        </div>
    );
}