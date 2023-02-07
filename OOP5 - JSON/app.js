const tableBody = document.getElementById('tablebody');

// Henter data fra fjelltopper.json
fetch('fjelltopper.json')
    .then(response => response.json())
    .then(data => {
        // Lager en kopi av data-arrayen. Gjør det letter å jobbe med ;))
        const fjelltopper = [...data];

        // Sorterer toppene etter høyde
        fjelltopper.sort((a, b) => b.hoyde - a.hoyde);

        // Lager en tabellrad for hver fjelltopp
        fjelltopper.forEach((fjelltopp, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${fjelltopp.navn}</td>
                    <td>${fjelltopp.hoyde}</td>
                    <td>${fjelltopp.fylke}</td>
                `;
            tableBody.appendChild(tr);
            console.log(fjelltopp.navn + " Har nå fått en tabellrad");
        });
        
    }).catch(error => {
        // dersom det er feil i koden over, så vil vi få en feilmelding i konsollen og på nettsiden
        console.log(error);
        document.write('Har ikke fått tilgang til dataene. Prøv igjen senere. "' + error + '"');
    });