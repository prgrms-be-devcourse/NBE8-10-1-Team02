
export type OrderItem = {
    id: number;
    itemId: number;
    itemName: string;
    price: number;
    quantity: number;
};

export type Order = {
    id: number;
    createDate: string;
    email: string;
    items: OrderItem[];
};