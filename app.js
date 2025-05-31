// For demo purposes: store entries in localStorage
function saveEntries(entries) {
  localStorage.setItem('vibesthoEntries', JSON.stringify(entries));
}
function loadEntries() {
  return JSON.parse(localStorage.getItem('vibesthoEntries') || '[]');
}

// Form handling
document.getElementById('lyricForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const song = document.getElementById('song').value.trim();
  const lyrics = document.getElementById('lyrics').value.trim();
  const feeling = document.getElementById('feeling').value.trim();

  // Save entry
  const entries = loadEntries();
  entries.unshift({
    song,
    lyrics,
    feeling,
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
    `;
    entriesDiv.appendChild(card);
  }
}

// Initial render on page load
renderEntries();
