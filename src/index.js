const ui = require("ui");
var menu = require("menu");

var editor = null;
var editorSession = null;
var currentFile = null;

window.onload = function() {
    var JavaScriptMode = reqace("ace/mode/javascript").Mode;

    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editorSession = editor.getSession();
    editorSession.setMode(new JavaScriptMode());
};

// http://groups.google.com/group/ace-discuss/msg/3d10daf9bd019b3d
saveFile = function () {
    var data = editorSession.getValue();
    //    require("file").write(currentFile, data);
    var stream = require("file").open(currentFile, "w");
    try {
        stream.write(data);
    }
    finally {
        stream.close();
    }
}

openFile = function () {
    const filePicker = require('file-picker');
    var fp = filePicker.FilePicker();
    // Set the dialog title and selection mode
    fp.title = "Hi!  Pick some files!"
    fp.mode = "multiple";
    fp.show(function(x) {
        console.log("you picked " + x.length + " files");
        for (var i = 0; i < x.length; i++) {
            currentFile = "" + x[i];
            stringData = require("file").read(currentFile);
            editorSession.setValue(stringData);
        }
    });
}

var file = menu.Menu({
    parent: ui.getMenu(),
    label: "File",
    children: [
    menu.Menu({
        label: "Open File",
        hotkey: "accel-o",
        onClick: function(e) {
            openFile();
        }
        }),
        menu.Menu({
            label: "Save",
            hotkey: "accel-s",
            onClick: function (e) {
                saveFile();
            }
        })
    ]
});
