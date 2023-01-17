/**
 *  * alle oppgavene før du starter.
 * Oppgave 1 - Klasse for konto
 * Lag en klasse for kontoinformasjon. Det skal være objektvariabler for kundenummer,
 * kundens navn, og en saldo. For de objekter som baserer seg på klassen, skal saldoen til
 * enhver tid inneholde det som er saldo akkurat nå.
 * * */

class Konto {
    constructor(kundenummer, navn, saldo) {
        this.kundenummer = kundenummer;
        this.navn = navn;
        this.saldo = saldo;
    }
}


/** 
 * Oppgave 2 - Konstruktører
 * Vi tenker oss at en kunde kan ha penger som settes inn samtidig som at kontoen opprettes
 * (for eksempel i forbindelse med bytte av bank). Banken er spesielt ivrige på å få kunder som
 * er mindre enn 3 år. Disse anses å være super-gode sparere (fordi de har snille besteforeldre
 * som vil barnet vel). Banken lokker nye barnekontoer med en startkapital på 200 kroner!
 * Lag en subklasse barnekonto som arver fra klassen konto:
 * 1) Konstruktør som registrerer en vanlig konto, tar i mot kundenummer, navn og saldo.
 * (Det er mulig å lage kontoer som har 0 i startsaldo :-)
 * 2) Konstruktør som registrerer en barnekonto, tar i mot bare kundenummer og navn.
 * Saldo settes lik 200. 
 * * */

class Vanligkonto extends Konto {
    constructor(kundenummer, navn, saldo) {
        super(kundenummer, navn, saldo);
    }
}

class Barnekonto extends Konto {
    constructor(kundenummer, navn, saldo) {
        super(kundenummer, navn, saldo + 200);
    }
}


/**
 * Oppgave 3 - Metoder for innskudd og uttak
 * Lag metoder som setter inn penger på en konto, og som tar ut penger fra en konto. Kall
 * metodene for innskudd() og uttak(). Dersom det er 895 kr på for eksempel Karis konto,
 * og metoden for å ta ut kalles opp, vil det typisk se slik ut:
 * kari.uttak(200)
 * Etter at uttaket er foretatt, skal det være 695 kroner på kontoen. Vær nøye med at de to
 * metodene gjør jobben med å oppdatere saldoen riktig! Tenk gjennom: Hva bør skje dersom
 * Kari prøver å ta ut 1000 kroner i denne situasjonen?
 * * */

Konto.prototype.innskudd = function (belop) {
    this.saldo += belop;
}

Konto.prototype.uttak = function (belopUttak) {
    try {
        if (this.saldo < belopUttak) {
            throw new Error("Du har ikke nok penger på kontoen");
        } else {
            this.saldo -= belopUttak;
        }
    } catch (error) {
        alert(error);
        console.log(error);
    }
}

// Test av oppgave 3
let kari = new Vanligkonto(93827100, "Kari Hansen", 895);
console.log('🎉 Kari har fått en vanlig konto med "' + kari.saldo + ' kr" kroner på kontoen');
kari.innskudd(200);
kari.uttak(300);
console.log('✅ Etter inn og uttak har Kari nå "' + kari.saldo + 'kr " kroner på kontoen');



/** 
 * Oppgave 4 - Saldoen til Kari er 429 kroner
 * Lag en metode som heter kontoInformasjon(). Den kan kalles slik:
 * kari.kontoInformasjon()
 * og skal i så fall skrive ut følgende: ”Kari Hansen med kundenummer 93827100 har 429
 * kroner på konto” dersom det er dette beløpet Kari har akkurat nå.
 * * */

Konto.prototype.kontoInformasjon = function () {
    const responseString = this.navn + " med kundenummer " + this.kundenummer + " har " + this.saldo + " kroner på konto";
    // console.log(responseString);
    return responseString;
}


/** 
 * Oppgave 5 - Din egen lille bank! Opprett tre bankkontoer
 * Dersom du har fått til oppgave 1-4, har du nok til å lage din egen enkle bankløsning! Lise
 * Jensen, Kari Hansen og Petter Olsen har hver sine bankkontoer. Lag en liten webside som
 * oppretter konto-objekter for disse tre personene. Lise er bare et lite barn. Hun får derfor 200
 * kroner i utgangspunktet fra banken. Kari og Petter er derimot voksne. Kari har 895 kroner
 * siden hun i dag har byttet bank, mens Petter har opprettet en ekstra konto og starter på
 * scratch (0 kroner). Husk at du har to ulike klasser og konstruktører som kan brukes.
 * I løpet av en dag kan så mangt skje med en bankkonto. Programmet ditt skal simulere en
 * dag, etter følgende hendelsesforløp:
 * - Klokka 10:30 – Kari tar ut 300 kroner.
 * - Klokka 11:00 – Bestefaren til Lise er i det gavmilde hjørnet, og setter inn 4000 kroner.
 * - Klokka 11:00 – Petter setter inn 3000 kroner.
 * - Klokka 12:15 – Kari overfører 250 kroner i bursdagsgave til Petter.
 * - Klokka 17:30 – Kari forsøker å ta ut 800 kroner for å kjøpe kjole til julebordet. Har hun råd
 * til det, mon tro?
 * Kod gjerne alt dette i samme knapp hvis du vil det. Du kan ikke vite hvor mye hver person
 * har på kontoen til enhver tid. Det er derfor lurt å teste på om uttak går bra. Tidspunkt og
 * saldo skal helst skrives ut. Tidspunkt registreres ikke i objektet. Det er kun navn,
 * kundenummer og saldo som skal registreres i objektet.
 * Et apropos: Du kan selvsagt regne ut resultatet for akkurat dette hendelsesforløpet, men det
 * er ikke sikkert du kunne gjort det hvis brukeren selv kunne skrevet i en tekstboks hvor mye
 * som skal inn/ut av konto... Tekstboks er forresten del av neste oppgave, mens du i denne
 * oppgaven kan hardkode alle verdier. 
 * * */

const HENDELSEFORLOP = [
    1030, // Kari tar ut 300 kroner
    1100, // Bestefaren til Lise er i det gavmilde hjørnet, og setter inn 4000 kroner
    1100, // Petter setter inn 3000 kroner
    1215, // Kari overfører 250 kroner i bursdagsgave til Petter
    1730, // Kari forsøker å ta ut 800 kroner for å kjøpe kjole til julebordet. Har hun råd til det, mon tro?
];

// Brukt for å overføre fra kari til petter kl 12:15
Konto.prototype.overfor = function (belop, mottaker) {
    this.uttak(belop);
    mottaker.innskudd(belop);
}


class BankWebside {
    constructor(kontoer, klokkeslett) {
        this.kontoer = kontoer;
        this.klokkeslett = klokkeslett;
    }

    OppdaterKontoWebside() {
        let htmlKontoer = document.getElementById("kontoer");

        // lag en ny liste om den ikk ekisterer
        if (htmlKontoer == null) {
            htmlKontoer = document.createElement("ul");
            htmlKontoer.id = "kontoer";
            // document.body.appendChild(htmlKontoer);
            document.body.insertBefore(htmlKontoer, document.body.children[1]);
        }
        htmlKontoer.innerHTML = "";
        htmlKontoer.innerHTML = "Klokkeslett: " + this.klokkeslett;

        // Oppdaterer utsjånaden til websiden
        for (const konto in this.kontoer) {
            const div = document.createElement("div");
            div.innerHTML = this.kontoer[konto].kontoInformasjon();
            htmlKontoer.appendChild(div);
        }

    }

    LeggtilHendelserBoks(hendelsetekst) {
        let htmlHendelser = document.getElementById("hendelser");
        if (htmlHendelser == null) {
            htmlHendelser = document.createElement("div");
            htmlHendelser.id = "hendelser";
            document.body.appendChild(htmlHendelser);
            //append child last in document.body


        }
        let boks = document.createElement("p");
        boks.innerHTML = hendelsetekst;
        htmlHendelser.appendChild(boks);
    }


}

// lager en webside
let webSide = new BankWebside([], 1030);

// Denne kanppen kjører hendelsesforløpet
let buttonKjorHendelse = document.createElement("button");
buttonKjorHendelse.innerHTML = "Kjør hendelsesforløp";
buttonKjorHendelse.id = "kjorHendelse";

buttonKjorHendelse.addEventListener("click", () => {
    // Finner kontiene til Kari og Per
    let kari = webSide.kontoer[0]
    let petter = webSide.kontoer[1]


    // Kjører hendelsesforløpet
    switch (webSide.klokkeslett) {
        case 1030:
            kari.uttak(300);
            webSide.LeggtilHendelserBoks("💳 Kari tar ut 300 kroner");
            break;

        case 1100:
            kari.innskudd(4000);
            webSide.LeggtilHendelserBoks("💰💰💰💰 Kari setter inn 4000 kroner");

            webSide.LeggtilHendelserBoks("💰💰💰 Petter setter inn 3000 kroner");
            petter.innskudd(3000);
            break;

        case 1215:
            kari.overfor(250, petter);
            webSide.LeggtilHendelserBoks("💁‍♀️ 🎁 🧔 Kari setter inn 4000 kroner");
            break;

        case 1730:
            kari.uttak(800);
            webSide.LeggtilHendelserBoks("💳 Kari tar ut 800 kroner");
            break;

        default:
            webSide.LeggtilHendelserBoks("🎉 Oppgaven er feridg!");
            break;
    }

    // Gå videre til neste hendelse
    webSide.klokkeslett = HENDELSEFORLOP.find(klokkeslett => klokkeslett > webSide.klokkeslett);
    if (webSide.klokkeslett) {
        buttonKjorHendelse.innerText = "Kjør hendelsesforløp kl " + webSide.klokkeslett;
    }

    // Hvis vi ikke finner noe klokkeslett, så er vi ferdig
    if (webSide.klokkeslett == undefined) {
        buttonKjorHendelse.innerText = "Programmet er ferdig";
        webSide.klokkeslett = 1800;
        buttonKjorHendelse.disabled = true;
    }

    // Første gang en åpner nettsiden må vi oppdatere siden
    webSide.OppdaterKontoWebside();
});



// Start Knappe for oppgave 5
let startOppgave5 = document.createElement("button");
startOppgave5.innerHTML = "Start Oppgave 5";
startOppgave5.onclick = () => {
    webSide.kontoer = [
        new Vanligkonto(93827100, "🤷‍♀️ Kari Hansen", 895),
        new Vanligkonto(93827101, "💁‍♂️ Petter Olsen", 0),
        new Barnekonto(93827102, "👧 Lise Jensen", 0)
    ];
    document.body.appendChild(buttonKjorHendelse);
    webSide.OppdaterKontoWebside();
    startOppgave5.disabled = true;
    startOppgave6.disabled = true;

}
document.body.appendChild(startOppgave5);


/**
 * XTRA (frivillig): Oppgave 6 - Startverdier fra brukergrensesnittet
 * I oppgave 5 skulle du hardkode startverdiene. Det er lite gunstig i en ordentlig bank-løsning.
 * Utvid programmet slik at brukeren kan få skrive inn startverdien til Kari, Lise og Petter i 3
 * tekstbokser, og angir hvorvidt hver person er et barn eller ikke. 
 * * */

// start knapp oppgave 6
let startOppgave6 = document.createElement("button");
startOppgave6.innerHTML = "Start Oppgave 6";
let navnPerson = ["🤷‍♀️ Kari Hansen", "💁‍♂️ Petter Olsen", "👧 Lise Jensen"];

startOppgave6.onclick = () => {
    startOppgave6.disabled = true;
    // create the form for adding new konto
    let form = document.createElement("form");
    form.id = "form";
    form.innerHTML = `
    <label for="kontoNr">KontoNr:</label>
    <input type="number" id="kontoNr" name="kontoNr" required><br>
    <label for="navn">Navn:</label>
    <input type="text" id="navn" name="navn" value="${navnPerson[webSide.kontoer.length ?? 0]}" required><br>
    <label for="saldo">Saldo:</label>
    <input type="number" id="saldo" name="saldo" value="0" required><br>
    <label for="erBarneKonto">Er barne konto:</label>
    <input type="checkbox" id="erBarneKonto" name="erBarneKonto"><br>
    <input type="submit" value="Submit">
`;

    // add event listener to the form
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let kontoNr = document.getElementById("kontoNr").value;
        let navn = document.getElementById("navn").value;
        let saldo = document.getElementById("saldo").value;
        let erBarneKonto = document.getElementById("erBarneKonto").checked;

        // add the new konto to the webside
        if (erBarneKonto) {
            webSide.kontoer.push(new Barnekonto(kontoNr, navn, saldo));
        } else {
            webSide.kontoer.push(new Vanligkonto(kontoNr, navn, saldo));
        }
        // console.log(webSide.kontoer.length);
        document.getElementById("navn").value = navnPerson[webSide.kontoer.length ?? 0] ?? "";
        document.getElementById("kontoNr").value = "";
        document.getElementById("saldo").value = 0;
        webSide.OppdaterKontoWebside();

        if (webSide.kontoer.length > 2) {
            startOppgave5.disabled = true;
            form.remove();
            document.body.appendChild(buttonKjorHendelse);
        }
    });
    document.body.appendChild(form);
}
document.body.appendChild(startOppgave6);
