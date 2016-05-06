var UndoableComponent = {
    commands : {},

    addCommand : function(command, executeFn, unexecuteFn) {
        this.commands[command] = {
            execute : executeFn,
            unexecute : unexecuteFn
        }
    },

    execute : function(command, params, push) {
        var _push = (push ? push : true);
        
        this.commands[command].execute(params, _push);
    },

    unexecute : function(command, params, snapshot) {
        this.commands[command].unexecute(params, snapshot);
    },
}