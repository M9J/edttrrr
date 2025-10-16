import type { parse } from "@babel/parser";
export type AstTree = ReturnType<typeof parse>;
export interface AstNode {
    type: string;
    start: number;
    end: number;
}
export interface Source {
    value: string;
    end: number;
    start: number;
}
export interface StringLiteral extends AstNode {
    value: string;
}
export declare function getModulesFromAst(ast: AstTree): Source[];
export declare function getAstNode(node: any, types: string[]): AstNode[];
export declare function getNodePaths(node: any, start: number, end: number): AstNode[];
export declare function getModuleByOffset(ast: AstTree | undefined, offset: number): StringLiteral | undefined;
