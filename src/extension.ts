'use strict';

import * as vscode from 'vscode';
import { CodelensProvider } from './CodelensProvider';
import { NodeDependenciesProvider } from './treeView';

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

	// codelens
	const codelensProvider = new CodelensProvider();

	vscode.languages.registerCodeLensProvider("*", codelensProvider);

	vscode.commands.registerCommand("codelens-sample.enableCodeLens", () => {
		vscode.workspace.getConfiguration("codelens-sample").update("enableCodeLens", true, true);
	});

	vscode.commands.registerCommand("codelens-sample.disableCodeLens", () => {
		vscode.workspace.getConfiguration("codelens-sample").update("enableCodeLens", false, true);
	});

	vscode.commands.registerCommand("codelens-sample.codelensAction", (args: any) => {
		vscode.window.showInformationMessage(`CodeLens action clicked with args=${args}`);
	});

	// tree view
	const fluentSampleViewProvider = new NodeDependenciesProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('fluentSampleView', fluentSampleViewProvider);

	vscode.window.createTreeView('fluentSampleView', {
		treeDataProvider: new NodeDependenciesProvider(vscode.workspace.rootPath)
	});

}