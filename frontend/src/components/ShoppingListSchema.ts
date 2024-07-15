export interface Amount {
    quantity: number;
    unit: string;
}

export interface Item {
    name: string;
    done: boolean;
    amount: Amount;
    category: string;
}

export interface ShoppingList {
    id: string;
    listName: string;
    item: Item[];
}
export interface Status {
    [key: string]: string;
}