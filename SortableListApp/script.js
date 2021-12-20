const draggable_list = document.getElementById("draggable-list");

const check = document.getElementById("check");

const richest = [
    "Jeff Bezos",
    "Elon Musk",
    "Bernand Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
];

const listItems = [];

let glo_startIndex;

createList();

function createList() {
    [...richest]
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((person, index) => {
            const elem = document.createElement("li");

            elem.setAttribute("data-id", `${index}`);
            elem.innerHTML = `<span class='number'>${index + 1}</span>
  <div class='draggable' draggable='true'>
    <p class="person-name">${person}</p>
    <i class='fas fa-grip-lines'></li>
  </div>`;

            document.querySelector("ul").append(elem);
            listItems.push(elem);
        });

    addEventListen();
}

function dragStart() {
    console.log("start");
    glo_startIndex = this.closest("li").getAttribute("data-id");
    // console.log(glo_startIndex);
}

function drop() {
    console.log("drop");
    const destination_index = this.closest("li").getAttribute("data-id");
    // console.log(destination_index);

    swapfunc(glo_startIndex, destination_index);
}

function swapfunc(start, end) {
    let x = document.querySelectorAll(".draggable")[start];
    let y = document.querySelectorAll(".draggable")[end];

    let a = x.parentElement;
    let b = y.parentElement;

    a.appendChild(y);
    b.appendChild(x);
}

function dragEnter() {
    console.log("enter");
    this.classList.add("over");
}

function dragLeave() {
    this.classList.remove("over");
}

function dragOver(e) {
    // console.log("over");
    e.preventDefault();
}

function addEventListen() {
    const dragitems = document.querySelectorAll(".draggable");
    const rows = document.querySelectorAll(".row li");

    dragitems.forEach((dragname) => {
        dragname.addEventListener("dragstart", dragStart);
    });

    rows.forEach((row) => {
        row.addEventListener("dragover", dragOver);
        row.addEventListener("drop", drop);
        row.addEventListener("dragenter", dragEnter);
        row.addEventListener("dragleave", dragLeave);
    });
}

function checkOrder() {
    document.querySelectorAll(".row li").forEach((a, b) => {
        if (a.querySelector(".draggable").innerText.trim() !== richest[b]) {
            a.classList.add("wrong");
        } else {
            a.classList.remove("wrong");
            a.classList.add("right");
        }
    });
}
document.querySelector("button").addEventListener("click", checkOrder);
