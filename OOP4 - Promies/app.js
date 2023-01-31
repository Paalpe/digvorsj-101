/**
 * Oppgave 1 - Test tall
 * Skriv en funksjon testTall() som tar et tall som argument og bruker en Promise til å teste om
 * tallet er mindre eller større enn verdien 10.
 */

const testTall = (tall) => {
    return new Promise((resolve, reject) => {
        if (tall === 10) {
            reject(`${tall} er lik 10`);
        }
        if (tall > 10) {
            // Det tar 3 sekunder å utføre denne koden
            setTimeout(() => {
                resolve(`${tall} er større enn 10`);
            }, 0);
        } else {
            reject(`${tall} er mindre enn 10`);
        }
    });
};
/**
 * Oppgave 2 - Lenking (chaining)
 * Skriv to funksjoner som bruker Promises og som lenkes sammen.
 * Den første funksjonen lagStoreBokstaver() vil ta inn en array med ord og gjøre om alt til
 * store bokstaver. Den andre funksjonen sorterer ordene alfabetisk. Hvis array-en inneholder
 * noe annet enn tekststrenger skal det komme en feilmelding.
 */

const lagStoreBokstaver = (ord) => {
    return new Promise((resolve, reject) => {
        if (ord.every((element) => typeof element === 'string')) {
            resolve(ord.map((element) => element.toUpperCase()));
        } else {
            reject('Arrayen inneholder ikke bare tekststrenger');
        }
    });
}

const sorterAlfabetisk = (ord) => {
    return new Promise((resolve, reject) => {
        console.log(ord);
        if (ord.every((element) => typeof element === 'string')) {
            resolve(ord.sort());
        } else {
            reject('Arrayen inneholder ikke bare tekststrenger');
        }
    });
}

let steder = ["Svortland", "Moster", "Mosterhamn", "Rubbestadneset", "Bremnes", "Langevåg", "Melandsvågen", "Foldrøy"]
let postNummer = [1234, 5678, 9012, 3456, 7890, 1234, 5678, 9012]


/**
 * Oppgave 3 – Hente data fra en nettjeneste - EKSTR
 * Følgende lenke henter ut data om en bruker på github i JSON format
 * Skriv kode som henter ut lenken til brukerens avatar fra github. Når du har fått innholdet (o
 * Promise er oppfylt) presenter bildet på en webside.
 */

const hentData = () => {
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/users/erlendev')
            .then((response) => resolve(response.json()))
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
};


/**
 * 
 * nettside
 */

// function that logs the result of the promise
async function logResultOfPromise(passedPromise) {
    log.ariaBusy = true;
    log.insertAdjacentHTML(
        "beforeend",
        `Promise started<br>`
    );

    const result = Promise.all([
        passedPromise,
        enLitenPause(300)
    ]);
    return await result.then((r) => {
        log.insertAdjacentHTML("beforeend", `${r}) Promise fulfilled<br> <br>`);
        log.ariaBusy = false;
        return r[0];
    }).catch((error) => {
        log.insertAdjacentHTML("beforeend", `${error}) Promise Rejected<br> <br>`);
        log.ariaBusy = false;
        throw error;
    });
}

function enLitenPause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const button = document.getElementById('button');
const log = document.getElementById('log');
const overskrift = document.getElementById('overskrift');
const forklaring = document.getElementById('forklaring');


//listen for click on any button
document.addEventListener('click', async (e) => {
    //check if the clicked element is a button
    if (e.target && e.target.nodeName == "BUTTON") {
        console.log(e.target.innerText);

        switch (e.target.innerText) {
            case 'Gå til oppgave 1':
            case '1':
                log.innerHTML = 'log ...';
                // set the heading
                overskrift.innerHTML = 'Større eller mindre enn 10?';
                forklaring.innerHTML = 'Funksjon <code>testTall()</code>';
                // knappen
                button.onclick = async () => {
                    log.innerHTML = '';
                    let tallEnTilTuve = Math.floor(Math.random() * 20) + 1;
                    logResultOfPromise(testTall(tallEnTilTuve))
                    .catch((error) => console.log(error));
                }
                break;
            case '2':
                log.innerHTML = 'log ...';
                overskrift.innerHTML = 'Lenke (chaining)';
                forklaring.innerHTML = '<code>lagStoreBokstaver()</code> & <code>sorterAlfabetisk()</code> </br> </br>[' + steder + ']   </br></br> [' + postNummer + '] ';

                button.onclick = async () => {
                    log.innerHTML = '';
                    await logResultOfPromise(lagStoreBokstaver(steder))
                        .then((resultat) => logResultOfPromise(sorterAlfabetisk(resultat)))
                        .catch((error) => console.log(error));

                    await logResultOfPromise(lagStoreBokstaver(postNummer))
                        .then((resultat) => logResultOfPromise(sorterAlfabetisk(resultat)))
                        .catch((error) => console.log(error));

                }
                break;
            case '3':
                log.innerHTML = 'log ...';
                overskrift.innerHTML = 'Hente data fra en nettjeneste';
                forklaring.innerHTML = 'Funksjon <code>hentData()</code>';

                button.onclick = async () => {
                    log.innerHTML = '';
                    const data = await logResultOfPromise(hentData()).catch((error) => console.log(error));
                    log.insertAdjacentHTML("beforeend", data.name);
                }


                break;
            default:
                break

        }

        button.innerText = 'Kjør Funksjon';
    }


});