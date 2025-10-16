import { Uri, languages, editor } from "../monaco";
import type { SymbolDisplayPart } from "typescript";
export declare function getJavascriptWorker(uri: Uri): Promise<languages.typescript.TypeScriptWorker>;
export declare function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined): string;
export declare function trimPathPrefix(path: string): string;
export declare function trimScriptPathExtension(path: string): string;
export declare function getModuleKey(value: string | Uri, source?: string): string | undefined;
export declare function isRelativeOrAbsolute(path: string): boolean;
interface TextEdit {
    newText: string;
    span: {
        start: number;
        length: number;
    };
}
export declare function toTextEdit(model: editor.IModel, textEdit: TextEdit): languages.TextEdit;
export declare function sameUris(uri: string): string[];
export {};
