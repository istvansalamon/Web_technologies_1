let mentettTermekek = JSON.parse(localStorage.getItem('termekek')) || [];

// tömb létrehozása a termékeknek
let termekek = mentettTermekek || [];

// kezdeti termékek inicializállása
if (termekek.length === 0) {
    termekek = [
      { nev: 'alma.jpg', leiras: 'gyumulcs', ar: 650, kep: 'alma.jpg' },
      { nev: 'szilva', leiras: 'gyumulcs', ar: 1200, kep: 'szilva.jpg' },
      { nev: 'uborka', leiras: 'zoldseg', ar: 450, kep: 'uborka.jpg' },
      { nev: 'retek', leiras: 'zoldseg', ar: 399, kep: 'retek.jpg' }
    ];

  // localStorage-ba menti a termékeket
  localStorage.setItem('termekek', JSON.stringify(termekek));
}

// termékek felvitele
function felvitel() {
    const termekNevElem = document.getElementById('termekNev');
    const termekLeirasElem = document.getElementById('termekLeiras');
    const termekArElem = document.getElementById('termekAr');
    const termekKepElem = document.getElementById('termekKep');
  
    const termekNev = termekNevElem.value;
    const termekLeiras = termekLeirasElem.value;
    const termekAr = termekArElem.valueAsNumber;
    const termekKep = termekKepElem.value;
  
    if (!termekNev.trim() || !termekLeiras.trim() || isNaN(termekAr)) {
      alert('Kérjük, töltse ki az összes kötelező mezőt helyesen!');
      
      // szegélyek pirosra változtatása ha nincs kitöltve
      if (!termekNev.trim()) {
        termekNevElem.style.borderColor = 'red';
      }
  
      if (!termekLeiras.trim()) {
        termekLeirasElem.style.borderColor = 'red';
      }
  
      if (isNaN(termekAr)) {
        termekArElem.style.borderColor = 'red';
      }
  
      return;
    }
    // vissza alapértelmezetre
    termekNevElem.style.borderColor = '';
    termekLeirasElem.style.borderColor = '';
    termekArElem.style.borderColor = '';
    termekKepElem.style.borderColor = '';
  

  // új termék objektum 
  const ujTermek = {
    nev: termekNev,
    leiras: termekLeiras,
    ar: termekAr,
    kep: termekKep
  };

  // termékek hozzáadása a tömbhöz
  termekek.push(ujTermek);

  // űrlap resetelése
  document.getElementById('ujTermekForm').reset();

  // termékek listázása 
  listazasFrissites();

  // mentés a localStorage-ba
  localStorage.setItem('termekek', JSON.stringify(termekek));

  // terméklista táblázat opacity tulajdonságának beállítása
  const termekLista = document.getElementById('termekLista');
  termekLista.style.opacity = 1;
}


// termékek listázása
function listazasFrissites() {
    const termekListaElem = document.getElementById('termekLista');
  
    if (!termekListaElem) {
      console.error('Hiba: Az elem nem található.');
      return;
    }
  
    // termékeket hozzáadjuk a listához
    termekek.forEach((termek, index) => {
      const listItem = document.createElement('tr');
      listItem.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${termek.nev}</td>
        <td>${termek.leiras}</td>
        <td>${termek.ar} Ft</td>  
      `;

    
      // kép elem létrehozása
      const kepElem = document.createElement('img');
      kepElem.style.maxWidth = '100px';
      kepElem.src = `pics/${termek.nev}.jpg`;
      kepElem.alt = `${termek.nev} képe`;
      listItem.lastElementChild.appendChild(kepElem);
  
      // kattintasra megjelenik eltunik a kep
      listItem.addEventListener('click', () => KepMegjelenes(kepElem));
  
      termekListaElem.appendChild(listItem);

      console.log('Listázás frissítve:', termek);
      console.log('Listázás kepnevek:', termek.nev);
    
    });
  }

  function KepMegjelenes(kepElem) {
    // kép jelenleg látható-e
    const jelenlegLathato = kepElem.style.display !== 'none';
  
    // átállítja a kép láthatóságát az ellenkezőjére
    kepElem.style.display = jelenlegLathato ? 'none' : 'block';

    
  }
  
  

// termékek listáját frissíti
listazasFrissites();
