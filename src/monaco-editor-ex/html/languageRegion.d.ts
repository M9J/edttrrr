import { Scanner, TextDocument, Range } from "vscode-html-languageservice";
import { EmbeddedRegion } from "./embeddedSupport";
export interface LanguageRange extends Range {
    languageId: string | undefined;
    type?: "tag" | "attribute" | "content";
}
export interface ContentRegin {
    matcher: ((value: string) => {
        start: number;
        end: number;
    }[]);
    language: 'css' | 'javascript';
}
export interface Directive {
    matcher: string | RegExp;
    language: 'css' | 'javascript';
    appendContent?: (value: string) => string;
}
export declare function useDirective(directives?: Directive[]): void;
export declare function useContentRegin(regin?: ContentRegin[]): void;
export declare function getDirectiveRegion(attributeName: string, scanner: Scanner, document: TextDocument): EmbeddedRegion | undefined;
export declare function getContentRegions(scanner: Scanner, document: TextDocument): EmbeddedRegion[] | undefined;
