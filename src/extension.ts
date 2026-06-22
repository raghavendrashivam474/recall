// src/extension.ts
import * as vscode from 'vscode';
import { ExtensionManager } from './core/ExtensionManager';
import { SidebarProvider } from './sidebar/SidebarProvider';

let extensionManager: ExtensionManager | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Recall extension is now active.');

    // Initialize the extension manager
    extensionManager = new ExtensionManager(context.extensionUri);

    // Register the sidebar webview provider
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SidebarProvider.viewType,
            extensionManager.sidebarProvider
        )
    );

    // Activate event listeners and push initial state
    extensionManager.activate(context);

    // Register Refresh command
    context.subscriptions.push(
        vscode.commands.registerCommand('recall.refresh', () => {
            extensionManager?.refresh();
            vscode.window.showInformationMessage('Recall: Refreshed.');
        })
    );

    // Register Show Info command
    context.subscriptions.push(
        vscode.commands.registerCommand('recall.showInfo', () => {
            vscode.window.showInformationMessage(
                'Recall v0.0.1 — The Memory Layer for Software Projects.'
            );
        })
    );
}

export function deactivate() {
    console.log('Recall extension deactivated.');
    extensionManager?.dispose();
    extensionManager = undefined;
}