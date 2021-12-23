const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector(".word");
const phonetics = document.querySelector(".phonetics");
const audioo = document.querySelector("audio");
const syno = document.querySelector(".synonyms");
const wordMeaning = document.querySelector(".word-definition");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function handle(e) {
    if (e.keyCode == 13) {
        const word = e.target.value;

        //// Make Api request
        const result = await fetch(url + word);
        resultDiv.style.display = "block";
        const data = await result.json();

        //contwrd = data[0].phonetic;

        if (result.ok) {
            phonetics.innerText = data[0].phonetic;
            wordEle.innerText = data[0].word.substring(0, 1).toUpperCase() + data[0].word.substring(1);

            //data[0].phonetics[0].audio
            audioo.style.display = "block";
            audioo.src = data[0].phonetics[0].audio;
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;

            syno.innerHTML = "";

            let synonyms = data[0].meanings[0].definitions[0].synonyms;

            if (synonyms) {
                let x = synonyms.map((a) => `<p class="pills">${a}</p>`).join("");

                syno.innerHTML = "";

                syno.innerHTML = x;
            } else {
                syno.innerHTML = "";

                syno.innerHTML = `<p>No Synonyms available</p>`;
            }
        } else {
            audioo.style.display = "none";
            document.querySelector(".result > p").style.display = "none";
            syno.innerHTML = "";
            wordMeaning.innerText = data.message;
            wordEle.innerText = data.title;
            for (i of document.querySelectorAll(".wordmeaning")) {
                i.style.display = "none";
            }
        }
    }

    setTimeout(() => {
        resultDiv.style.display = "none";
        document.querySelector(".search-field").value = "";
    }, 10000);
}
