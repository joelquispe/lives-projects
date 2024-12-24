const tree = document.getElementById('christmas-tree');
const decorations = document.querySelectorAll('.decoration');

function animateDecorations() {
    decorations.forEach((decoration, index) => {
        setTimeout(() => {
            decoration.classList.add('shine');
            setTimeout(() => {
                decoration.classList.remove('shine');
            }, 1000);
        }, index * 1500);
    });
}

function startAnimation() {
    setInterval(animateDecorations, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
    startAnimation();
});