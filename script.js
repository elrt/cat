document.addEventListener('DOMContentLoaded', function() {
    const catButton = document.getElementById('catButton');
    const catImage = document.getElementById('catImage');
    const loader = document.getElementById('loader');
    const counter = document.getElementById('counter');
    const themeToggle = document.getElementById('themeToggle');
    
    let catCount = 0;
    let currentCatUrl = '';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    catButton.addEventListener('click', function() {
        loadRandomCat();
    });
    
    function loadRandomCat() {
        loader.style.display = 'block';
        catImage.style.display = 'none';
        
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                currentCatUrl = data[0].url;
                catImage.src = currentCatUrl;
                
                catImage.onload = function() {
                    loader.style.display = 'none';
                    catImage.style.display = 'block';
                    
                    catCount++;
                    counter.textContent = `Cats shown: ${catCount}`;
                };
            })
            .catch(error => {
                console.error('Error loading cat :(', error);
                loader.style.display = 'none';
                alert('Failed to load a cat. Please try again!');
            });
    }
    
    loadRandomCat();
});
