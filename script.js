document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    });
});

function handleFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            // Process the audio/video file here
            console.log('File loaded:', file.name);
            // Placeholder for transcription logic
        };
        reader.readAsArrayBuffer(file);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    });
});

function handleFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            // Process the audio/video file here
            console.log('File loaded:', file.name);
            // Placeholder for transcription logic
            transcribeAudio(arrayBuffer);
        };
        reader.readAsArrayBuffer(file);
    }
}

function transcribeAudio(arrayBuffer) {
    // Function to send the audio data to a transcription service
    // and handle the response
    console.log('Transcribing audio...');
    // Example placeholder logic for transcription
    fetch('https://api.example.com/transcribe', {
        method: 'POST',
        body: arrayBuffer,
        headers: {
            'Content-Type': 'audio/wav', // or the correct mime type for the file
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Transcription result:', data);
        saveTranscription(data.transcription);
    })
    .catch(error => {
        console.error('Error transcribing audio:', error);
    });
}

function saveTranscription(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transcription.txt';
    link.click();
}
