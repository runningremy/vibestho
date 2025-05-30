document.getElementById('lyricForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const song = document.getElementById('song').value.trim();
  const lyrics = document.getElementById('lyrics').value.trim();
  const feeling = document.getElementById('feeling').value.trim();

  // Create entry card
  const entryCard = document.createElement('div');
  entryCard.className = 'entry-card';

  entryCard.innerHTML = `
    <div class="entry-lyric">${lyrics.replace(/\n/g, '<br>')}</div>
    <div class="entry-meta">${song ? `— ${song}` : ""}</div>
    <div class="entry-feeling">💬 ${feeling}</div>
  `;

  // Add to entries list
  document.getElementById('entries').prepend(entryCard);

  // Clear form
  this.reset();
});
