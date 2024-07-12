import {ChangeEvent, useState} from "react";

interface CheckboxProps {
    initialValue: boolean;
    onCheckboxChange: (newValue: boolean) => void;
}

export default function Checkbox(props:Readonly<CheckboxProps>) {
    const [checked, setChecked] = useState(props.initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setChecked(newValue);
        props.onCheckboxChange(newValue);
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
        </div>
    );
}