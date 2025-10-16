import { Module } from "./moduleState";
type LoaderCallback = (path: string) => Promise<string> | string | undefined;
export interface LoaderOptions {
    onlyEmitEndsWithExtensions?: boolean;
    callback?: LoaderCallback;
}
type ModuleLoader = LoaderOptions | LoaderCallback | undefined;
export declare function resolveModules(module: Module): void;
declare function dispose(): void;
export declare function useModuleResolve(options: ModuleLoader): typeof dispose;
export {};
