/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window } from 'vscode';
import { icon } from '../const';

/**
 * Shows a pick list using window.showQuickPick().
 */
export async function showQuickPick() {
	let i = 0;
	const result = await window.showQuickPick(
		[
			{ label: '$(star-full) Python 3.8.10  64-bit (‘base’: conda)', description: 'Recommended', detail: '~/opt/anaconda3/bin/python', alwaysShow: false },
			{ label: 'Python 3.8.8  64-bit (‘playground’: conda)', detail: '~/opt/anaconda3/envs/playground/bin/python' },
			{ label: 'Python 3.9.5 64-bit', detail: '/opt/homebrew/bin/python3' },
			{ label: 'Python 3.8.2 64-bit', detail: '/usr/bin/python3' },
			{ label: 'Python 2.7.16 64-bit', detail: '/usr/bin/python' },
			{ label: 'Python 2.7 64-bit', detail: '/usr/bin/python2' },
			{ label: '$(gear) Use default Python interpreter path', alwaysShow: false },
			{ label: '$(add) Enter interpreter path...', alwaysShow: false },
		], {
			placeHolder: 'Select an interpreter',
		onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
	});

	window.showInformationMessage(`Got: ${result}`);
}

/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBox() {
	const result = await window.showInputBox({
		value: 'abcdef',
		valueSelection: [2, 4],
		placeHolder: 'For example: fedcba. But not: 123',
		validateInput: text => {
			window.showInformationMessage(`Validating: ${text}`);
			return text === '123' ? 'Not 123!' : null;
		}
	});
	window.showInformationMessage(`Got: ${result}`);
}
