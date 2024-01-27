// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

let Codeasy_Clipboard = []

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('vscodeasy.copytoclipboard0', () => {
		if(copyToAClipboard(0) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 0!")
		}
		console.log(Codeasy_Clipboard)
	})

	let disposable2 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard0', (editor, edit) => {
		editor.selections.forEach((selection) => {
			// array starts at 0
			edit.insert(selection.active, Codeasy_Clipboard[0])
		});
	})

	context.subscriptions.push(disposable)
	context.subscriptions.push(disposable2)
}

// This method is called when your extension is deactivated
function deactivate() {}

function readHighlighted() {
	// https://stackoverflow.com/questions/73043106/how-to-get-highlighted-text-from-vscode-extension-api
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	if (selection && !selection.isEmpty){
		const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    	const highlighted = editor.document.getText(selectionRange);
		console.log(highlighted)
		return(highlighted)
	} else {
		return(null)
	}
}

function copyToAClipboard(clipboard) {
	let clipboard_text = readHighlighted()
	if(clipboard_text == null) {
		console.log("No highlighted text!!")
		return -1;
	}
	Codeasy_Clipboard[clipboard] = clipboard_text
}

function pasteFromAClipboard(clipboard) {

}

module.exports = {
	activate,
	deactivate
}
