var ref = new Firebase("https://flickering-fire-4186.firebaseio.com/web/offtherecord");
var trackingVotes = false;

var vote = function (event) {
    var elm = event.target;
    var pollId = elm.getAttribute('data-key');
    var voteId = elm.getAttribute('data-value');

    // fear my mighty fraud detection skills
    var hasVoted = window.localStorage.getItem('poll-' + pollId);

    if (!hasVoted) {
        var pollsRef = ref.child("polls/" + pollId + "/votes/" + voteId);
        pollsRef.transaction(function (current_value) {
            return (current_value || 0) + 1;
        });

        window.localStorage.setItem('poll-' + pollId, voteId);
    }

    document.querySelector('body').classList.add('has-voted');
    if (!trackingVotes) { trackVotes(pollId); }
};

var updateVoteDisplay = function(pollId, votes) {

    if (votes) {

        var voteTotal = 0;
        for (var v in votes) { voteTotal += votes[v]; }

        for (var id in votes) {
            var countElm = document.getElementById('poll-' + pollId + '-option-' + id);
            var percentage = Math.floor(votes[id] / voteTotal * 100);
            if (countElm) {
                countElm.innerHTML = '<span class="percentage">' +
                    '<span class="percentage--amount" style="width: ' + percentage + '%;"></span></span>' +
                    votes[id] + ' votes';
            }
        }
    }
};

var trackVotes = function (pollId) {
    trackingVotes = true;
    var votesRef = ref.child("polls/" + pollId + "/votes");
    votesRef.on("value", function(snapshot) {
        updateVoteDisplay(pollId, snapshot.val());
    }, function (errorObject) {
        // console.log("The read failed: " + errorObject.code);
    });
};

var buttons = document.querySelectorAll('.js-vote');
[].slice.call(buttons).forEach(function(b){
    b.addEventListener('click', vote);
});

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