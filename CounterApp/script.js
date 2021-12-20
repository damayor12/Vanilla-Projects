const count = document.querySelector(".count");
const add = document.querySelector(".add");
const resetCount = document.querySelector(".reset");
const sub = document.querySelector(".subtract");

add.addEventListener("click", () => {
    count.innerHTML++;
});

resetCount.addEventListener("click", () => {
    count.innerHTML = 0;
});

sub.addEventListener("click", () => {
    count.innerHTML--;
});
