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
	let disposable = vscode.commands.registerCommand('hello-world.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		console.log("Did stuff here")
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from hello_world!');
		
	});

	let disposable2 = vscode.commands.registerCommand('hello_world.worldHello', () => {
		console.log("hello mom")

		vscode.window.showInformationMessage("World Hello")
	})

	let disposable3 = vscode.commands.registerCommand("hello_world.Open Whiteboard", () => {

		
		let whiteboard = WhiteBoardManager.getManager(); 
		// show current panel or create new panel
		WhiteBoardManager.createNewPanel(context);
		
/*
		else {
			WhiteBoardManager.showOldPanel();
		}
*/

		let disposable = vscode.commands.registerCommand('vscodeasy.copytoclipboard0', () => {
			if (copyToAClipboard(0) == -1){
				vscode.window.showErrorMessage('No highlighted text found!');
			} else{
				vscode.window.showInformationMessage("Copied to clipboard 0!")
				treeDataProvider.refresh()
			}
			console.log(Codeasy_Clipboard)
		})

		let disposable2 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard0', (editor, edit) => {
			pasteFromAClipboard(editor, edit, 0)
		})

		let disposable3 = vscode.commands.registerCommand('vscodeasy.openWebview', function () {
			const panel = vscode.window.createWebviewPanel(
				'webview', // Identifies the type of the webview. Used internally
				'Webview Title', // Title of the panel displayed to the user
				vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				{} // Webview options. More on these later.
			);

			panel.webview.html = getWebviewContent();
		});

		let disposable4 = vscode.commands.registerCommand('vscodeasy.copytoclipboard1', () => {
			if (copyToAClipboard(1) == -1){
				vscode.window.showErrorMessage('No highlighted text found!');
			} else{
				vscode.window.showInformationMessage("Copied to clipboard 1!")
				treeDataProvider.refresh()
			}
			console.log(Codeasy_Clipboard)
		})

		let disposable5 = vscode.commands.registerTextEditorCommand('vscodeasy.pastefromclipboard1', (editor, edit) => {
			pasteFromAClipboard(editor, edit, 1)
		})


		context.subscriptions.push(disposable)
		context.subscriptions.push(disposable2)
		context.subscriptions.push(disposable3)
		context.subscriptions.push(disposable4)
		context.subscriptions.push(disposable5)
		const treeDataProvider = new MyTreeDataProvider();
		context.subscriptions.push(vscode.window.registerTreeDataProvider('mySidebar', treeDataProvider));

		// context.subscriptions.push(
		//     vscode.window.registerWebviewViewProvider('mySidebar', new SidebarProvider(context.extensionUri))
		// );
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable3); 
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
                background-color: white;
			}
			
			body {
				width: 100%;
				height: 100%;
			}
			

            #main_wrapper {
                
                width: 100%;
                height: 100%;
            }
		</style>
        </head>
			<body>
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

	static manager = undefined;
	static panel =undefined;

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
		this._onDidChangeTreeData.fire();
	}

    getTreeItem(element) {
        return new vscode.TreeItem(element.label);
    }

    getChildren(element) {
		console.log(element)
		if(!element) return [this.root]
        if (element.id === this.root.id) {
            return Codeasy_Clipboard.map(item => {
				const treeItem = new vscode.TreeItem(item)
				treeItem.id = item.id
				return treeItem}
				);
        }
        return [];
    }
}

function getWebviewContent() {
    return `
        <html>
        <body>
            <h1>Hello, World!</h1>
        </body>
        </html>`;
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
