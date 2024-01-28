// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
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

// This method is called when your extension is deactivated
function deactivate() {

}

module.exports = {
	activate,
	deactivate
}
