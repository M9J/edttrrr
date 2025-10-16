import { editor } from "./monaco";
export declare class Cache<T> {
    readonly category: string;
    readonly map: Record<string, CacheRecord<T>>;
    constructor(category: string);
    get(model: editor.ITextModel): T;
    remove(model: editor.ITextModel): void;
    _getCache(_model: editor.ITextModel): T;
}
export interface CacheRecord<T> {
    version: number;
    value: T;
}
