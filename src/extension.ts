'use strict';

import * as vscode from 'vscode';
import { CodelensProvider } from './CodelensProvider';
import { NodeDependenciesProvider } from './treeView';
import { showQuickPick, showInputBox } from './quick-pick/basicInput';
import { multiStepInput } from './quick-pick/multiStepInput';
import { quickOpen } from './quick-pick/quickOpen';
import { icon } from './const';

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	// status bar item
	const myCommandId = 'extension.helloWorld';
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.text = `$(${icon})`;
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


	// quick open
	context.subscriptions.push(vscode.commands.registerCommand('extension.quickInput', async () => {
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
			showQuickPick,
			showInputBox,
			multiStepInput,
			quickOpen,
		};
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
					.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));
}