const weights = ['+90 kg', '+70 kg', '-90 kg', '-70 kg', '-73 kg', '-57 kg'];
const rinerWeight = '+90 kg';
const rounds = 30;
const weightHeight = 40;
const spinDuration = 4;
let hasSpun = false;

function createRoulette() {
    const roulette = document.querySelector('.roulette');
    roulette.innerHTML = '';

    const repetition = rounds + 2;
    for (let i = 0; i < repetition; i++) {
        weights.forEach(num => {
            const weightDiv = document.createElement('div');
            weightDiv.classList.add('weight');
            weightDiv.textContent = num;
            roulette.appendChild(weightDiv);
        });
    }
    hasSpun = false;
}

function spinRoulette() {
    const fixedCheckbox = document.getElementById('riner-weight');
    const containerHeight = document.querySelector('.roulette-container').offsetHeight;
    
    if (hasSpun) {
        const roulette = document.querySelector('.roulette');
        roulette.style.transition = 'none';
        roulette.style.transform = 'translateY(0)';
        void roulette.offsetWidth;
        createRoulette();
    }

    let selectedWeight;
    
    if (fixedCheckbox.checked) {
        selectedWeight = rinerWeight;
    } else {
        selectedWeight = weights[Math.floor(Math.random() * weights.length)];
    }

    const selectedIndex = weights.indexOf(selectedWeight);

    const totalWeights = weights.length;
    const totalScrollHeight = (rounds * totalWeights + selectedIndex + 1) * weightHeight;
    const centerOffset = Math.floor(containerHeight / 2) - Math.floor(weightHeight / 2) -114;

    const roulette = document.querySelector('.roulette');
    setTimeout(() => {
        roulette.style.transition = `transform ${spinDuration}s ease-out`; 
        roulette.style.transform = `translateY(-${totalScrollHeight - centerOffset}px)`;
    }, 50);

    setTimeout(() => {
        document.querySelectorAll('.weight').forEach(div => {
            div.style.opacity = '0.5';
            div.style.transform = 'scale(1)'; // Reset scale
        });

        const selectedDiv = document.querySelectorAll('.weight')[(rounds * totalWeights) + selectedIndex];
        selectedDiv.style.opacity = '1';
        selectedDiv.style.transform = 'scale(1.5)';

        hasSpun = true;
    }, spinDuration * 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    createRoulette();

    document.getElementById('spin-button').addEventListener('click', spinRoulette);
});
