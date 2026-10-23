// VARIABILI HTML

const formReserve = document.querySelector("#reserve");
const nomeUser = document.querySelector("#nameUser");
const cognomeUser = document.querySelector("#surnameUser");
const emailUser = document.querySelector("#emailUser");
const phoneNumberUser = document.querySelector("#phoneNumberUser");
const dataPrenotazione = document.querySelector("#dateAvailables");
const orarioPrenotazione = document.querySelector("#timesAvailable");
const changeTheme = document.querySelector(".changeTheme");
const themeIcon = document.querySelector(".changeTheme span");
const main = document.querySelector("main");
const reserve = document.querySelector(".reserve");
const inputs = document.querySelectorAll(".reserve input");
const select = document.querySelector(".reserve select");
const btnReserve = document.querySelector(".btnReserve");

// LOCALSTORAGE DELLE PRENOTAZIONI
let prenotazioni;

if (localStorage.getItem("prenotazioni") !== null) {
  prenotazioni = JSON.parse(localStorage.getItem("prenotazioni"));
} else {
  prenotazioni = [];
}

// ORARI DISPONIBILI DA INDICARE NEL DOM
const orariDisponibili = [
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
  "23:00 - 00:00",
];

// DARK MODE
changeTheme.addEventListener("click", () => {
  main.classList.toggle("dark-mode");
  reserve.classList.toggle("dark-mode");

  inputs.forEach((input) => {
    input.classList.toggle("dark-mode");
  });

  select.classList.toggle("dark-mode");
  btnReserve.classList.toggle("dark-mode");

  if (themeIcon.textContent === "dark_mode") {
    themeIcon.textContent = "light_mode";
  } else {
    themeIcon.textContent = "dark_mode";
  }
});

// ORARI DISPONIBILI INDICATI NEL DOM

function mostraOrari() {
  orarioPrenotazione.textContent = "";

  const optionDefault = document.createElement("option");
  optionDefault.value = "";
  optionDefault.textContent = "Seleziona orario";
  orarioPrenotazione.appendChild(optionDefault);

  orariDisponibili.forEach((orario) => {
    const option = document.createElement("option");

    option.textContent = orario;
    option.value = orario;

    const reserved = prenotazioni.some((prenotazione) => {
      return (
        prenotazione.giorno === dataPrenotazione.value &&
        prenotazione.orario === orario &&
        prenotazione.stato === "confermata"
      );
    });

    if (reserved) {
      option.classList.add("reserved");
      option.disabled = true;
    }

    orarioPrenotazione.appendChild(option);
  });
}

mostraOrari();

dataPrenotazione.addEventListener("change", () => {
  mostraOrari();
});

// FORM
formReserve.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!emailUser.value.includes("@")) {
    alert("Inserisci un'email valida!");
    return;
  } else if (emailUser.value.includes(" ")) {
    alert("L'email non deve contenere spazi!");
    return;
  }

  if (orarioPrenotazione.value === "") {
    alert("Devi selezionare un orario!");
    return;
  }

  const id = Date.now();

  prenotazioni.push({
    id: id,
    nome: nomeUser.value,
    cognome: cognomeUser.value,
    email: emailUser.value,
    numeroTel: phoneNumberUser.value,
    giorno: dataPrenotazione.value,
    orario: orarioPrenotazione.value,
    stato: "confermata",
  });

  localStorage.setItem("prenotazioni", JSON.stringify(prenotazioni));

  alert(
    `Prenotazione confermata correttamente! L'ID della tua prenotazione è: ${id}`,
  );

  const messaggio = document.createElement("p");

  messaggio.textContent = `Prenotazione confermata correttamente! L'ID della tua prenotazione è: ${id}`;

  messaggio.style.color = "green";

  formReserve.appendChild(messaggio);

  formReserve.reset();
});
