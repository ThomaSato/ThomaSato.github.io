document.addEventListener('DOMContentLoaded', function() {
  const moodBoxes = document.querySelectorAll('.mood');
  const themeBoxes = document.querySelectorAll('.theme');
  const descriptionInput = document.getElementById('description');
  const generateBtn = document.getElementById('generate-btn');
  const resultDiv = document.getElementById('result');

  let selectedMood = '';
  let selectedTheme = '';
  const isKnnPage = window.location.pathname.includes('/knn');

  function selectBox(boxes, clickedBox) {
    boxes.forEach(box => box.classList.remove('selected'));
    clickedBox.classList.add('selected');
  }

  if (!isKnnPage) {
    moodBoxes.forEach(box => {
      box.addEventListener('click', function() {
        selectBox(moodBoxes, this);
        selectedMood = this.dataset.mood;
      });
    });
  }

  themeBoxes.forEach(box => {
    box.addEventListener('click', function() {
      selectBox(themeBoxes, this);
      selectedTheme = this.dataset.theme;
    });
  });

  // Remove the generateBtn event listener as it's now handled in index.html

  // Function to display lyrics on the results page
  function displayLyrics() {
    const lyricsContent = document.getElementById('lyrics-content');
    lyricsContent = text.replace(/\n/g, "<br>");
    if (lyricsContent) {
      const generatedLyrics = localStorage.getItem('generatedLyrics');
      if (generatedLyrics) {
        const lyricsLines = text.replace(/\n/g, "<br>");
        lyricsContent.innerHTML = ''; // Clear any existing content
        lyricsLines.forEach(line => {
          const p = document.createElement('p');
          p.textContent = line;
          lyricsContent.appendChild(p);
        });
      } else {
        lyricsContent.textContent = 'Sorry, we couldn\'t retrieve the generated lyrics.';
      }
    }
  }

  // Update the details on the results page
  function updateResultsPage() {
    const moodElement = document.getElementById('mood');
    const themeElement = document.getElementById('theme');
    const initialLyricsElement = document.getElementById('initial-lyrics');

    if (moodElement) moodElement.textContent = localStorage.getItem('selectedMood') || 'N/A';
    if (themeElement) themeElement.textContent = localStorage.getItem('selectedTheme') || 'N/A';
    if (initialLyricsElement) initialLyricsElement.textContent = localStorage.getItem('lyrics') || 'N/A';

    displayLyrics();
  }

  // Check if we're on the results page and update it
  if (window.location.pathname.includes('/results')) {
    updateResultsPage();
  }
});

// This function is now handled directly in index.html
// function showLoader() { ... }
