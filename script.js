document.addEventListener("DOMContentLoaded", () => {
    // Load updates from updates.txt
    fetch('updates.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('updates-content').textContent = data;
        })
        .catch(error => {
            document.getElementById('updates-content').textContent = 'Error loading updates.';
            console.error('Error fetching updates:', error);
        });

    // Load images from /images directory
    const imageGallery = document.getElementById('image-gallery');
    fetch('images/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const links = Array.from(doc.querySelectorAll('a')).filter(link => {
                return /\.(jpe?g|png|gif)$/i.test(link.href);
            });

            if (links.length) {
                links.forEach(link => {
                    const img = document.createElement('img');
                    img.src = link.href;
                    img.alt = 'Server Image';
                    imageGallery.appendChild(img);
                });
            } else {
                imageGallery.textContent = 'No images available.';
            }
        })
        .catch(error => {
            imageGallery.textContent = 'Error loading images.';
            console.error('Error fetching images:', error);
        });

    // Load download link from link.txt
    const downloadButton = document.getElementById('download-button');
    fetch('link.txt')
        .then(response => response.text())
        .then(link => {
            downloadButton.textContent = 'Download Minecraft';
            downloadButton.disabled = false;
            downloadButton.onclick = () => {
                window.open(link.trim(), '_blank');
            };
        })
        .catch(error => {
            downloadButton.textContent = 'Error loading link';
            console.error('Error fetching download link:', error);
        });
});
