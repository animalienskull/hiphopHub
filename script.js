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
const popupName = document.getElementById('popupName');
const mediaContainer = document.getElementById('mediaContainer');
const lyricsOptions = document.getElementById('lyricsOptions');
const popupText = document.getElementById('popupText');
const barCount = document.getElementById('barCount');

function openPopup() {
  const activeSection = document.querySelector('main section.active').id;

  if(activeSection === 'lyrics') {
    popupTitle.textContent = 'Add Lyrics';
    popupName.placeholder = 'Username';
    mediaContainer.style.display = 'none';
    lyricsOptions.style.display = 'block';
  } else {
    popupTitle.textContent = 'Add Post';
    if(activeSection === 'rapper') popupName.placeholder = 'Nome Rapper';
    if(activeSection === 'graffiti') popupName.placeholder = 'Nome Writer';
    if(activeSection === 'dj') popupName.placeholder = 'Nome DJ';
    mediaContainer.style.display = 'flex';
    lyricsOptions.style.display = 'none';
  }
  popup.classList.add('show');
}

function closePopup() { popup.classList.remove('show'); }

// Creazione post
function submitPost() {
  const name = popupName.value.trim();
  const text = popupText.value.trim();
  const img = document.getElementById('popupImg').value.trim();
  const video = document.getElementById('popupVideo').value.trim();
  const bars = barCount.value;

  const activeSection = document.querySelector('main section.active');
  const activeFeed = activeSection.querySelector('div');

  // Validazione
  if(!name) { alert('Devi inserire un nome.'); return; }

  if(activeSection.id === 'lyrics') {
    if(!text) { alert('Devi scrivere il testo delle lyrics.'); return; }
    const lines = text.split(/\n/);
    const maxBars = bars === '4' ? 4 : bars === '8' ? 8 : bars === '16' ? 16 : Infinity;
    if(lines.length > maxBars) {
      alert(`Hai selezionato ${bars} barre, non puoi scrivere più di ${maxBars} righe.`);
      return;
    }
  } else {
    if(!text && !img && !video) {
      alert('Devi inserire almeno un testo, un\'immagine o un video.');
      return;
    }
  }

  // Creazione post
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
    p.textContent = `${name} (${bars} bars): ${text}`;
    postDiv.appendChild(p);
  } else {
    if(img) { const imgEl = document.createElement('img'); imgEl.src = img; postDiv.appendChild(imgEl); }
    if(video) { const vidEl = document.createElement('video'); vidEl.src = video; vidEl.controls = true; postDiv.appendChild(vidEl); }
    if(text) { const caption = document.createElement('p'); caption.textContent = `${name}: ${text}`; postDiv.appendChild(caption); }
  }

  // Like / Dislike
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('post-actions');

  const likeBtn = document.createElement('button');
  const likeCounter = document.createElement('span');
  likeCounter.textContent = '0';
  likeBtn.innerHTML = '👍 ';
  likeBtn.appendChild(likeCounter);
  likeBtn.onclick = () => likeCounter.textContent = parseInt(likeCounter.textContent)+1;

  const dislikeBtn = document.createElement('button');
  const dislikeCounter = document.createElement('span');
  dislikeCounter.textContent = '0';
  dislikeBtn.innerHTML = '👎 ';
  dislikeBtn.appendChild(dislikeCounter);
  dislikeBtn.onclick = () => dislikeCounter.textContent = parseInt(dislikeCounter.textContent)+1;

  actionsDiv.appendChild(likeBtn);
  actionsDiv.appendChild(dislikeBtn);
  postDiv.appendChild(actionsDiv);

  activeFeed.prepend(postDiv);

  // Reset campi
  popupName.value = '';
  popupText.value = '';
  document.getElementById('popupImg').value = '';
  document.getElementById('popupVideo').value = '';
  barCount.value = '4';

  closePopup();
}
