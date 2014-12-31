(function () {
    var saveAnnotationOptions = {
        'id': 'saveAnnotationsWindow',
        'hidden': true
    };
    var webAnnotationExtensionId = 'iockdgbeekfceiipfenhioogjpfjppmf';

    function saveAnnotations(htmlToSave) {
        chrome.app.window.create('window.html', saveAnnotationOptions, function (saveWindow) {
            saveWindow.contentWindow.annotationToSave = htmlToSave;
        });
    }

    chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
        if (sender.id !== webAnnotationExtensionId) return;

        switch (request.type) {
            case 'save':
                saveAnnotations(request.data);
                break;
            case 'ping':
                sendResponse({type: 'pong'});
                break;
            default:
                break;
        }
    });
})();
