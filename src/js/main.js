import '../scss/style.scss' 

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");


addNoteButton.addEventListener("click", addNote);
// document.addEventListener("DOMContentLoaded", getNotes);
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});
function getNotes(){
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");   
}

function saveNotes(notes){
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");

    element.classList.add("notes");
    element.value = content;
    element.placeholder = "Empty note ;(";

    element.addEventListener("change", () =>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () =>{
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete){
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random()*100000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(notes => notes.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
    console.log(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(notes => notes.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}