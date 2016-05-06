
var TextComponent = $.extend(true, {}, UndoableComponent, {
    setup : function() {
        this.setupCommands();
    },

    setupCommands : function() {
        var t = this;

        // bold
        this.addCommand('bold', setBold, unsetBold);

        function setBold() {
            var fontWeight = t.getEl().style.fontWeight;
            if (fontWeight == 'bold')
                return;

            var snapshot = {};
            snapshot.fontWeight = fontWeight;

            t.getEl().style.fontWeight = 'bold';

            UndoManager.push({
                target : TextComponent,
                command : 'bold',
                params : {},
                snapshot : snapshot
            })
        }

        function unsetBold(params, snapshot) {
            var previousFontWeight = snapshot.fontWeight;

            t.getEl().style.fontWeight = previousFontWeight;
        }

        // italic
        this.addCommand('italic', setItalic, unsetItalic);

        function setItalic() {
            var fontStyle = t.getEl().style.fontStyle;
            if (fontStyle == 'italic')
                return;

            var snapshot = {};
            snapshot.fontStyle = fontStyle;

            t.getEl().style.fontStyle = 'italic';

            UndoManager.push({
                target : TextComponent,
                command : 'italic',
                params : {},
                snapshot : snapshot
            })
        }

        function unsetItalic(params, snapshot) {
            var previousFontStyle = snapshot.fontStyle;

            t.getEl().style.fontStyle = previousFontStyle;
        }

        // underline
        this.addCommand('underline', setUnderline, unsetUnderline);

        function setUnderline() {
            var textDecoration = t.getEl().style.textDecoration;
            if (textDecoration == 'underline')
                return;

            var snapshot = {};
            snapshot.textDecoration = textDecoration;

            t.getEl().style.textDecoration = 'underline';

            UndoManager.push({
                target : TextComponent,
                command : 'underline',
                params : {},
                snapshot : snapshot
            })
        }

        function unsetUnderline(params, snapshot) {
            var previoustextDecoration = snapshot.textDecoration;

            t.getEl().style.textDecoration = previoustextDecoration;
        }
    },

    getEl : function() {
        return document.getElementById('text');
    },
})


{
    TextComponent.setup();
}