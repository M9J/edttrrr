import { languages } from "../monaco";
export declare function htmlFormat(html: string, options?: languages.FormattingOptions): Promise<string | undefined>;
export declare function useHtmlFormatting(): void;
