import { editor } from "../monaco";
import { Cache } from "../cache";
import { Stylesheet } from "vscode-css-languageservice";
export declare class StylesheetCache extends Cache<Stylesheet> {
    _getCache(model: editor.ITextModel): Stylesheet;
}
export declare const stylesheetCache: StylesheetCache;
