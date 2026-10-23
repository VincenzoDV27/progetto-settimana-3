Sito per effettuare una prenotazione per un campo da calcio 

index.html:

In questo progetto, ho creato una piattaforma dove prenotare per gli orari disponibili di un determinato campo da calcio.
Quindi nell'index.html ho implementato:
Una navbar tramite div, con il logo del campo, il button contatti che manda giù la pagina dove per appunto c'è la sezione INFO E CONTATTI, un button per il cambio tema day/night ed infine un button che manda nella pagina ADMIN.

Nel main si trova il form da compilare, dove dev'essere obbligatoriamente indicato:
Nome
Cognome
Email
Numero di telefono
Data prenotazione
Orari disponibili
Button conferma prenotazione

Ho implementato una section per INFO E CONTATTI, con scritto l'indirizzo del campo, oppure la mappa presa direttamente dalla posizione esatta, tramite google maps, infine viene indicato il recapito telefonico del campo.

Nel footer infine viene indicato il copyright del sito e i suoi social.


admin.html:

Ho implementato un interfaccia per l'admin in modo da poter consultare le prenotazioni effettuate, con la possibilità di cercare direttamente tramite il cognome e ID (essendo dati piu soggettivi, soprattutto l'ID che è unico), oppure cercare tramite lo stato della prenotazione che può essere CONFERMATA oppure CANCELLATA.
Ho anche impostato due indicatori visivi dove mostra il conteggio delle prenotazioni confermate e cancellate.
Infine c'è l'elenco prenotazioni, dove consultare tutte le prenotazioni oppure filtrarle dalla ricerca o dallo stato prenotazione.

script.js:

Ho iniziato richiamando tutti i querySelector che mi servono per manipolare il DOM.  
Dichiaro la variabile prenotazioni e verifico con un if se ci sono oggetti già da recuperare nel localStorage oppure crea un array vuoto.
Creo un oggetto con gli orari del campo disponibili, ovvero dalle 17:00 fino a 00:00, poichè il campo si può prenotare solo 1 ora le option saranno 17:00 - 18:00, 18:00 - 19:00 ecc...
Con un semplice classList.toggle cambio le classi in modo da rendere il tutto in "dark mode".
Dalla funzione mostraOrari() mostro gli orari disponibili nel DOM con il forEach, dentro inoltre uso un array function con la const reserverd dove dico che se il giorno e l'orario corrispondono a quello selezionato e lo stato è "confermata", la const RESERVERD è true e quindi l'orario del giorno indicato è stato già prenotato e quindi aggiungo una classe "reserved", dove nel css poi viene sbarrato e scritto in rosso e modificato il background-color.
Infine c'è l'addEventListener che al submit prendo tutti gli input e li pusho dentro l'array prenotazioni.

admin.js:

Anche qui richiamo i querySelector per manipolare il DOM.
Rifaccio la stessa procedura per la variabile prenotazioni con la stessa condizione per l'if.
Inoltre, creo un array prenotazioniEliminate in modo da salvarlo e mostrarlo al DOM, visto che mi serve sia per il conteggio che per mostrarne lo stato della prenotazione.
Nella funzione mostraPrenotazioni() metto i due array di oggetti insieme (prenotazioni e prenotazioniEliminate) poichè dovranno essere comunque mostrate tutte le prenotazioni nel DOM.
Uso il metodo filter() per creare un nuovo array contenente esclusivamente le prenotazioni che soddisfano i criteri di ricerca inseriti dall'utente, come cognome, ID e stato della prenotazione, dove in caso restituisce true o false.
Dai vari if verifico poi lo stato se ha come VALORE "reserved" oppure "deleted".
Creo la table e poi in base allo stato della prenotazione gli cambio la class.
Metto il bottone elimina esclusivamente se la prenotazione ha come stato "confermata".









