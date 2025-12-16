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

function openPopup() {
  const activeSection = document.querySelector('main section.active').id;

  // Mostra/nascondi campi in base alla sezione
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

function closePopup() {
  popup.classList.remove('show');
}

// Aggiungere post
function submitPost() {
  const name = popupName.value;
  const img = document.getElementById('popupImg').value;
  const video = document.getElementById('popupVideo').value;
  const text = document.getElementById('popupText').value;
  const barCount = document.getElementById('barCount').value;

  const activeFeed = document.querySelector('main section.active div');

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  // Lyrics speciale
  if(document.querySelector('main section.active').id === 'lyrics') {
    const p = document.createElement('p');
    p.textContent = `${name} (${barCount} bars): ${text}`;
    postDiv.appendChild(p);
  } else {
    if(img) {
      const imgEl = document.createElement('img');
      imgEl.src = img;
      postDiv.appendChild(imgEl);
    }
    if(video) {
      const vidEl = document.createElement('video');
      vidEl.src = video;
      vidEl.controls = true;
      postDiv.appendChild(vidEl);
    }
    if(text || name) {
      const caption = document.createElement('p');
      caption.textContent = `${name ? name + ': ' : ''}${text}`;
      postDiv.appendChild(caption);
    }
  }

  activeFeed.prepend(postDiv);

  closePopup();

  // reset campi
  popupName.value = '';
  document.getElementById('popupImg').value = '';
  document.getElementById('popupVideo').value = '';
  document.getElementById('popupText').value = '';
  document.getElementById('barCount').value = '4';
}
