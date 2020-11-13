let addBTN = document.querySelector("#addBTN")
let clearBTN = document.querySelector("#clearBTN")
let body = document.querySelector("body")
let linedPaper = document.querySelector(".linedPaper")
let noteArea = document.querySelector(".noteArea")

addBTN.addEventListener("click", addNote)
clearBTN.addEventListener("click", clearForm)
window.addEventListener("load", showNotes)

function clearForm() {
    input.value = ""
    date.value = ""
    time.value = ""
}
function clearNote(e) {
    e.target.parentElement.style.display = "none"

    let selectId = e.target.parentElement.id
    let selectIdnum = Number(selectId)
    let arr1 = JSON.parse(localStorage.getItem("refNote"))
    let newArray = arr1.filter(item => item.id !== selectIdnum)
    let savedArray = JSON.stringify(newArray)
    localStorage.setItem("refNote", savedArray)

}

function showNotes() {
    let parsedNote = JSON.parse(localStorage.getItem("refNote"))
    if (parsedNote !== null) {
        for (i = 0; i < parsedNote.length; i++) {
            showNote(parsedNote[i])
        }
    }
}
function showNote(noteObject) {
    let newNote = document.createElement("div");
    newNote.setAttribute("id", noteObject.id)
    noteArea.appendChild(newNote);
    newNote.classList.add("newNote")
    let noteText = document.createElement("h3");
    newNote.appendChild(noteText);
    noteText.innerHTML = noteObject.text
    noteText.classList.add("noteText")
    let date1 = document.createElement("h4")
    newNote.appendChild(date1)
    date1.innerHTML = noteObject.date
    date1.style.position = "absolute"
    date1.style.bottom = "20px"
    date1.style.left = "10px"
    let time1 = document.createElement("h4")
    newNote.appendChild(time1)
    time1.innerHTML = noteObject.time
    time1.style.position = "absolute"
    time1.style.bottom = "2px"
    time1.style.left = "10px"
    let x = document.createElement("button");
    newNote.appendChild(x);
    x.classList.add("glyphicon", "glyphicon-remove")
    x.style.position = "absolute";
    x.style.top = "20px";
    x.style.right = "20px";
    x.style.display = "none"
    newNote.onmouseover = function () {
        x.style.display = "inline"
        newNote.onmouseleave = function () {
            x.style.display = "none"
        }
    }
    x.addEventListener("click", clearNote)
}


let input = document.querySelector("#enterText")
let date = document.querySelector("#date")
let time = document.querySelector("#time")
function addNote() {
    if (input.value != "" && date.value != "") {
        let noteObject = {
            text: input.value,
            date: date.value,
            time: time.value,
            id: Math.random() * 100 + 1
        }
        date.value = ""
        input.value = ""
        time.value = ""
        let x = localStorage.getItem("refNote")
        console.log(x)
        if (x == null) {
            arr = []
        }
        else {
            //JSON.parse to get array of objects
            arr = JSON.parse(x)
            console.log(arr)

        }
        arr.push(noteObject)
        let arr_string = JSON.stringify(arr)
        //localStorage.setItem("referenceKey", )
        localStorage.setItem("refNote", arr_string)
        showNote(noteObject);
    }
    else if (date.value == "" && input.value == "") {
        let errorMessage = document.createElement("h2")
        linedPaper.appendChild(errorMessage)
        errorMessage.style.color = "red"
        errorMessage.style.backgroundColor = "lightgray"
        errorMessage.innerHTML = "Please enter a note and date"
        document.onmousedown = function () {
            errorMessage.style.display = "none"
        }
    }
    else if (input.value != "") {
        let errorMessage = document.createElement("h2");
        linedPaper.appendChild(errorMessage);
        errorMessage.style.color = "red";
        errorMessage.style.backgroundColor = "lightgray";
        errorMessage.style.zIndex = 100;
        errorMessage.innerHTML = "Please enter a date"
        document.onmousedown = function () {
            errorMessage.style.display = "none"
        }
    }
    else if (date.value != "") {
        let errorMessage = document.createElement("h2")
        linedPaper.appendChild(errorMessage)
        errorMessage.style.color = "red"
        errorMessage.style.backgroundColor = "lightgray"
        errorMessage.innerHTML = "Please enter a note"
        document.onmousedown = function () {
            errorMessage.style.display = "none"
        }
    }

}