const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title);

    if (foundNote) {
        console.log(chalk.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title)
    if (notes.length > filteredNotes.length) {
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
    saveNotes(filteredNotes);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.white.inverse('Your Notes'));
    for (const note of notes) {
        console.log(note.title)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJsON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
};
