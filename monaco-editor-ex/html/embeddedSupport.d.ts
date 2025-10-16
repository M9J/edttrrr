import { LanguageService, Range, TextDocument } from 'vscode-html-languageservice';
import { Position } from '../monaco';
import { LanguageRange } from './languageRegion';
export interface HTMLDocumentRegions {
    versionId: number;
    getEmbeddedDocument(languageId: string, ignoreAttributeValues?: boolean): TextDocument;
    getLanguageRanges(range: Range): LanguageRange[];
    getLanguageAtPosition(position: Position): string | undefined;
    getRegionAtPosition(position: Position): EmbeddedRegion | undefined;
    getLanguagesInDocument(): string[];
    getImportedScripts(): string[];
}
export declare const CSS_STYLE_RULE = "__";
export interface EmbeddedRegion {
    languageId: string | undefined;
    start: number;
    end: number;
    type?: "tag" | "attribute" | "content";
    appendContent?: (value: string) => string;
}
export declare function getDocumentRegions(languageService: LanguageService, document: TextDocument): HTMLDocumentRegions;
