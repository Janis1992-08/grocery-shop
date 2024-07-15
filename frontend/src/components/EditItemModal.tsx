import React, { useState, useEffect } from 'react';
import { Item, Unit, Category } from './ShoppingListSchema.ts';


interface EditItemModalProps {
    item: Item;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedItem: Item) => void;
}

export default function EditItemModal(props: Readonly<EditItemModalProps>) {
    const [editedItem, setEditedItem] = useState<Item>(props.item);

    useEffect(() => {
        setEditedItem(props.item);
    }, [props.item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setEditedItem(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }));
        } else if (name === 'unit') {
            const selectedUnit = value as Unit;
            setEditedItem(prev => ({
                ...prev,
                amount: {
                    ...prev.amount,
                    unit: selectedUnit
                }
            }));
        } else {
            setEditedItem(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({
            ...prev,
            amount: {
                ...prev.amount,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onSave(editedItem);
    };

    if (!props.isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={props.onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={editedItem.name} onChange={handleChange} />
                    </label>
                    <label>
                        Done:
                        <input type="checkbox" name="done" checked={editedItem.done} onChange={handleChange} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={editedItem.amount.quantity} onChange={handleAmountChange} />
                    </label>
                    <label>
                        Unit:
                        <select name="unit" value={editedItem.amount.unit} onChange={handleChange}>
                            {Object.values(Unit).map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Category:
                        <select name="category" value={editedItem.category} onChange={handleChange}>
                            {Object.values(Category).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}


