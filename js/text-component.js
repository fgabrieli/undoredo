var neo = neo ? neo : {};

neo.TextComponent = $.extend(true, {}, webcom.Undoable, {
    setup : function() {
        this.setupCommands();
    },

    setupCommands : function() {
        var t = this;

        // bold
        this.addCommand('bold', setBold, unsetBold);

        function setBold(params, push) {
            var fontWeight = t.getEl().style.fontWeight;
            if (fontWeight == 'bold')
                return;

            var snapshot = {};
            snapshot.fontWeight = fontWeight;

            t.getEl().style.fontWeight = 'bold';

            if (push) {
                webcom.UndoManager.push({
                    target : this,
                    command : 'bold',
                    params : {},
                    snapshot : snapshot
                })
            }
        }

        function unsetBold(params, snapshot) {
            var previousFontWeight = snapshot.fontWeight;

            t.getEl().style.fontWeight = previousFontWeight;
        }

        // italic
        this.addCommand('italic', setItalic, unsetItalic);

        function setItalic(params, push) {
            var fontStyle = t.getEl().style.fontStyle;
            if (fontStyle == 'italic')
                return;

            var snapshot = {};
            snapshot.fontStyle = fontStyle;

            t.getEl().style.fontStyle = 'italic';

            if (push) {
                webcom.UndoManager.push({
                    target : this,
                    command : 'italic',
                    params : {},
                    snapshot : snapshot
                })
            }
        }

        function unsetItalic(params, snapshot) {
            var previousFontStyle = snapshot.fontStyle;

            t.getEl().style.fontStyle = previousFontStyle;
        }

        // underline
        this.addCommand('underline', setUnderline, unsetUnderline);

        function setUnderline(params, push) {
            var textDecoration = t.getEl().style.textDecoration;
            if (textDecoration == 'underline')
                return;

            var snapshot = {};
            snapshot.textDecoration = textDecoration;

            t.getEl().style.textDecoration = 'underline';

            if (push) {
                webcom.UndoManager.push({
                    target : this,
                    command : 'underline',
                    params : {},
                    snapshot : snapshot
                })
            }
        }

        function unsetUnderline(params, snapshot) {
            var previoustextDecoration = snapshot.textDecoration;

            t.getEl().style.textDecoration = previoustextDecoration;
        }

        // rotate
        this.addCommand('rotate', rotate, rotateBack);

        function rotate(angle, push) {
            var transform = t.getEl().style.transform;

            var deg = 0;
            if (transform && transform.length > 0) {
                // this command works as an example, it is NOT intended to go
                // into production servers :)
                deg = parseFloat(transform.match(/\d+/)[0]);
            }

            deg += angle;

            var snapshot = {};
            snapshot.transform = transform;

            // for this example i consider deg only
            t.getEl().style.transform = 'rotate(' + deg + 'deg)';

            if (push) {
                webcom.UndoManager.push({
                    target : this,
                    command : 'rotate',
                    params : angle,
                    snapshot : snapshot
                })
            }
        }

        function rotateBack(params, snapshot) {
            var previousTransform = snapshot.transform;

            t.getEl().style.transform = previousTransform;
        }
    },

    getEl : function() {
        return document.getElementById('text');
    },
})

{
    neo.TextComponent.setup();
}