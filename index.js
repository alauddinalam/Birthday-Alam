const wishForm = document.getElementById('wishForm');
const formPage = document.getElementById('formPage');
const resultPage = document.getElementById('resultPage');
const formError = document.getElementById('formError');
const audioPlayer = document.getElementById('audioPlayer');
const photoPreview = document.getElementById('photoPreview');
let photoUrl = '';
let songUrl = '';

photoPreview.addEventListener('error', () => {
    formError.textContent = 'That photo could not be displayed. Please choose another image.';
    resultPage.classList.add('hidden');
    formPage.classList.remove('hidden');
});

wishForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.textContent = '';

    const wishBy = document.getElementById('wishBy').value.trim();
    const wishTo = document.getElementById('wishTo').value.trim();
    const customMessage = document.getElementById('customMessage').value.trim();
    const photoFile = document.getElementById('photo').files[0];
    const songFile = document.getElementById('song').files[0];

    if (!wishBy || !wishTo || !customMessage || !photoFile || !songFile) {
        formError.textContent = 'Please complete every field, including the photo and song.';
        return;
    }

    photoUrl = URL.createObjectURL(photoFile);
    songUrl = URL.createObjectURL(songFile);
    photoPreview.src = photoUrl;
    photoPreview.alt = `Birthday memory for ${wishTo}`;
    document.getElementById('resultName').textContent = wishTo;
    document.getElementById('message').textContent = customMessage;
    document.getElementById('wisher').textContent = `With love, ${wishBy}`;
    audioPlayer.src = songUrl;
    audioPlayer.load();
    formPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    audioPlayer.play().catch(() => {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('shareBtn').addEventListener('click', () => {
    const wishTo = document.getElementById('wishTo').value.trim();
    const wishBy = document.getElementById('wishBy').value.trim();
    const customMessage = document.getElementById('customMessage').value.trim();
    const message = `Happy Birthday ${wishTo}!\n${customMessage}\nWith love, ${wishBy}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('newWishBtn').addEventListener('click', () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    if (songUrl) URL.revokeObjectURL(songUrl);
    audioPlayer.pause();
    audioPlayer.removeAttribute('src');
    wishForm.reset();
    resultPage.classList.add('hidden');
    formPage.classList.remove('hidden');
    document.getElementById('wishBy').focus();
});