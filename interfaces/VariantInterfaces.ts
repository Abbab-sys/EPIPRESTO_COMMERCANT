import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface Variant {
    variantTitle: string,
    price: Float,
    sku: string,
    taxable: boolean,
    imgSrc: string,
    byWeight:boolean,
    availableForSale:boolean,
    stock: number,
}
