const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname, 'db.json')

async function addNote (title) {

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'))
}

async function  getNotes () {
    const notes = await  fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNotes(id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);

    if (notes.length > filteredNotes.length) {
        await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
        console.log(chalk.bgGreen(`Note with id "${id}" removed`));
    } else {
        console.log(chalk.bgRed('No note found with that id'));
    }
}

async function updateNote (id, newTitle) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex].title = newTitle; // Обновление заголовка
        await fs.writeFile(notesPath, JSON.stringify(notes));
        console.log(chalk.bgGreen(`Note with id "${id}" updated`));
    } else {
        console.log(chalk.bgRed('No note found with that id'));
    }
}


async function printNotes () {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

module.exports = {
    addNote,
    getNotes,
    updateNote,
    printNotes,
    removeNotes
}

