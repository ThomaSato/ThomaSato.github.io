document.addEventListener('DOMContentLoaded', function() {
  const mood = localStorage.getItem('selectedMood');
  const theme = localStorage.getItem('selectedTheme');
  const initialLyrics = localStorage.getItem('lyrics');

  document.getElementById('mood').textContent = mood;
  document.getElementById('theme').textContent = theme;
  document.getElementById('initial-lyrics').textContent = initialLyrics;

  // Fetch the generated song from the server
  fetch('/get-generated-song')
      .then(response => response.json())
      .then(data => {
          document.getElementById('lyrics').textContent = data.lyrics;
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('lyrics').textContent = 'An error occurred while fetching the song.';
      });
});
