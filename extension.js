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

	let disposable3 = vscode.commands.registerCommand("hello_world.Open Whiteboard", () => {
		let whiteboard = WhiteBoardManager.getManager(); 
		// show current panel or create new panel
		WhiteBoardManager.createNewPanel(context);
	})

	// 0st clipboard
	let disposable4 = vscode.commands.registerCommand('vscodeasy.copytoclipboard0', () => {
		if (copyToAClipboard(0) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 0!")
			treeDataProvider.refresh()
		}
		console.log(Codeasy_Clipboard)
	})

	let disposable5 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard0', (editor, edit) => {
		pasteFromAClipboard(editor, edit, 0)
	})

	// 1nd clipboard
	let disposable7 = vscode.commands.registerCommand('vscodeasy.copytoclipboard1', () => {
		if (copyToAClipboard(1) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 1!")
			treeDataProvider.refresh()
		}
		console.log(Codeasy_Clipboard)
	})

	let disposable8 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard1', (editor, edit) => {
		pasteFromAClipboard(editor, edit, 1)
	})

	// 2nd clipboard
	let disposable9 = vscode.commands.registerCommand('vscodeasy.copytoclipboard2', () => {
		if (copyToAClipboard(2) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 2!")
			treeDataProvider.refresh()
		}
		console.log(Codeasy_Clipboard)
	})
	context.subscriptions.push(disposable9);
	let disposable10 =vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard2', (editor, edit) => {
		pasteFromAClipboard(editor, edit, 2)
	})
	context.subscriptions.push(disposable10);
	// 3rd clipboard
	let disposable11 = vscode.commands.registerCommand('vscodeasy.copytoclipboard3', () => {
		if (copyToAClipboard(3) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 3!")
			treeDataProvider.refresh()
		}
		console.log(Codeasy_Clipboard)
	})
	context.subscriptions.push(disposable11);
	let disposable12 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard3', (editor, edit) => {
		pasteFromAClipboard(editor, edit, 3)
	})
	context.subscriptions.push(disposable12);
	// 4rd clipboard
	context.subscriptions.push(vscode.commands.registerCommand('vscodeasy.copytoclipboard4', () => {
		if (copyToAClipboard(4) == -1){
			vscode.window.showErrorMessage('No highlighted text found!');
		} else{
			vscode.window.showInformationMessage("Copied to clipboard 4!")
			treeDataProvider.refresh()
		}
		console.log(Codeasy_Clipboard)
	}));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard4', (editor, edit) => {
		pasteFromAClipboard(editor, edit, 4)
	}));

	context.subscriptions.push(disposable3)
	context.subscriptions.push(disposable4)
	context.subscriptions.push(disposable5)
	context.subscriptions.push(disposable7); 
	context.subscriptions.push(disposable8);

	// Sidebar tree
	const treeDataProvider = new MyTreeDataProvider();
	context.subscriptions.push(vscode.window.registerTreeDataProvider('mySidebar', treeDataProvider));

	
}

function getWebViewerOptions(extensionUri) {
	return {
		enableScripts: true,
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'controller')]

	}
}

function generateWebViewerHTML(context, webView) {

	let scriptUri = vscode.Uri.joinPath(context.extensionUri, "controller", "main.js"); 
	
	
	let webUri = webView.asWebviewUri(scriptUri);

	vscode.window.showInformationMessage(webUri); 
	console.log(webUri); 
	return `
<!DOCTYPE html>
		<html>
        <head>
            <meta charset="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            		<style>
			#main_canvas {
				
                width: 100%;
                height: 100%;
                background-color: #252526;
				
			}
			
			body {
				padding: 0px;
			}

			html {
				padding 0px; 
			}
			

            #main_wrapper {
                
                width: 100%;
                height: 100%;

            }

			.optionBar {
				width: 100%;
				background-color: #2d2d30;
				padding: 10px; 
			}
		</style>
        </head>
			<body>
			<div class = "optionBar">
			  <fieldgroup id="Select field">
					<label name = "label">Pick Mode</label>
					<input type ="radio" name="boardMode" id="drawButton" value="draw">Draw</input>	
					<input type ="radio" name="boardMode" id="deleteButton" value="delete">Delete</input>	
					</fieldgroup>
			</div>
			<div id="main_wrapper">
				<canvas id = "main_canvas">
				
				</canvas>
			</div>


			<script src="${webUri}"></script>
		</body>
			
		</html>


	`
}

// Class that manages the white board
class WhiteBoardManager {

	// static manager = undefined;
	// static panel = undefined;

	constructor() {
		
		
	}
	
	static createNewPanel(context) {
		

		this.panel = vscode.window.createWebviewPanel("whiteboard", "White Board", vscode.ViewColumn.One, getWebViewerOptions(context.extensionUri));
		this.panel.webview.html = generateWebViewerHTML(context, this.panel.webview); 
		

	}



	static showOldPanel() {
		if (this.panel != undefined) {
			
			this.panel.reveal(vscode.ViewColumn.One); 
		}

	}

	static getManager() {
		if (this.manager == undefined) {
			this.manager = new WhiteBoardManager();
			return this.manager;
		}

		else {
			return this.manager;
		}
	}	
}

class MyTreeDataProvider {
	constructor() {
		this._onDidChangeTreeData = new vscode.EventEmitter();
		this.onDidChangeTreeData = this._onDidChangeTreeData.event;
		this.root = {label: "Codeasy_Clipboard", id: "root"}
		this.children = [];
	}

	refresh() {
		this.children = Codeasy_Clipboard.map((element, index) => {
			return {label: index + ":" + element, id: index.toString()}
		})
		this._onDidChangeTreeData.fire();
	}

    getTreeItem(element) {
		const treeItem = new vscode.TreeItem(element.label);
        treeItem.id = element.id;
		treeItem.iconPath = {
			light: './clipboard.svg',
			dark: './clipboard.svg'
		}
        treeItem.collapsibleState = element.id === this.root.id ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;
        return treeItem;
    }

    getChildren(element) {
		console.log(element)
		if(this.children.length == 0) {
			return [];
		}
		if(!element) return [this.root]
        if (element.id === this.root.id) {
            return this.children;
        }
        return [];
    }
}

// This method is called when your extension is deactivated
function deactivate() {

}

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

function pasteFromAClipboard(editor, edit, clipboard) {
	editor.selections.forEach((selection) => {
		// array starts at 0
		edit.insert(selection.active, Codeasy_Clipboard[clipboard])
	});
}

module.exports = {
	activate,
	deactivate
}
