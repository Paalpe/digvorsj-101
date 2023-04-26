let firkantModus = false;

class Boble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        // Oppgave 1: Lag en tilfeldig farge
        this.farge = "hsl(" + Math.random() * 360 + ", 90%, 60%)"
        this.fargeStart = this.farge;

    }
    flytt() {

        // Oppgave 3: Gjør at boblene beveger seg i en tilfeldig retning men ikke ut av canvas
        this.x += Math.random() * 10 - 5;
        this.y += Math.random() * 10 - 5;

        if (this.x + this.r > canvas.width) {
            this.x = canvas.width - this.r;
        }
        if (this.x < 0 + this.r) {
            this.x = 0 + this.r;
        }
        if (this.y + this.r > canvas.height) {
            this.y = canvas.height - this.r;
        }
        if (this.y < 0 + this.r) {
            this.y = 0 + this.r;
        }




    }
    vis() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.farge;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    inneholder(musx, musy) {
        let a = musx - this.x;
        let b = musy - this.y;
        let d = Math.sqrt(a * a + b * b);

        if (d < this.r) {
            return true;
        } else {
            return false;
        }
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", musklikk, false);
canvas.addEventListener("mousemove", musbeveg, false);

var bobler = [];

for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let r = Math.floor(Math.random() * 40 + 10);
    bobler[i] = new Boble(x, y, r);
}


setInterval(tegn, 100);

function tegn() {
    reset();
    for (let i = 0; i < bobler.length; i++) {
        bobler[i].flytt();
        bobler[i].vis();
    }
}

function reset() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function musklikk(event) {
    event = getMousePos(canvas, event);
    var fikkvalgtenboble = false;

    for (let i = 0; i < bobler.length; i++) {
        if (bobler[i].inneholder(event.x, event.y)) {
            bobler.splice(i, 1);
            fikkvalgtenboble = true;
        }
    }

    if (fikkvalgtenboble == false) {
        lagNyBoble(event.x, event.y);
    }
}

function musbeveg(event) {
    event = getMousePos(canvas, event);
    for (let i = 0; i < bobler.length; i++) {
        if (bobler[i].inneholder(event.x, event.y)) {
            bobler[i].farge = "red";
        } else {
            // oppgave 1: Gjør at boblene får sin opprinnelige farge igjen
            bobler[i].farge = bobler[i].fargeStart;
        }
    }
}

// Finner posisjonen, siden canvas er relativt til vinduet
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


// Oppgave 2 - Lag nye bobler hvert sekund
setInterval(
    () => {
        //Lag en ny boble med tilfeldig posisjon innenfor canvas størrelsen
        let x = Math.floor(Math.random() * canvas.width);
        let y = Math.floor(Math.random() * canvas.height);
        lagNyBoble(x, y);
    }
    , 1000);

function lagNyBoble(x, y) {
    let r = Math.floor(Math.random() * 40 + 10);
    let b = firkantModus ? new FirkantetBoble(x, y, r) : new Boble(x, y, r);
    bobler.push(b);
}



// Oppgave 4 - Hør etter tastetrykk og setter til firkant modus

// hør etter spacebar tastetrykk
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        //Hvis spacebar er trykket på, sett til firkant modus
        firkantModus = !firkantModus;
        const title = document.getElementById("utseende");
        const card = document.getElementById("card");

        title.innerHTML =
        (firkantModus ? " ▢ Firkant" : " ◯ Vanlige") + "bobler"

        card.style.borderRadius = firkantModus ? "8px" : "32px";
        card.animate([
            { transform: 'scale(1.1)', opacity: 0.5 },
            {
                transform: 'scale(1)', opacity: 1
            }
        ], {
            duration: 160,
            iterations: 1
        });

    }
});

// Oppgave 4 for å lage firkantet boble
class FirkantetBoble extends Boble {
    constructor(x, y, r) {
        super(x, y, r);
    }
    vis() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.r, this.r);
        ctx.fillStyle = this.farge;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}