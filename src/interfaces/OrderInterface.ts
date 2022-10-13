export interface Order{
    _id: string; //TODO: HANDLE ID OF ORDER, WE SHOULD CHECK THE LATEST ORDER AND INCREMENT IT
    products: Product[];
    client: Client;
    logs: Log[];
    total: number;
    subTotal: number;
    tax: number;
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

