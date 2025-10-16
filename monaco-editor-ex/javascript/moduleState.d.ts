import type { AstTree } from "./ast";
export declare enum ModuleState {
    create = 0,
    loading = 1,
    success = 2,
    error = 3
}
export declare class Module {
    readonly uri: string;
    private _content?;
    state: ModuleState;
    ast?: AstTree;
    loadDependenciesToken: any;
    constructor(uri: string);
    get content(): string | undefined;
    set content(value: string | undefined);
    parseAst(content: string): import("@babel/parser").ParseResult<import("@babel/types").File> | undefined;
    loadDependencies(action: (module: Module) => void): void;
}
export declare function createModule(uri: string, content?: string): Module;
export declare function getModule(uri: string): Module;
export declare function removeModule(uri: string): void;
export declare function removeModules(): void;
