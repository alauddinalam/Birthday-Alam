const wishForm = document.getElementById('wishForm');
const formPage = document.getElementById('formPage');
const resultPage = document.getElementById('resultPage');
const formError = document.getElementById('formError');
const audioPlayer = document.getElementById('audioPlayer');
const photoPreview = document.getElementById('photoPreview');
const photoInput = document.getElementById('photo');
const imagePreview = document.getElementById('imagePreview');
const selectedPhotoPreview = document.getElementById('selectedPhotoPreview');
const imagePreviewText = document.getElementById('imagePreviewText');
let photoUrl = '';
let songUrl = '';

function updateImagePreview() {
    const photoFile = photoInput.files[0];
    const imageSize = document.querySelector('input[name="imageSize"]:checked').value;

    imagePreview.classList.toggle('preview-small', imageSize === 'small');
    imagePreviewText.textContent = `${imageSize === 'small' ? 'Small' : 'Large'} image preview is ready.`;

    if (photoFile) {
        if (photoUrl) URL.revokeObjectURL(photoUrl);
        photoUrl = URL.createObjectURL(photoFile);
        selectedPhotoPreview.src = photoUrl;
        imagePreview.classList.remove('hidden');
    }
}

photoInput.addEventListener('change', updateImagePreview);
document.querySelectorAll('input[name="imageSize"]').forEach((sizeInput) => {
    sizeInput.addEventListener('change', updateImagePreview);
});

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
    const imageSize = document.querySelector('input[name="imageSize"]:checked').value;

    if (!wishBy || !wishTo || !customMessage || !photoFile || !songFile) {
        formError.textContent = 'Please complete every field, including the photo and song.';
        return;
    }

    if (!photoUrl) photoUrl = URL.createObjectURL(photoFile);
    songUrl = URL.createObjectURL(songFile);
    photoPreview.src = photoUrl;
    photoPreview.alt = `Birthday memory for ${wishTo}`;
    document.querySelector('.wish-photo').classList.toggle('image-small', imageSize === 'small');
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
    imagePreview.classList.add('hidden');
    selectedPhotoPreview.removeAttribute('src');
    resultPage.classList.add('hidden');
    formPage.classList.remove('hidden');
    document.getElementById('wishBy').focus();
});