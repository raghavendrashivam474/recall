// src/core/ContextManager.ts
import * as vscode from 'vscode';
import { ActiveFileInfo } from '../types';

/**
 * ContextManager
 * --------------
 * Tracks the currently active file in the editor and provides
 * a clean snapshot of its metadata for the rest of the extension.
 */
export class ContextManager {
    private _currentFile: ActiveFileInfo | undefined;

    public getCurrentFile(): ActiveFileInfo | undefined {
        return this._currentFile;
    }

    /**
     * Build an ActiveFileInfo snapshot from a VS Code editor.
     */
    public updateFromEditor(editor: vscode.TextEditor | undefined): ActiveFileInfo | undefined {
        if (!editor) {
            this._currentFile = undefined;
            return undefined;
        }

        const document = editor.document;

        // Skip non-file documents (Output, Settings, etc.)
        if (document.uri.scheme !== 'file') {
            this._currentFile = undefined;
            return undefined;
        }

        const filePath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const relativePath = workspaceFolder
            ? vscode.workspace.asRelativePath(document.uri, false)
            : filePath;

        const fileName = filePath.split(/[\\/]/).pop() || 'untitled';

        this._currentFile = {
            fileName,
            filePath,
            relativePath,
            languageId: document.languageId,
            lineCount: document.lineCount,
        };

        return this._currentFile;
    }

    public clear(): void {
        this._currentFile = undefined;
    }
}