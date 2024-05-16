const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes....";
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => note.title === title);

  // for debugging node js
  // debugger;

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Notes title taken"));
  }
  saveNotes(notes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync("notes.json");
    const dataJSON = databuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  console.log(notes);

  const updatedNotes = notes?.filter((note) => note.title !== title);

  if (updatedNotes.length === notes.length) {
    console.log(chalk.red.inverse("Note is not present in file"));
  } else {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(updatedNotes);
  }
};

const listNotes = () => {
  console.log(chalk.inverse("Your notes!!"));
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(chalk.green.inverse(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteRead = notes.find((note) => note.title === title);

  if (noteRead) {
    console.log(chalk.inverse("Your note is:"));
    console.log(
      chalk.green.inverse("Title: ", noteRead.title, " Body:", noteRead.body)
    );
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
