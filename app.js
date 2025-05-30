// --- Replace the below config with your Firebase project config ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ...other config from your Firebase console...
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const formSection = document.getElementById('formSection');
const entriesSection = document.getElementById('entriesSection');
const pleaseSignIn = document.getElementById('pleaseSignIn');

// For demo purposes: store entries in localStorage (replace with database for production)
function saveEntries(entries) {
  localStorage.setItem('vibesthoEntries', JSON.stringify(entries));
}
function loadEntries() {
  return JSON.parse(localStorage.getItem('vibesthoEntries') || '[]');
}

// Auth UI logic
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
  if (user) {
    userName.textContent = user.displayName || user.email;
    signInBtn.style.display = 'none';
    userInfo.style.display = 'inline';
    formSection.style.display = '';
    entriesSection.style.display = '';
    pleaseSignIn.style.display = 'none';
    renderEntries();
  } else {
    userName.textContent = '';
    signInBtn.style.display = 'inline';
    userInfo.style.display = 'none';
    formSection.style.display = 'none';
    entriesSection.style.display = 'none';
    pleaseSignIn.style.display = '';
  }
});

// Form handling
document.getElementById('lyricForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const song = document.getElementById('song').value.trim();
  const lyrics = document.getElementById('lyrics').value.trim();
  const feeling = document.getElementById('feeling').value.trim();

  // Save entry (with user info)
  const entries = loadEntries();
  entries.unshift({
    song,
    lyrics,
    feeling,
    user: user.displayName || user.email,
    timestamp: Date.now()
  });
  saveEntries(entries);

  // Update display
  renderEntries();

  // Clear form
  this.reset();
});

// Display entries
function renderEntries() {
  const entries = loadEntries();
  const entriesDiv = document.getElementById('entries');
  entriesDiv.innerHTML = '';
  for (const entry of entries) {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.innerHTML = `
      <div class="entry-lyric">${entry.lyrics.replace(/\n/g, '<br>')}</div>
      <div class="entry-meta">${entry.song ? `— ${entry.song}` : ""}</div>
      <div class="entry-feeling">💬 ${entry.feeling}</div>
      <div class="entry-user">Shared by ${entry.user}</div>
    `;
    entriesDiv.appendChild(card);
  }
}
