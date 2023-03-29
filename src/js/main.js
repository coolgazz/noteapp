import '../scss/style.scss' 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Evp2sJAgl_lxEzIcgEWCfVqhE8LUasY",
  authDomain: "notes-app-a51f6.firebaseapp.com",
  projectId: "notes-app-a51f6",
  storageBucket: "notes-app-a51f6.appspot.com",
  messagingSenderId: "12355516081",
  appId: "1:12355516081:web:124007eae75e943bf89490",
  measurementId: "G-XRP5TZQCCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



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