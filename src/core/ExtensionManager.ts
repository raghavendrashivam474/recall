// src/core/ExtensionManager.ts
import * as vscode from 'vscode';
import { ContextManager } from './ContextManager';
import { EventManager } from './EventManager';
import { SidebarProvider } from '../sidebar/SidebarProvider';

/**
 * ExtensionManager
 * ----------------
 * The central orchestrator for the Recall extension.
 * Wires together the sidebar, context tracking, and event listeners.
 */
export class ExtensionManager {
    private readonly _contextManager: ContextManager;
    private readonly _eventManager: EventManager;
    private readonly _sidebarProvider: SidebarProvider;

    constructor(extensionUri: vscode.Uri) {
        this._contextManager = new ContextManager();
        this._eventManager = new EventManager();
        this._sidebarProvider = new SidebarProvider(extensionUri);
    }

    public get sidebarProvider(): SidebarProvider {
        return this._sidebarProvider;
    }

    /**
     * Activate the extension: register all events and push the initial state.
     */
    public activate(context: vscode.ExtensionContext): void {
        // Listen for editor changes
        this._eventManager.onActiveEditorChanged((editor) => {
            this._handleEditorChange(editor);
        });

        // Register disposables with VS Code
        this._eventManager.registerWith(context);

        // Push the initial state (whatever editor is currently open)
        this._handleEditorChange(vscode.window.activeTextEditor);
    }

    private _handleEditorChange(editor: vscode.TextEditor | undefined): void {
        const fileInfo = this._contextManager.updateFromEditor(editor);
        this._sidebarProvider.updateActiveFile(fileInfo);
    }

    public refresh(): void {
        this._handleEditorChange(vscode.window.activeTextEditor);
    }

    public dispose(): void {
        this._eventManager.dispose();
    }
}