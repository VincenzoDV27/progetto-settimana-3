const listReserved = document.querySelector("#list-reserved");
const cognome = document.querySelector("#cognome");
const idReservation = document.querySelector("#idReservation");
const filtro = document.querySelector("#filtro");
const totaleConfermate = document.querySelector("#totale-confermate");
const totaleEliminate = document.querySelector("#totale-eliminate");
const formSearch = document.querySelector("#form-search");

let prenotazioni;

//LOCALSTORAGE PRENOTAZIONI []
if (localStorage.getItem("prenotazioni") !== null) {
  prenotazioni = JSON.parse(localStorage.getItem("prenotazioni"));
} else {
  prenotazioni = [];
}

//LOCALSTORAGE PRENOTAZIONI ELIMINATE []
let prenotazioniEliminate;
if (localStorage.getItem("prenotazioniEliminate") !== null) {
  prenotazioniEliminate = JSON.parse(
    localStorage.getItem("prenotazioniEliminate"),
  );
} else {
  prenotazioniEliminate = [];
}

function mostraPrenotazioni() {
  listReserved.textContent = "";

  const tuttePrenotazioni = prenotazioni.concat(prenotazioniEliminate);

  //nuovo array con prenotazioni in base alla condizione
  const prenotazioniFiltrate = tuttePrenotazioni.filter((prenotazione) => {
    //ricerca non dipendente da caps o lower
    const cognomeCercato = cognome.value.toLowerCase();
    const idCercato = idReservation.value.trim();

    const corrispondeId = String(prenotazione.id).includes(idCercato);
    const corrispondeCognome = prenotazione.cognome
      .toLowerCase()
      .includes(cognomeCercato);

    // messo true in modo da inizialmente consultare tutte le prenotazioni
    let corrispondeStato = true;

    if (filtro.value === "reserved") {
      corrispondeStato = prenotazione.stato === "confermata";
    } else if (filtro.value === "deleted") {
      corrispondeStato = prenotazione.stato === "eliminata";
    }

    return corrispondeCognome && corrispondeId && corrispondeStato;
  });

  //   CREAZIONE CONTENUTO TABLE
  prenotazioniFiltrate.forEach((prenotazione) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = prenotazione.id;

    const tdNome = document.createElement("td");
    tdNome.textContent = prenotazione.nome;

    const tdCognome = document.createElement("td");
    tdCognome.textContent = prenotazione.cognome;

    const tdGiorno = document.createElement("td");
    const data = prenotazione.giorno.split("-");
    tdGiorno.textContent = `${data[2]}/${data[1]}/${data[0]}`;

    const tdOrario = document.createElement("td");
    tdOrario.textContent = prenotazione.orario;

    const tdStato = document.createElement("td");
    const stato = document.createElement("span");

    stato.textContent = prenotazione.stato.toUpperCase();
    stato.classList.add("stato");

    // CAMBIO CLASSE IN BASE ALLO STATO PRENOTAZIONE
    if (prenotazione.stato === "confermata") {
      stato.classList.add("confermata");
    } else {
      stato.classList.add("eliminata");
    }

    tdStato.appendChild(stato);

    // CREA BOTTONE ELIMINA SOLO SE LA PRENOTAZIONE RISULTA CONFERMATA
    const tdAzioni = document.createElement("td");

    if (prenotazione.stato === "confermata") {
      const btnElimina = document.createElement("button");
      btnElimina.textContent = "Elimina";
      btnElimina.classList.add("btn-elimina");

      btnElimina.addEventListener("click", () => {
        const indice = prenotazioni.findIndex((p) => p.id === prenotazione.id);

        if (indice !== -1) {
          const eliminata = prenotazioni.splice(indice, 1)[0];

          eliminata.stato = "eliminata";
          prenotazioniEliminate.push(eliminata);
          alert(
            `Prenotazione eliminata!\nID: ${eliminata.id}\nNome: ${eliminata.nome}\nCognome: ${eliminata.cognome}`,
          );

          localStorage.setItem("prenotazioni", JSON.stringify(prenotazioni));
          localStorage.setItem(
            "prenotazioniEliminate",
            JSON.stringify(prenotazioniEliminate),
          );

          //   AL SUO CLICK AGGIORNA PRENOTAZIONI E RIEPILOGO
          mostraPrenotazioni();
          aggiornaRiepilogo();
        }
      });

      tdAzioni.appendChild(btnElimina);
    }

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCognome);
    tr.appendChild(tdGiorno);
    tr.appendChild(tdOrario);
    tr.appendChild(tdStato);
    tr.appendChild(tdAzioni);

    listReserved.appendChild(tr);
  });
}

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  mostraPrenotazioni();
});

function aggiornaRiepilogo() {
  totaleConfermate.textContent = prenotazioni.length;
  totaleEliminate.textContent = prenotazioniEliminate.length;
}

cognome.addEventListener("input", mostraPrenotazioni);
idReservation.addEventListener("input", mostraPrenotazioni);
filtro.addEventListener("change", mostraPrenotazioni);

// EXEC
mostraPrenotazioni();
aggiornaRiepilogo();
