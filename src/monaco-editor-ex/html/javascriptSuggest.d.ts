import type { Uri } from "../monaco";
import { EmbeddedRegion } from "./embeddedSupport";
type SuggestFilter = (uri: Uri, regin: EmbeddedRegion, suggestions: any[]) => {
    suggestions: any[];
    snippet: boolean;
};
export declare function useJavascriptSuggestInHtml(): void;
export declare function useJavascriptInHtmlSuggestFilter(filter: SuggestFilter): void;
export {};
