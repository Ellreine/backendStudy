const yargs = require('yargs')
const { addNote, printNotes, removeNotes    } = require('./notes.controller')


yargs.command({
    command: 'add',
    describe: 'add new note to list',
    builder: {
      title: {
          type: 'string',
          describe: 'Note title',
          demandOption: true
      }
    },
    handler({title}) {
        addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'print all notes',
    async handler() {
        printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note by id',
    builder: {
        id: {
            describe: 'Note ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNotes(argv.id)
    }
})

yargs.parse()