// src/sidebar/SidebarProvider.ts
import * as vscode from 'vscode';
import { ActiveFileInfo, RecallStatus } from '../types';

/**
 * SidebarProvider
 * ---------------
 * Manages the Recall webview sidebar.
 * Renders the UI and handles communication between the extension and the webview.
 */
export class SidebarProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'recall.mainView';

    private _view?: vscode.WebviewView;
    private _currentFile?: ActiveFileInfo;
    private _status: RecallStatus = 'ready';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    /**
     * Called by VS Code when the sidebar view becomes visible.
     */
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ): void {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview();

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.type) {
                case 'ready':
                    this._sendCurrentState();
                    break;
                case 'refresh':
                    vscode.commands.executeCommand('recall.refresh');
                    break;
            }
        });
    }

    /**
     * Update the sidebar with new active file info.
     */
    public updateActiveFile(fileInfo: ActiveFileInfo | undefined): void {
        this._currentFile = fileInfo;
        this._sendCurrentState();
    }

    /**
     * Update the Recall status.
     */
    public updateStatus(status: RecallStatus): void {
        this._status = status;
        this._sendCurrentState();
    }

    /**
     * Send the current state to the webview.
     */
    private _sendCurrentState(): void {
        if (!this._view) {
            return;
        }
        this._view.webview.postMessage({
            type: 'updateState',
            payload: {
                status: this._status,
                file: this._currentFile,
            },
        });
    }

    /**
     * Build the HTML content for the webview.
     */
    private _getHtmlForWebview(): string {
        return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recall</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-sideBar-background);
            padding: 16px;
            margin: 0;
            font-size: 13px;
            line-height: 1.5;
        }

        .header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
        }

        .logo {
            font-size: 20px;
        }

        .title {
            font-size: 18px;
            font-weight: 600;
            color: var(--vscode-foreground);
        }

        .tagline {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 18px;
            padding: 12px;
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
        }

        .section-title {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--vscode-descriptionForeground);
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .file-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--vscode-textLink-foreground);
            margin-bottom: 4px;
            word-break: break-all;
        }

        .file-path {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            word-break: break-all;
            font-family: var(--vscode-editor-font-family);
        }

        .empty-state {
            color: var(--vscode-descriptionForeground);
            font-style: italic;
            text-align: center;
            padding: 12px 0;
        }

        .status-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 500;
        }

        .status-ready {
            background-color: rgba(40, 167, 69, 0.2);
            color: #4ade80;
        }

        .status-analyzing {
            background-color: rgba(255, 193, 7, 0.2);
            color: #facc15;
        }

        .status-idle {
            background-color: rgba(108, 117, 125, 0.2);
            color: #94a3b8;
        }

        .meta-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            margin-top: 4px;
        }

        .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid var(--vscode-panel-border);
            font-size: 10px;
            color: var(--vscode-descriptionForeground);
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <span class="logo">🧠</span>
        <span class="title">Recall</span>
    </div>
    <div class="tagline">The Memory Layer for Software Projects</div>

    <div class="section">
        <div class="section-title">Status</div>
        <span id="status" class="status-badge status-ready">Ready</span>
    </div>

    <div class="section">
        <div class="section-title">Current File</div>
        <div id="file-content">
            <div class="empty-state">No file selected.</div>
        </div>
    </div>

    <div class="footer">
        Recall v0.0.1 · Phase 2 · Foundation UI
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        // Tell the extension we're ready
        vscode.postMessage({ type: 'ready' });

        // Listen for state updates from extension
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === 'updateState') {
                renderState(message.payload);
            }
        });

        function renderState(state) {
            renderStatus(state.status);
            renderFile(state.file);
        }

        function renderStatus(status) {
            const el = document.getElementById('status');
            el.className = 'status-badge status-' + status;
            el.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }

        function renderFile(file) {
            const container = document.getElementById('file-content');
            if (!file) {
                container.innerHTML = '<div class="empty-state">No file selected.</div>';
                return;
            }
            container.innerHTML = \`
                <div class="file-name">\${escapeHtml(file.fileName)}</div>
                <div class="file-path">\${escapeHtml(file.relativePath)}</div>
                <div class="meta-row">
                    <span>Language: \${escapeHtml(file.languageId)}</span>
                    <span>\${file.lineCount} lines</span>
                </div>
            \`;
        }

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
    </script>
</body>
</html>`;
    }
}