                    ed.addButton('mybutton', {
                    text: 'My button',
                    icon: false,
                    onclick: function () {
                    ed.insertContent('&nbsp;<b>'+ ed.selection.getContent() +'</b>&nbsp;');
                    }
                    });

                    <a class="toggleLabel"> &gt;&gt;</a><span class="toggleHidden"></span>