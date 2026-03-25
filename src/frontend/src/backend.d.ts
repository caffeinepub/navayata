export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
}
export interface Product {
    id: string;
    contents: string;
    name: string;
    image: ExternalBlob;
    price: bigint;
}
export interface backendInterface {
    addProduct(name: string, price: bigint, contents: string, image: ExternalBlob): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getFee(): Promise<bigint>;
    getProductById(productId: string): Promise<Product | null>;
    modifyProduct(product: Product): Promise<void>;
    removeProduct(id: string): Promise<Product>;
    setFee(newFee: bigint): Promise<void>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
