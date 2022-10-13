export interface Order{
    number: string;
    products: Product[];
    client: Client;
    logs: Log[];
    total: number;
    subTotal: number;
    taxs: number;
    deliveryFee: number;
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
    name: string;
    firstName: string;
    email: string;
    phone: string;
    address: string;
}
export interface Log{
    status: string;
    time: string;
}

