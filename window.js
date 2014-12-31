function createWriterSuccess(writer) {
    writer.write(new Blob([window.annotationToSave], {type: 'text/plain'}));
    window.close();
}

function createWriterFailure() {
    window.close();
}

chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: 'annotation.html'}, function (writableFileEntry) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        window.close();
        return;
    }

    if (writableFileEntry == null) {
        // user cancelled out of the save dialog or there was error writing to disk
        //TODO: read the chrome.runtime.lastError to determine if there was an error, if so post message back to extension or display error message directly from here?
        window.close();
        return;
    }

    writableFileEntry.createWriter(createWriterSuccess, createWriterFailure);
});
