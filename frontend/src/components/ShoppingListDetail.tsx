import ItemComponent from "./ItemComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Item, ShoppingList} from "./ShoppingListSchema.ts";
import AddItem from "./AddItem.tsx";
import UpdateItemForm from "./UpdateItemForm.tsx";
import Modal from "./Modal.tsx";

export default function ShoppingListDetails() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const categories = Array.from(new Set(list?.item.map(item => item.category)));
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        axios.get(`/api/shop/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!list) {
        return(
            <>
                <p>List not found</p>
                <button><Link to={"/"}>Back to Lists overview</Link></button>
            </>)
    }

    const handleUpdateDone = (listId: string, itemName: string, newValue: boolean) => {
        axios.post(`/api/shop/${listId}/items/${itemName}/updateDone`, { done: newValue })
            .then(() => {
                const updatedItems = list.item.map(item => {
                    if (item.name === itemName) {
                        return { ...item, done: newValue };
                    }
                    return item;
                });
                setList({ ...list, item: updatedItems })
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    const handleDelete = async (itemName: string) => {
        try {
            await axios.delete(`/api/shop/${id}/items/${itemName}`);
            setList(prevList => {
                if (prevList) {
                    return {
                        ...prevList,
                        item: prevList.item.filter(item => item.name !== itemName)
                    };
                }
                return null;
            });
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (itemName: string, updatedItem: Item) => {
        console.log(`Edit item: ${itemName}`);
        console.log('Updated item:', updatedItem);
        setSelectedItem(updatedItem );
        setIsModalVisible(true);
    };

    const handleSave = async (updatedItem: Item) => {
        try {
            const response = await axios.put(`/api/shop/${id}/items/${selectedItem?.name}`, updatedItem);
            setList(response.data);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div>
                <h2>{list.listName}</h2>
                {categories.map(category => (
                    <div key={category}>
                        <h3>{category}</h3>
                <ul>
                    {list.item.filter(item => item.category === category)
                        .map(item => (
                            <ItemComponent key={item.name} item={item} onDelete={handleDelete} onEdit={(itemName, updatedItem) => handleEdit(itemName, updatedItem)}
                                           onUpdateDone={(newValue) => handleUpdateDone(list.id, item.name, newValue)}/>
                        ))}
                </ul>
                {selectedItem && (
                    <Modal isVisible={isModalVisible} onClose={closeModal}>
                        <UpdateItemForm item={selectedItem} onSave={handleSave} />
                    </Modal>
                )}
                    </div>
                ))}
            </div>
            <AddItem></AddItem>
            <button><Link to={"/"}>Back to Lists overview</Link></button>
        </>
    );
}