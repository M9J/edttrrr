import type { languages, Range } from "../../monaco";
type CompletionItemLabel = languages.CompletionItemLabel;
interface Snippet {
    name: string;
    prefix: string;
    body: string | string[];
    description: string;
}
declare class SnippetCompletion implements languages.CompletionItem {
    readonly snippet: Snippet;
    label: CompletionItemLabel;
    insertText: string;
    range: Range | {
        insert: Range;
        replace: Range;
    };
    kind: languages.CompletionItemKind;
    insertTextRules: languages.CompletionItemInsertTextRule;
    detail?: string;
    constructor(snippet: Snippet, range: Range | {
        insert: Range;
        replace: Range;
    });
}
export declare const snippetSuggestions: () => {
    suggestions: SnippetCompletion[];
};
export declare function useJavascriptSnippet(): void;
export {};
