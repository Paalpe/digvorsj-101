/**
 * Oppgave 1 - Lag en klasse: Bil
 * Lag en klasse som heter Bil. La denne klassen ha objektvariablene "registreringsnr”,
 * ”merke”, ”årsmodell” og ”hastighet”. 
 * 
 */

class Bil {
    constructor(registreringsnr, merke, årsmodell, hastighet) {
        this.registreringsnr = registreringsnr;
        this.merke = merke;
        this.årsmodell = årsmodell;
        this.hastighet = hastighet;
    }
}

/**
 * Oppgave 2 - Registrer bilobjekter
 * Lag tre bilobjekter og sørg for at objektvariablene får innhold. Kall variablene det du vil, for
 * eksempel volvo, ferrari og lada. 
 */

const volvo = new Bil("AB12345", " 🚗 Volvo", 2010, 200);
const ferrari = new Bil("CD67890", " 🚙 Ferrari", 2015, 300);
const lada = new Bil("EF13579", " 🏎️ Lada", 2018, 100);

/**
 * Oppgave 3 - Metoder i klassen Bil
 * Vi tenker oss at egenskapen ”hastighet” skal antyde hvor stor fart bilen har akkurat nå, målt i
 * antall kilometer i timen. Lag en metode som heter gass() for klassen Bil. Denne metoden skal
 * øke farten til bilen med tallet 10. Vi tenker oss her at 10 står for antall kilometer i timen. Lag
 * også en metode som heter brems() som skal redusere farten til bilen med 10. 
 */

Bil.prototype.gass = function () {
    this.hastighet += 10;
}

Bil.prototype.brems = function () {
    this.hastighet -= 10;
}

Bil.prototype.display = function (label) {
    label.innerText = this.merke + " " + this.hastighet + " km/t";
}

/**
 * Oppgave 4 - Kjør bilen fremover
 * Lag et program der bilene skal kunne kjøre fremover ved at brukeren skal kunne trykke på
 * seks ulike knapper. Ved trykk på den ene knappen, skal den første bilen (volvo) øke farten
 * med 10. Tilsvarende skal det være en annen knapp for å redusere farten. Trykker brukeren 3
 * ganger på gass-knappen, så skal altså bilen ha 30 km/t som fart. Lag tilsvarende knapper for
 * alle bilene.
 * Hint: Bruk metoden gass().
 * Spørsmål som er verdt å stille seg: Er det nok å bruke lokale variabler når du oppretter
 * bilobjektene i dette tilfellet? 
 */
const listCars = [volvo, ferrari, lada];

for (const car in listCars) { 
    const div = document.createElement("div");
    const label = document.createElement("label");
    const gassBtn = document.createElement("button");
    const bremsBtn = document.createElement("button");
    label.innerText = listCars[car].merke + " " + listCars[car].hastighet + " km/t";
    gassBtn.innerText = "Gass";
    bremsBtn.innerText = "Brems";



    gassBtn.onclick = () => {
        listCars[car].gass();
        listCars[car].display(label);
        // console.log(listCars[car].hastighet);
    }

    bremsBtn.onclick = () => {
        listCars[car].brems();
        listCars[car].display(label);
        // console.log(listCars[car].hastighet);
    }

    //apeendchild all to div
    div.appendChild(bremsBtn);
    div.appendChild(gassBtn);
    div.appendChild(label);

    document.body.appendChild(div);
}









