const fs = require("fs");
const notes = require("./notes");
const yargs = require("yargs");

console.log(process.argv);
console.log(yargs.argv);

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove the title",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("title to be removed :", argv.title);
    if (argv?.title) {
      notes.removeNote(argv?.title);
    }
  },
});

yargs.command({
  command: "list",
  describe: "List the notes",
  handler: function () {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read the note",
  builder: {
    title: {
      describe: "Title of note",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
/*
const { prependListener } = require("process");
const chalk = require("chalk");

fs.writeFileSync("notes.txt", "Hello Harry ow are you?");
fs.appendFileSync("notes.txt", "this is the second line in file");
const returnStr = printNotes();
console.log(returnStr);
console.log(chalk.bgGreen.bold("Success"));
*/
