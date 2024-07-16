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

export const categories = [
    { value: "MEAT", label: "Meat" },
    { value: "DAIRY", label: "Dairy" },
    { value: "BAKERY", label: "Bakery" },
    { value: "FROZEN", label: "Frozen" },
    { value: "BEVERAGE", label: "Beverage" },
    { value: "SNACK", label: "Snack" },
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "BOOK", label: "Book" },
    { value: "CLOTHING", label: "Clothing" },
    { value: "TOY", label: "Toy" },
    { value: "JEWELRY", label: "Jewelry" },
    { value: "HOUSEHOLD", label: "Household" },
    { value: "COSMETICS", label: "Cosmetics" },
    { value: "SPORT", label: "Sport" },
    { value: "GIFT", label: "Gift" },
    { value: "VEGETABLES", label: "Vegetables" },
    { value: "FRUITS", label: "Fruits" },
    { value: "OTHER", label: "Other" }
];

export const units = [
    { value: "PIECES", label: "Pieces" },
    { value: "KILOGRAM", label: "Kilogram" },
    { value: "GRAM", label: "Gram" },
    { value: "LITER", label: "Liter" },
    { value: "MILLILITERS", label: "Milliliters" }
];
