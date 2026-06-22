// src/core/EventManager.ts
import * as vscode from 'vscode';

/**
 * EventManager
 * ------------
 * Centralizes VS Code event subscriptions for the Recall extension.
 * Owns and disposes of all registered listeners.
 */
export class EventManager {
    private _disposables: vscode.Disposable[] = [];

    /**
     * Subscribe to active editor changes (when user switches tabs).
     */
    public onActiveEditorChanged(
        callback: (editor: vscode.TextEditor | undefined) => void
    ): void {
        const disposable = vscode.window.onDidChangeActiveTextEditor(callback);
        this._disposables.push(disposable);
    }

    /**
     * Subscribe to document save events.
     */
    public onDocumentSaved(
        callback: (document: vscode.TextDocument) => void
    ): void {
        const disposable = vscode.workspace.onDidSaveTextDocument(callback);
        this._disposables.push(disposable);
    }

    /**
     * Register all owned disposables into the extension context
     * so they are cleaned up on deactivation.
     */
    public registerWith(context: vscode.ExtensionContext): void {
        context.subscriptions.push(...this._disposables);
    }

    public dispose(): void {
        this._disposables.forEach((d) => d.dispose());
        this._disposables = [];
    }
}