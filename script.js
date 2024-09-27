document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const contentContainer = document.getElementById('content');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('preview-container');
    const uploadBtn = document.getElementById('uploadBtn');

   
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === 'admin' && password === 'password123') {
            loginContainer.classList.add('hidden');
            contentContainer.classList.remove('hidden');
        } else {
            alert('Invalid credentials. Try again.');
        }
    });

   
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        previewContainer.innerHTML = ''; 
        if (file) {
            const fileType = file.type;
            
            if (fileType.startsWith('image/')) {
                const imgPreview = document.createElement('img');
                imgPreview.src = URL.createObjectURL(file);
                previewContainer.appendChild(imgPreview);
                uploadBtn.classList.remove('hidden');
            } else if (fileType.startsWith('video/')) {
                const videoPreview = document.createElement('video');
                videoPreview.controls = true;
                videoPreview.src = URL.createObjectURL(file);
                previewContainer.appendChild(videoPreview);
            } else if (fileType.startsWith('audio/')) {
                const audioPreview = document.createElement('audio');
                audioPreview.controls = true;
                audioPreview.src = URL.createObjectURL(file);
                previewContainer.appendChild(audioPreview);
            } else if (fileType === 'application/pdf') {
                const pdfPreview = document.createElement('embed');
                pdfPreview.src = URL.createObjectURL(file);
                pdfPreview.type = "application/pdf";
                pdfPreview.width = "100%";
                pdfPreview.height = "500px";
                previewContainer.appendChild(pdfPreview);
            } else {
                alert('Unsupported file type.');
            }
        }
    });

    
    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        
        if (file && file.type.startsWith('image/')) {
            const formData = new FormData();
            formData.append('image', file);
            const API_KEY = 'your_imgbb_api_key_here';  
            fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Image uploaded successfully!');
                    window.open(data.data.url, '_blank'); 
                } else {
                    alert('Image upload failed.');
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Only image files can be uploaded.');
        }
    });
});
