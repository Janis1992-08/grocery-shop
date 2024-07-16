import React, { useState, useEffect } from 'react';
import { categories, Item, units } from './ShoppingListSchema';
import './FormAddItem.css';

interface EditItemModalProps {
    item: Item;
    onSave: (updatedItem: Item) => void;
}

export default function UpdateItemForm({ item, onSave }: EditItemModalProps) {
    const [editedItem, setEditedItem] = useState<Item>(item);

    useEffect(() => {
        setEditedItem(item);
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setEditedItem(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }));
        } else if (name === 'unit') {
            setEditedItem(prev => ({
                ...prev,
                amount: {
                    ...prev.amount,
                    unit: value
                }
            }));
        } else if (name === 'category') {
            setEditedItem(prev => ({
                ...prev,
                [name]: value
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
        onSave(editedItem);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
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
                <select name="unit" value={editedItem.amount.unit} onChange={handleChange} required>
                    {units.map(unit => (
                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                </select>
            </label>
            <label>
                Category:
                <select name="category" value={editedItem.category} onChange={handleChange} required>
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Save</button>
        </form>
    );
}
