import { Variant } from "./VariantInterfaces";

export interface Product {
    title: string,
    description: string,
    brand: string,
    published: boolean,
    tags: string[],
    imgSrc: string,
    variants: Variant[]
}
