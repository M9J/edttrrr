import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
export type { IDisposable, IPosition, CancellationToken, editor, IEvent, IMarkdownString, IRange, languages, Position, Range, Uri } from "monaco-editor/esm/vs/editor/editor.api";
export declare let monaco: typeof Monaco;
export declare function tryInitMonaco(monacoInstance: typeof Monaco): boolean;
