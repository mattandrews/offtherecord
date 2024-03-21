import inquirer from 'inquirer'
import DatePrompt from "inquirer-date-prompt";
import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

inquirer.registerPrompt("date", DatePrompt);


console.log('Hi, welcome to the Off The Record wizard');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What's the event title?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter a title';
        },
    },
    {
        type: 'date',
        name: 'timestamp',
        message: 'When was this event?',
        locale: "en-GB",
    },
    {
        type: 'number',
        name: 'eventNumber',
        message: 'What number event is this?',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a valid number';
        },
        filter: Number,
    },
    {
        type: 'input',
        name: 'artist',
        message: "What's the name of the artist?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter an artist';
        },
    },
    {
        type: 'input',
        name: 'album',
        message: "What's the name of the album?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter an album name';
        },
    },
    {
        type: 'input',
        name: 'coverImage',
        message: "What's the path to the cover image? (will be prefixed assets/img/records)",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter a cover image';
        },
    },
    {
        type: 'input',
        name: 'caption',
        message: "What's the event caption?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter a caption';
        },
    },
    {
        type: 'number',
        name: 'year',
        message: "What year was the album released?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter a year';
        },
    },
    {
        type: 'input',
        name: 'spotifyUrl',
        message: "Is there a Spotify playlist URL?",
    },
    {
        type: 'input',
        name: 'host',
        message: "Who hosted the event?",
        validate(value) {
            if (value) {
                return true;
            }
            return 'Please enter a host';
        },
    },
    {
        type: 'number',
        name: 'score',
        message: 'What score did this album get? (eg. 73)',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a valid number';
        },
        filter: Number,
    },
];


const generateFrontMatter = (input) => {
    let text = `---
layout: post
title: '"${input.title}"'
date: ${new Date(input.timestamp).toISOString()}
number: ${input.eventNumber}
artist_name: "${input.artist}"
album_name: "${input.album}"
cover_image: "assets/img/records/${input.coverImage}"
cover_caption: "${input.caption}"
year: ${input.year}
spotify: ${input.spotifyUrl}
host: ${input.host}
score: ${input.score}
#eventbrite: ""
#photo: ""
#thumbnail: ""
---`;
    return text;
}

function slugify(str) {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

const writeFile = (content, filename) => {

    const path = __dirname + `/_posts/${filename}`;
    try {

        fs.writeFileSync(path, content, { flag: 'w+' });
        console.log('file written')
    } catch (err) {
        console.error(err);
    }
}

inquirer.prompt(questions).then((answers) => {
    const d = new Date(answers.timestamp).toISOString();
    const dateString = d.split('T')[0];
    const slug = slugify(answers.title);
    const filename = `${dateString}-${slug}.markdown`;
    const content = generateFrontMatter(answers);
    writeFile(content, filename);
});
