var toggle = function (event) {
    var elm = event.target;
    var togglePane = elm.getAttribute('data-toggle');
    var togglePaneElm = document.getElementById(togglePane);
    if (togglePaneElm) {
        togglePaneElm.classList.toggle('hidden');
        elm.classList.add('hidden');
    }
};

var togglers = document.querySelectorAll('.js-toggle');
var togglePanes = document.querySelectorAll('.js-toggle-pane');
[].slice.call(togglers).forEach(function(t){
    t.addEventListener('click', toggle);
});
[].slice.call(togglePanes).forEach(function(t){
    t.classList.add('hidden');
});
