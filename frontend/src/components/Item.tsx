interface Amount {
    quantity: number;
    unit: string;
}

interface ItemProps {
    item: {
        name: string;
        done: boolean;
        amount: Amount;
        category: string;
    };
}

export default function Item({ item }: ItemProps) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>
                {item.amount.quantity} {item.amount.unit} - {item.category}
            </p>
            <p>{item.done ? "Checked" : "Not checked"}</p>
        </div>
    );
}