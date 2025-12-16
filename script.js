// Cambiare tab
function openTab(tabName) {
  document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');

  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`nav button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Popup
const popup = document.getElementById('popup');

function openPopup() {
  popup.classList.add('show');
}

function closePopup() {
  popup.classList.remove('show');
}

// Aggiungere post (semplice)
function submitPost() {
  const user = document.getElementById('popupUser').value;
  const img = document.getElementById('popupImg').value;
  const video = document.getElementById('popupVideo').value;
  const text = document.getElementById('popupText').value;

  const activeFeed = document.querySelector('main section.active div');

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

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

  if(text || user) {
    const caption = document.createElement('p');
    caption.textContent = `${user ? user + ': ' : ''}${text}`;
    postDiv.appendChild(caption);
  }

  activeFeed.prepend(postDiv);

  closePopup();

  // resettare campi
  document.getElementById('popupUser').value = '';
  document.getElementById('popupImg').value = '';
  document.getElementById('popupVideo').value = '';
  document.getElementById('popupText').value = '';
}
