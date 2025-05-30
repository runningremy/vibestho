document.getElementById('lyricForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const song = document.getElementById('song').value.trim();
  const artist = document.getElementById('artist').value.trim();
  const lyric = document.getElementById('lyric').value.trim();
  const feeling = document.getElementById('feeling').value.trim();

  // Create entry card
  const entryCard = document.createElement('div');
  entryCard.className = 'entry-card';

  entryCard.innerHTML = `
    <div class="entry-lyric">"${lyric}"</div>
    <div class="entry-meta">— ${song} by ${artist}</div>
    <div class="entry-feeling">💬 ${feeling}</div>
  `;

  // Add to entries list
  document.getElementById('entries').prepend(entryCard);

  // Clear form
  this.reset();
});
