// src/types/index.ts

/**
 * Information about the currently active file in the editor.
 */
export interface ActiveFileInfo {
    fileName: string;
    filePath: string;
    relativePath: string;
    languageId: string;
    lineCount: number;
}

/**
 * Status of the Recall extension.
 */
export type RecallStatus = 'ready' | 'analyzing' | 'idle' | 'error';

/**
 * Message structure for communication between webview and extension.
 */
export interface WebviewMessage {
    type: string;
    payload?: any;
}