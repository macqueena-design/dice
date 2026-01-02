// Dice roller application logic
const dice = document.getElementById('dice');
const rollButton = document.getElementById('rollButton');
const result = document.getElementById('result');
const resultText = result.querySelector('.result-text');

// 3D rotation positions for each dice face
const diceRotations = {
    1: 'rotateX(-20deg) rotateY(-20deg)',
    2: 'rotateX(-20deg) rotateY(-110deg)',
    3: 'rotateX(-20deg) rotateY(-200deg)',
    4: 'rotateX(-20deg) rotateY(70deg)',
    5: 'rotateX(-110deg) rotateY(-20deg)',
    6: 'rotateX(70deg) rotateY(-20deg)'
};

// Initialize with a random face
let currentNumber = Math.floor(Math.random() * 6) + 1;
showDiceFace(currentNumber);

// Roll button click handler
rollButton.addEventListener('click', rollDice);

// Add keyboard support (press Enter or Space to roll)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        rollDice();
    }
});

function rollDice() {
    // Disable button during animation
    rollButton.disabled = true;

    // Add rolling animation
    dice.classList.add('rolling');

    // Update result text
    resultText.textContent = 'Rolling...';
    result.classList.remove('show-number');

    // Generate final random number
    currentNumber = Math.floor(Math.random() * 6) + 1;

    // Add random extra rotations for variety
    const extraRotations = Math.floor(Math.random() * 3) + 2; // 2-4 extra full rotations
    const randomX = 720 * extraRotations + (Math.random() * 360);
    const randomY = 720 * extraRotations + (Math.random() * 360);
    const randomZ = 360 * extraRotations;

    // Apply random tumbling animation
    dice.style.transition = 'transform 1s ease-out';
    dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;

    // Final result after animation
    setTimeout(() => {
        // Remove rolling animation
        dice.classList.remove('rolling');

        // Show the final face
        showDiceFace(currentNumber);

        // Show result
        resultText.textContent = `You rolled a ${currentNumber}!`;
        result.classList.add('show-number');

        // Re-enable button
        rollButton.disabled = false;

        // Add a subtle shake effect on high rolls
        if (currentNumber === 6) {
            celebrateHighRoll();
        }
    }, 1000);
}

function showDiceFace(number) {
    dice.style.transition = 'transform 0.5s ease-out';
    dice.style.transform = diceRotations[number];

    // Remove active class from all faces
    const allFaces = dice.querySelectorAll('.dice-face');
    allFaces.forEach(face => face.classList.remove('active'));

    // Add active class to the current face
    const currentFace = dice.querySelector(`.face-${number}`);
    if (currentFace) {
        currentFace.classList.add('active');
    }
}

function celebrateHighRoll() {
    // Add a brief celebration effect for rolling a 6
    dice.style.animation = 'none';
    setTimeout(() => {
        dice.style.animation = '';
    }, 10);
}

// Add touch feedback for mobile
rollButton.addEventListener('touchstart', () => {
    rollButton.style.transform = 'translateY(-1px)';
});

rollButton.addEventListener('touchend', () => {
    rollButton.style.transform = '';
});
