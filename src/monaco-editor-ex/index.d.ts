import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { Suggestion } from "./javascript";
export { useUnocss, htmlFormat, useDirective, useContentRegin, useJavascriptInHtmlSuggestFilter } from "./html";
export { useModuleResolve } from "./javascript";
export declare function useMonacoEx(monacoInstance: typeof Monaco): void;
export declare function useModuleSuggest(options?: Suggestion): void;
export declare function removeAllModules(): void;
