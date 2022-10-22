export interface Order{
    _id: string;
    number: string;
    products: Product[];
    client: Client;
    logs: Log[];
    total: number;
    subTotal: number;
    taxs: number;
    deliveryFee: number;
    paymentMethod: string;
}

export interface Product{
    _id: string;
    title: string;
    imgSrc: string;
    quantity: number;
    vendor: string;
    price: number;
}

export interface Client{
    _id: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    address: string;
}
export interface Log{
    status: string;
    time: string;
}
