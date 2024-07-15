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

export enum Unit {
    PIECES = 'PIECES',
    KILOGRAM = 'KILOGRAM',
    GRAM = 'GRAM',
    LITER = 'LITER',
    MILLILITERS = 'MILLILITERS'
}

export enum Category {
    MEAT = 'MEAT',
    DAIRY = 'DAIRY',
    BAKERY = 'BAKERY',
    FROZEN = 'FROZEN',
    BEVERAGE = 'BEVERAGE',
    SNACK = 'SNACK',
    ELECTRONICS = 'ELECTRONICS',
    BOOK = 'BOOK',
    CLOTHING = 'CLOTHING',
    TOY = 'TOY',
    JEWELRY = 'JEWELRY',
    HOUSEHOLD = 'HOUSEHOLD',
    COSMETICS = 'COSMETICS',
    SPORT = 'SPORT',
    GIFT = 'GIFT'

}