var UndoManager = {
    stack : [],

    index : -1,

    push : function(commandData) {
        var isNewCommand = (typeof this.stack[this.index + 1] == 'undefined' || this.stack[this.index + 1].command != commandData.command);
        if (isNewCommand) {
            this.clearRedo();
            this.stack.push(commandData);
        }

        this.index++;
    },

    clearRedo : function() {
        this.stack = this.stack.slice(0, this.index + 1);
    },

    canUndo : function() {
        return this.index != -1
    },

    undo : function() {
        if (this.canUndo()) {
            var cmdData = this.stack[this.index];

            var target = cmdData.target;

            target.unexecute(cmdData.command, cmdData.params, cmdData.snapshot);

            this.index--;
        }
    },

    canRedo : function() {
        return (typeof this.stack[this.index + 1] != 'undefined');
    },

    redo : function() {
        if (this.canRedo()) {
            var cmdData = this.stack[this.index + 1];

            var target = cmdData.target;

            target.execute(cmdData.command, cmdData.params);
        }
    }
}