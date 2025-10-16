import { editor } from "../monaco";
import { HTMLDocumentRegions } from "./embeddedSupport";
import { Cache } from "../cache";
export declare class HtmlRegionCache extends Cache<HTMLDocumentRegions> {
    _getCache(model: editor.ITextModel): HTMLDocumentRegions;
}
export declare const htmlRegionCache: HtmlRegionCache;
