const promptText = `You are a strict music–transcription engine.

Given this audio, do **not** approximate with a single repeating note.
Transcribe the **actual musical content** as accurately as you can.

Goals (highest priority first):

1. **Correct pitches and rhythms**

   * Identify the real melody contour, not a flat or single repeated note.
   * Use rests only when there is actual silence.
   * Use appropriate note lengths (eighths, quarters, halves, etc.), not all the same.

2. **ABC notation for multiple parts**

   * Output clean ABC notation.
   * Include:

     * `X:`, `T:`, `M:` (time signature), `K:` (key), and tempo.
   * Use **multi-voice ABC** with one voice per part:

     * `V:V1 name="Lead Vocal"`
     * `V:V2 name="Guitar"`
     * `V:V3 name="Bass"`
     * `V:V4 name="Keys"` (or other instruments you detect)
   * After declaring voices, write the notes for each voice like:

     ```abc
     V:V1
     (vocal notes here)
     V:V2
     (guitar notes here)
     V:V3
     (bass notes here)
     ```
   * Make your best effort to separate parts by pitch range and timbre.

3. **Vocal line with lyrics**

   * For the vocal voice, include lyrics with `w:` lines aligned to the notes whenever words are intelligible.
   * If some lyrics are unclear, use approximate syllables and mark them with `?`.

4. **No fallback patterns**

   * Never output long stretches of the same note just to fill space.
   * If you are uncertain, still vary the notes to reflect the **up/down contour and rhythm** you hear.
   * If any passage is too dense to transcribe precisely, write a **simplified but musical** version that clearly follows the song’s melody and harmony.

5. **Output format**

   * Return **only** valid ABC notation (no explanations, no markdown).
   * Keep measures reasonably sized; use `|` bar lines.
   * The result should be ready to paste into an ABC editor and render as stacked staves.`;

function initializeDropZone() {
    const dropZone = document.getElementById('drop-zone');

    if (!dropZone) return;

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

        const { files } = event.dataTransfer;
        if (files?.length) {
            handleFiles(files);
        }
    });
}

function handleFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            console.log('File loaded:', file.name);
            transcribeAudio(arrayBuffer);
        };
        reader.readAsArrayBuffer(file);
    }
}

function transcribeAudio(arrayBuffer) {
    console.log('Transcribing audio...');
    // Placeholder for transcription logic
    fetch('https://api.example.com/transcribe', {
        method: 'POST',
        body: arrayBuffer,
        headers: {
            'Content-Type': 'audio/wav',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Transcription result:', data);
            saveTranscription(data.transcription);
        })
        .catch((error) => {
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

function populatePrompt() {
    const promptElement = document.getElementById('prompt-text');
    if (promptElement) {
        promptElement.textContent = promptText;
    }
}

function setupCopyButton() {
    const copyButton = document.getElementById('copy-prompt');
    const status = document.getElementById('copy-status');

    if (!copyButton) return;

    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            if (status) {
                status.textContent = 'Copied!';
                setTimeout(() => (status.textContent = ''), 2000);
            }
        } catch (error) {
            console.error('Unable to copy prompt:', error);
            if (status) {
                status.textContent = 'Copy failed';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDropZone();
    populatePrompt();
    setupCopyButton();
});
