'use strict';

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	// status bar item
	const myCommandId = 'extension.helloWorld';
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.text = `$(fluent-logo) Hello World`;
	myStatusBarItem.show();
	context.subscriptions.push(myStatusBarItem);

	// toast
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage(`👋 Hello World!`);
	});
	context.subscriptions.push(disposable);

}