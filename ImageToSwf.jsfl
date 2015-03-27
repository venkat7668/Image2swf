/* author : venkat 
  what is this file?
  It genarates swf file from the images in selected folder and sub folders.
  Why do you need this?
  This file genarates SWFs with out save fla in your local disc and works as a batch conversion.
*/
var folder = fl.browseForFolderURL("choose folder");

if(folder){
	start(folder);
}

function start(folder) {
	fla = fl.createDocument();
	processFolder(folder, 0);
}


function processFolder(folder, level) {
	var files = FLfile.listFolder(folder, "files");
	var folders = FLfile.listFolder(folder, "directories");
	
	// Loop over the files, only processing 
	var iLen = files.length;
	for (var i = 0; i < iLen; i++) {
		var file = files[i];
		if (file.match(/\.(png|jpg|jpeg|gif)$/)) {
			createSWF(file, folder);
		}
	}
	
	// Recurse through the folders in this folders.
	iLen = folders.length;
	for (i = 0; i < iLen; i++) {
		//fl.trace(tab(level) + folders[i] + "/")
		processFolder(folder + "/" + folders[i], level + 1);
	}
}


function tab(level) {
	var t = ""
	for (var i = 0; i < level; i++) {
		t += "\t";
	}
	return t;
}

function createSWF(file, folder) {
	var importURI = folder + "/" + file;
	fla.importFile(importURI);
	
	var sel = fl.getDocumentDOM().selection[0];
	try{
		for(var i in sel){
		fl.trace(i + " : " + sel[i]);
		}
		fl.getDocumentDOM().width=parseInt(sel.width);
		fl.getDocumentDOM().height=parseInt(sel.height);
	}catch(e){
	 	fl.trace(e);
	}
	sel.x = 0;
	sel.y = 0;
	
	var lib = sel.libraryItem;
	lib.compressionType = "photo";
	lib.quality = 100;
	lib.allowSmoothing = true;
	
	var filenamePieces = file.split(".");
	filenamePieces.pop();
	fla.exportSWF(folder + "/" + filenamePieces.join(".") + ".swf");
	
	fla.deleteSelection();
}