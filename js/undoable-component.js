var UndoableComponent = {
    commands : {},

    addCommand : function(command, executeFn, unexecuteFn) {
        this.commands[command] = {
            execute : executeFn,
            unexecute : unexecuteFn
        }
    },

    execute : function(command, params) {
        this.commands[command].execute(params);
    },

    unexecute : function(command, params, snapshot) {
        this.commands[command].unexecute(params, snapshot);
    },
}