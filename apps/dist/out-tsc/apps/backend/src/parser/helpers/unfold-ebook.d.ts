/// <reference types="node" />
import type { UnfoldOutput } from '@/src/parser/parser.dto';
export declare const clearHtmlElement: (element: Element) => Element;
export declare const updatedContent: (text: string) => Promise<string>;
export declare const getEbook: (buffer: Buffer) => Promise<UnfoldOutput>;
