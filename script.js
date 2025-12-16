let currentSection='rapper';

// TAB SWITCH
function openTab(tab){
  document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  event.currentTarget.classList.add('active');
  currentSection=tab;
}

// POPUP
function openPopup(){
  document.getElementById('popup').style.display='flex';
  document.getElementById('popupUser').value='';
  document.getElementById('popupImg').value='';
  document.getElementById('popupVideo').value='';
  document.getElementById('popupText').value='';

  if(currentSection==='lyrics'){
    document.getElementById('lyricsOptions').style.display='block';
    document.getElementById('popupImg').style.display='none';
    document.getElementById('popupVideo').style.display='none';
  } else {
    document.getElementById('lyricsOptions').style.display='none';
    document.getElementById('popupImg').style.display='block';
    document.getElementById('popupVideo').style.display='block';
  }
}
function closePopup(){ document.getElementById('popup').style.display='none'; }

// COUNT BARS (Lyrics)
function countBars(text){
  return text.split(/\r?\n/).filter(l=>l.trim()!=='').length;
}

// ADD POST
function submitPost(){
  let user=document.getElementById('popupUser').value;
  let img=document.getElementById('popupImg').value;
  let video=document.getElementById('popupVideo').value;
  let text=document.getElementById('popupText').value;
  if(!user||!text) return alert('Username and content required!');

  if(currentSection==='lyrics'){
    let barCount=document.getElementById('barCount').value;
    if(barCount!=='free' && countBars(text) > parseInt(barCount)){
      return alert(`You selected ${barCount} bars. You cannot exceed this number!`);
    }
  }

  let post={user,img,video,text,date:new Date().toLocaleString(),likes:0,comments:[],liked:false};
  if(currentSection==='lyrics') post.barCount=document.getElementById('barCount').value;

  const data=JSON.parse(localStorage.getItem(currentSection))||[];
  data.unshift(post);
  localStorage.setItem(currentSection,JSON.stringify(data));
  closePopup();
  loadAllFeeds();
}

// DELETE POST
function deletePost(type,index){
  if(!confirm("Are you sure you want to delete this post?")) return;
  let data=JSON.parse(localStorage.getItem(type));
  data.splice(index,1);
  localStorage.setItem(type,JSON.stringify(data));
  loadFeed(type);
}

// LOAD FEED
function loadFeed(type){
  const feed=document.getElementById(type+'Feed');
  const data=JSON.parse(localStorage.getItem(type))||[];
  feed.innerHTML='';
  data.forEach((p,i)=>{
    const div=document.createElement('div');
    div.className='post';
    let media='';
    if(type!=='lyrics'){
      if(p.img) media+=`<img src="${p.img}">`;
      if(p.video) media+=`<video controls src="${p.video}"></video>`;
    }
    let barInfo='';
    if(type==='lyrics' && p.barCount) barInfo=`<small>Bars: ${p.barCount}</small>`;
    div.innerHTML=`
      <div class="delete-post" onclick="deletePost('${type}',${i})">…</div>
      ${media}
      <div class="post-content">
        <div class="username">${p.user}</div>
        <div class="caption">${p.text}</div>
        <small>${p.date}</small>
        ${barInfo}
      </div>
      <div class="post-actions">
        <span onclick="toggleLike('${type}',${i})" class="${p.liked?'liked':''}">❤️ ${p.likes}</span>
        <span onclick="addComment('${type}',${i})">💬 ${p.comments.length}</span>
      </div>
    `;
    feed.appendChild(div);
  });
}

// LIKE
function toggleLike(type,index){
  const data=JSON.parse(localStorage.getItem(type));
  let post=data[index];
  if(post.liked){ post.likes--; post.liked=false; }
  else { post.likes++; post.liked=true; }
  data[index]=post;
  localStorage.setItem(type,JSON.stringify(data));
  loadFeed(type);
}

// COMMENT
function addComment(type,index){
  const comment=prompt("Enter comment:");
  if(!comment) return;
  const data=JSON.parse(localStorage.getItem(type));
  data[index].comments.push(comment);
  localStorage.setItem(type,JSON.stringify(data));
  loadFeed(type);
}

// LOAD ALL FEEDS
function loadAllFeeds(){
  ['rapper','graffiti','dj','lyrics'].forEach(loadFeed);
}

// INIT
loadAllFeeds();