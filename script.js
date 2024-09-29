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
