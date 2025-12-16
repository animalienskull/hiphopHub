// Cambiare tab
function openTab(tabName) {
  document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');

  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`nav button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Popup
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const nameInputContainer = document.getElementById('nameInputContainer');
const lyricsOptions = document.getElementById('lyricsOptions');
const mediaContainer = document.getElementById('mediaContainer');
const popupName = document.getElementById('popupName');
const popupText = document.getElementById('popupText');
const barCount = document.getElementById('barCount');

function openPopup() {
  const activeSection = document.querySelector('main section.active').id;

  if(activeSection === 'lyrics') {
    popupTitle.textContent = 'Add Lyrics';
    nameInputContainer.style.display = 'block';
    popupName.placeholder = 'Username';
    mediaContainer.style.display = 'none';
    lyricsOptions.style.display = 'block';
  } else {
    popupTitle.textContent = 'Add Post';
    nameInputContainer.style.display = 'block';
    lyricsOptions.style.display = 'none';
    mediaContainer.style.display = 'flex';

    if(activeSection === 'rapper') popupName.placeholder = 'Nome Rapper';
    if(activeSection === 'graffiti') popupName.placeholder = 'Nome Writer';
    if(activeSection === 'dj') popupName.placeholder = 'Nome DJ';
  }

  popup.classList.add('show');
}

function closePopup() { popup.classList.remove('show'); }

// Creazione post
function submitPost() {
  const name = popupName.value.trim();
  const img = document.getElementById('popupImg').value.trim();
  const video = document.getElementById('popupVideo').value.trim();
  const text = popupText.value.trim();
  const selectedBars = barCount.value;

  const activeSection = document.querySelector('main section.active');
  const activeFeed = activeSection.querySelector('div');

  // Restrizioni Lyrics
  if(activeSection.id === 'lyrics') {
    const maxBars = selectedBars === '4' ? 4 :
                    selectedBars === '8' ? 8 :
                    selectedBars === '16' ? 16 : Infinity;
    const lines = text.split(/\n/);
    if(lines.length > maxBars) {
      alert(`Hai selezionato ${selectedBars} barre, non puoi scrivere più di ${maxBars} righe.`);
      return;
    }
  }

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  // Tre puntini
  const optionsBtn = document.createElement('div');
  optionsBtn.classList.add('options-btn');
  optionsBtn.textContent = '⋮';
  const optionsMenu = document.createElement('div');
  optionsMenu.classList.add('options-menu');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Elimina';
  deleteBtn.onclick = () => postDiv.remove();
  optionsMenu.appendChild(deleteBtn);
  optionsBtn.onclick = () => optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';

  postDiv.appendChild(optionsBtn);
  postDiv.appendChild(optionsMenu);

  // Contenuto
  if(activeSection.id === 'lyrics') {
    const p = document.createElement('p');
    p.textContent = `${name} (${selectedBars} bars): ${text}`;
    postDiv.appendChild(p);
  } else {
    if(img) { const imgEl = document.createElement('img'); imgEl.src = img; postDiv.appendChild(imgEl); }
    if(video) { const vidEl = document.createElement('video'); vidEl.src = video; vidEl.controls = true; postDiv.appendChild(vidEl); }
    if(text || name) { const caption = document.createElement('p'); caption.textContent = `${name ? name+': ' : ''}${text}`; postDiv.appendChild(caption); }
  }

  activeFeed.prepend(postDiv);

  // Reset campi
  popupName.value = '';
  document.getElementById('popupImg').value = '';
  document.getElementById('popupVideo').value = '';
  popupText.value = '';
  barCount.value = '4';

  closePopup();
}
