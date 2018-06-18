let OTR_IDEAS = [
    {
        title: 'New Beginnings'
    },
    {
        title: 'End of an Era'
    },
    {
        title: 'Cross Genre',
        subtitle: '(eg. Herbie Hancock "The Imagine Project")'
    },
    {
        title: 'The Future',
        subtitle: '(eg. Leonard Cohen "Apocalypse")'
    },
    {
        title: 'Revival',
        subtitle: '(a band who release an album that restarts their career)'
    },
    {
        title: 'Supergroups'
    },
    {
        title: 'Birmingham'
    },
    {
        title: 'Musicals'
    },
    {
        title: 'Albums about particular events / places'
    },
    {
        title: 'The supernatural'
    },
    {
        title: 'Break-up albums',
        subtitle: '(not always depressing!)'
    },
    {
        title: 'Difficult second albums'
    },
    {
        title: 'DJ mixes',
        subtitle: '(truly genre-less mixing in the quest for … fun.)'
    },
    {
        title: 'Perfect for an episode of EastEnders',
        subtitle: '(25 minutes or less)'
    },
    {
        title: 'I didn\'t know that was them!'
    },
    {
        title: 'Forced Into A Name Change'
    },
    {
        title: 'Bigger in a Foreign Country',
        subtitle: '(to their homeland)'
    },
    {
        title: 'Only One Instrument'
    },
    {
        title: 'Lost',
        subtitle: '(eg. released years after its recording)'
    },
    {
        title: 'Acronyms'
    },
    {
        title: 'You May Know Me From…',
        subtitle: '(solo spin-offs, side projects, film stars in music etc)'
    },
    {
        title: 'Looping Mastery'
    },
    {
        title: 'Remix albums'
    },
    {
        title: 'Beards',
        subtitle: '(do this during Movember)'
    },
    {
        title: 'Soundtracks',
        subtitle: '(don\'t fuck about though, it\'s "The Harder They Come")'
    },
    {
        title: 'Fight The Power'
    },
    {
        title: 'Scottish'
    },
    {
        title: 'Black artists'
    },
    {
        title: 'On My Birthday',
        subtitle: '(albums released the week you were born)'
    },
    {
        title: 'Duos'
    },
    {
        title: 'Narratives'
    }
];

let btn = document.getElementById('js-generate');
let title = document.getElementById('js-title');
let subtitle = document.getElementById('js-subtitle');
btn.addEventListener('click', () => {
    let rand = OTR_IDEAS[Math.floor(Math.random()*OTR_IDEAS.length)];
    title.innerText = rand.title;
    subtitle.innerHTML = (rand.subtitle) ? rand.subtitle : ' ';
});

btn.click();