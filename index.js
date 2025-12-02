function makeWish() {
    const wishBy = document.getElementById('wishBy').value.trim();
    const wishTo = document.getElementById('wishTo').value.trim();
    const customMessage = document.getElementById('customMessage').value.trim();
    const photoFile = document.getElementById('photo').files[0];
    const songFile = document.getElementById('song').files[0];

    if(!wishBy || !wishTo || !customMessage) {
        alert("Please fill all the fields!");
        return;
    }

    // Display photo if uploaded
    if(photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photoPreview').src = e.target.result;
        }
        reader.readAsDataURL(photoFile);
    } else {
        document.getElementById('photoPreview').src = "";
    }

    // Display message and wisher
    document.getElementById('message').textContent = customMessage;
    document.getElementById('wisher').textContent = `- ${wishBy} to ${wishTo}`;

    // Play song if uploaded
    const audioPlayer = document.getElementById('audioPlayer');
    if(songFile) {
        const songURL = URL.createObjectURL(songFile);
        audioPlayer.src = songURL;
        audioPlayer.play();
    } else {
        audioPlayer.src = "";
    }

    document.getElementById('preview').style.display = "block";
}

// Function to send message via WhatsApp
function sendWhatsApp() {
    const wishBy = document.getElementById('wishBy').value.trim();
    const wishTo = document.getElementById('wishTo').value.trim();
    const customMessage = document.getElementById('customMessage').value.trim();

    if(!wishBy || !wishTo || !customMessage) return;

    const message = `Happy Birthday ${wishTo}! 🎉\n${customMessage}\n- ${wishBy}`;
    const encodedMessage = encodeURIComponent(message);

    // Opens WhatsApp (web or app) to send message
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
}