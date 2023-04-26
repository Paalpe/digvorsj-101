// Oppgave 1 - Klasse for konto
class Konto {
    #saldo;
    constructor(kontonummer, saldo, navn) {
        this.kontonummer = kontonummer;
        this.#saldo = saldo;
        this.navn = navn;
    }
    get saldo() {
        return this.#saldo;
    }
    set saldo(saldo) {
        this.#saldo = saldo;
    }

    // Oppgave 3 - Metoder for innskudd og uttak
    innskudd = (belop) => {
        this.saldo += belop;
        return belop + " kroner er innskutt på kontoen til " + this.navn;
    }

    uttak = (belop) => {
        if (belop > this.saldo) return this.navn + " har ikke nok penger på kontoen";
        this.saldo -= belop;
        return belop + " kroner er tatt ut fra kontoen til " + this.navn;
    }

    // Oppgave 5 - Overføring mellom kontoer
    overforing = (belop, mottaker) => {
        if (belop > this.saldo) return this.navn + " har ikke nok penger på kontoen";
        this.saldo -= belop;
        mottaker.saldo += belop;
        return belop + " kroner er overført fra " + this.navn + " til " + mottaker.navn;
    }

    // Oppgave 4 - Saldoen til Kari er 429 kroner
    kontoInformasjon = () => {
        // ”Kari Hansen med kundenummer 93827100 har 429 kroner på konto”
        return `${this.navn} med kundenummer ${this.kontonummer} har ${this.saldo} kroner på konto`;
    }

}

// Oppgave 2 - Konstruktører
class VanligKonto extends Konto {
    constructor(kontonummer, saldo, navn) {
        super(kontonummer, saldo, navn);
    }
}

class BarneKonto extends Konto {
    constructor(kontonummer, saldo, navn) {
        super(kontonummer, saldo + 200, navn);
    }
}





// Oppgave 5 & 6 - Din egen lille bank! Opprett tre bankkontoer
let lise = new BarneKonto(12345678121, 0, "Lise Jensen");
let kari = new VanligKonto(93827100121, 895, "Kari Hansen");
let petter = new VanligKonto(93827101121, 0, "Petter Olsen");

let kontoer = [lise, kari, petter];

const redigerKnapp = document.getElementById("rediger-eksisterende-kontoer");
redigerKnapp.addEventListener("click", () => { LagTabellKontoer(true); redigerKnapp.disabled = true; });


function lagKontoElement(konto, isEditable) {

    // format kontonr to xxxx xx xxxxx
    let kontonrString = konto.kontonummer.toString();
    let kontonrFormatted = kontonrString.substring(0, 4) + " " + kontonrString.substring(4, 6) + " " + kontonrString.substring(6, 11);

    if (isEditable) {
        // Endrer Html til å vise input felt
        return `
        <tr>
            <th scope="row">${konto.navn}</th>
            <td><input type="checkbox" id="switch-${konto.kontonummer}" name="switch" role="switch"  ${konto instanceof BarneKonto ? "checked" : ""}></td>
            <td>${kontonrFormatted}</td>
            <td>
            <input type="number" id="number-${konto.kontonummer}" value="${konto.saldo}">
            </td>
        </tr>`
    }
    if (!isEditable) {
        // Endrer html til å vise vanlig tabell
        return `
        <tr>
            <th scope="row">${konto.navn}</th>
            <td><input type="checkbox" id="switch-${konto.kontonummer}" name="switch" role="switch" readonly disabled ${konto instanceof BarneKonto ? "checked" : ""}></td>
            <td>${kontonrFormatted}</td>
            <td>
                    <div><b><a>${konto.saldo} KR</a></b></div>
            </td>
        </tr>`
    }

}

let table = document.getElementById("kontoer");

function LagTabellKontoer(isEditable) {
    // Fjerner alt fra tabellen og legger til nye elementer
    table.innerHTML = "";
    kontoer.forEach(konto => {
        table.innerHTML += lagKontoElement(konto, isEditable);
    });
}


// Kl 06:30
let date = new Date(2000, 1, 8, 06, 30, 0);
const dateEnd = new Date(2000, 1, 8, 17, 30, 0);
let isTimeRunning = false;
let hendelse = 0;

function StartKlokken() {
    if (!isTimeRunning) {
        /** Får tiden til å gå */
        function tikker() {

            // Hvor langt i prosent er vi nå?
            var difference = dateEnd.getTime() - date.getTime();
            var prosent = (difference / (dateEnd.getTime() - new Date(2000, 1, 8, 04, 30, 0).getTime())) * 100;
            document.getElementById("progress").value = 100 - prosent;

            // Oppdater klokken
            date = new Date(date.getTime() + 1000); ''
            const time = date.toLocaleTimeString('no-NO', { hour12: false });
            document.getElementById("klokken-skal-tikke-og-gaa").innerHTML = time;
        }
        setInterval(tikker, 80);
        isTimeRunning = true;
    }

}



const videreKnapp = document.getElementById("videre");
const statusTekst = document.getElementById("klokken-context");
videreKnapp.addEventListener("click", () => {


    if (redigerKnapp.disabled == true && !isTimeRunning) {
        let newKontoer = [];

        // Hent endret saldo og kontotype
        kontoer.forEach(konto => {
            let kontonr = konto.kontonummer;
            let saldo = document.getElementById(`number-${kontonr}`).value;
            let kontotype = document.getElementById(`switch-${kontonr}`).checked;

            if (kontotype) {
                konto = new BarneKonto(kontonr, Number(saldo), konto.navn);
            } else {
                konto = new VanligKonto(kontonr, Number(saldo), konto.navn);
            }
            newKontoer.push(konto);
        });
        // Oppdater kontoer med endret saldo og kontotype
        kontoer = newKontoer;
        LagTabellKontoer(false);
    }

    // fjerner redigerknapp når klokken er startet
    if (!isTimeRunning) {
        redigerKnapp.style.opacity = 0.0;
        redigerKnapp.disabled = true
        StartKlokken();
    }


    /**
     * I løpet av en dag kan så mangt skje med en bankkonto. Programmet ditt skal simulere en
     * dag, etter følgende hendelsesforløp:
     * - Klokka 10:30 – Kari tar ut 300 kroner.
     * - Klokka 11:00 – Bestefaren til Lise er i det gavmilde hjørnet, og setter inn 4000 kroner.
     * - Klokka 11:00 – Petter setter inn 3000 kroner.
     * - Klokka 12:15 – Kari overfører 250 kroner i bursdagsgave til Petter.
     * - Klokka 17:30 – Kari forsøker å ta ut 800 kroner for å kjøpe kjole til julebordet. Har hun råd
     * til det, mon tro? 
     */


    let _lise = kontoer[0];
    let _kari = kontoer[1];
    let _petter = kontoer[2];

    switch (hendelse) {
        case 0:
            statusTekst.innerText = "[" + date.toLocaleTimeString('no-NO', { hour12: false }) + "] " + " ...";
            videreKnapp.innerText = "Klokka 10:30 ⏭️ Kari tar ut 300 kroner. ";
            break;

        case 1:
            date = new Date(2000, 1, 8, 10, 30, 0);
            videreKnapp.innerText = "Klokka 11:00 ⏭️ Bestefaren til Lise & Petter setter inn";
            statusTekst.innerText = "[" + date.toLocaleTimeString('no-NO', { hour12: false }) + "] " + _kari.uttak(300);
            break;

        case 2:
            date = new Date(2000, 1, 8, 11, 00, 0);
            statusTekst.innerText = "[" + date.toLocaleTimeString('no-NO', { hour12: false }) + "] " +
                _lise.innskudd(4000) + " | " +
                _petter.innskudd(3000);

            videreKnapp.innerText = "Klokka 12:15 ⏭️ Kari overfører 250 kroner i bursdagsgave til Petter.";
            break;

        case 3:
            date = new Date(2000, 1, 8, 12, 15, 0);
            videreKnapp.innerText = "Klokka 17:30 ⏭️ Kari forsøker å ta ut 800 kroner";
            statusTekst.innerText = "[" + date.toLocaleTimeString('no-NO', { hour12: false }) + "] " + _kari.overforing(250, _petter);

            break;

        case 4:
            date = new Date(2000, 1, 8, 17, 30, 0);
            statusTekst.innerText = "[" + date.toLocaleTimeString('no-NO', { hour12: false }) + "] " + kari.uttak(800);

            videreKnapp.innerText = "Oppgave Fullført! 🎉";
            videreKnapp.className = "outline";
            break;


        default:
            videreKnapp.innerText = "Oppgave Fullført! 🎉";
            videreKnapp.className = "outline";
            document.documentElement.setAttribute("data-theme", "dark");
            break;
    }

    hendelse++;
    LagTabellKontoer(false)
});


LagTabellKontoer(false);









