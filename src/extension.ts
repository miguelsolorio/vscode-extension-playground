'use strict';

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	// toast
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage(`👋 Hello World!`);
	});
	context.subscriptions.push(disposable);
}