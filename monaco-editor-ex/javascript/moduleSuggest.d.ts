import { Position, editor, languages } from "../monaco";
interface SuggestContext {
    uri: string;
    prefix: string;
    relative: boolean;
}
type Callback = (context: SuggestContext) => Promise<string[]> | string[];
interface Options {
    callback?: Callback;
    triggerCharacters: string[];
}
export type Suggestion = Options | Callback | string[] | undefined;
declare function dispose(): void;
export declare function useJavascriptModuleSuggest(options?: Suggestion): typeof dispose;
export declare function getModuleSuggest(model: editor.ITextModel, position: Position, suggestion: Suggestion): Promise<{
    suggestions: languages.CompletionItem[];
    incomplete: boolean;
} | undefined>;
export declare function getBasePath(uri: string, relative: string): {
    basePath: string;
    relative: string;
};
export {};
