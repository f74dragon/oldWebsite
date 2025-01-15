// Rewards with their respective probabilities and images
const rewards = [
  {
    name: "Blue Rarity",
    color: "#0000ff",
    probability: 79.92,
    image: "Blue.png",
  },
  {
    name: "Purple Rarity",
    color: "#800080",
    probability: 15.98,
    image: "Purple.png",
  },
  {
    name: "Pink Rarity",
    color: "#ff69b4",
    probability: 3.2,
    image: "Pink.png",
  },
  {
    name: "Red Rarity",
    color: "#ff0000",
    probability: 0.64,
    image: "Red.png",
  },
];

// Initialize or retrieve lootbox attempts from localStorage
const maxAttempts = 3;
let attempts = parseInt(localStorage.getItem("lootboxAttempts")) || 0;
// Update the lootbox counter
function updateCounter() {
  const remaining = maxAttempts - attempts;
  const counterElement = document.getElementById("lootbox-counter");
  counterElement.textContent = `Lootboxes Remaining: ${remaining}`;

  // Disable button if max attempts are reached
  if (remaining <= 0) {
    const openButton = document.getElementById("open-button");
    openButton.disabled = true;
    openButton.textContent = "Max Attempts Reached";
  }
}

// Initial counter update
updateCounter();

// Function to increment and save attempts
function incrementAttempts() {
  attempts += 1;
  localStorage.setItem("lootboxAttempts", attempts);
  updateCounter();
}

// Function to select a reward based on probabilities
function selectReward() {
  const random = Math.random() * 100; // Generate a random number between 0 and 100
  let cumulativeProbability = 0;

  for (const reward of rewards) {
    cumulativeProbability += reward.probability;
    if (random <= cumulativeProbability) {
      return reward;
    }
  }
  return rewards[0]; // Fallback in case of rounding issues
}

function updateCounter() {
  const remaining = maxAttempts - attempts;
  const counterElement = document.getElementById("lootbox-counter");
  const openButton = document.getElementById("open-button");
  const buyMoreButton = document.getElementById("buy-more-button");

  counterElement.textContent = `Lootboxes Remaining: ${remaining}`;
  buyMoreButton.style.display = "block"; // Show Buy More button
}

// Add event listener for the "Buy More Lootboxes" button
document.getElementById("buy-more-button").addEventListener("click", () => {
  window.location.href = "buylootboxes.html"; // Redirect to the buy lootboxes page
});

// Initial counter update
updateCounter();

document.getElementById("open-button").addEventListener("click", () => {
  // Check if the user has remaining attempts
  if (attempts >= maxAttempts) {
    window.location.href = "buylootboxes.html"; // Redirect to the buy lootboxes page
    return;
  }

  incrementAttempts(); // Increment the attempts

  const lootbox = document.getElementById("lootbox");
  const lootboxIcon = document.querySelector(".lootbox-icon");
  const rewardDiv = document.getElementById("reward");
  const screenFlash = document.getElementById("screen-flash");
  const lightBeam = document.querySelector(".light-beam");
  const openButton = document.getElementById("open-button");

  // Reset visuals
  rewardDiv.textContent = "";
  screenFlash.style.animation = "none";
  lightBeam.style.opacity = "0";

  // Progressive shaking animation sequence
  const shakeSequence = [
    { animation: "shake 0.6s", duration: 600 }, // Slow shake
    { animation: "shake 0.5s", duration: 500 }, // Medium shake
    { animation: "shake 0.2s", duration: 200 }, // Faster shake
    { animation: "shake 0.1s", duration: 100 }, // Super fast shake
  ];

  let totalDuration = 0;

  // Chain the shake animations
  shakeSequence.forEach((step) => {
    setTimeout(() => {
      lootboxIcon.style.animation = step.animation;
    }, totalDuration);
    totalDuration += step.duration;
  });

  // Start white flash after shaking
  const flashDuration = 300; // Matches the duration of the "flash" animation
  setTimeout(() => {
    lootboxIcon.style.animation = ""; // Reset animation
    lightBeam.style.opacity = "1";
    lightBeam.style.animation = "beam-fade 1s infinite";
    screenFlash.style.animation = `flash ${flashDuration / 300}s`;
  }, totalDuration);

  // Show the reward after the flash finishes
  setTimeout(() => {
    const reward = selectReward();

    // Hide lootbox and UI elements
    lootbox.style.display = "none";
    openButton.style.display = "none";




    // Show the reward image with glowing border and fade-in effect
    rewardDiv.innerHTML = `
  <img 
    src="${reward.image}" 
    alt="${reward.name}" 
    class="fade-in"
    style="
      color: ${reward.color};
      width: 400px; 
      height: auto; 
      border-radius: 20px; 
      display: block; 
      margin: 0 auto; 
      border: 10px ${reward.color}; 
      box-shadow: 0 0 20px ${reward.color}, 0 0 40px ${reward.color}, 0 0 60px ${reward.color};
      animation: neon-glow 1s infinite alternate;
    "
  >
  <style>
@keyframes pulsate {
    0%, 100% {
      /* Larger blur radius */
      text-shadow: 0 0 10px ${reward.color}, 0 0 20px ${reward.color}, 0 0 30px ${reward.color};
    }
    50% {
      /* A slightly smaller blur radius */
      text-shadow: 0 0 20px ${reward.color}, 0 0 40px ${reward.color}, 0 0 60px ${reward.color};
    }
}
</style>
<p 
    class="fade-in"
    style="
      color:rgba(255, 255, 255, 0.97); /* Set the text color to white */
      margin: 25 auto; 
      padding: 30px;
      border: 10px ${reward.color}; 
      border-radius: 10px;
      text-shadow: 0 0 20px ${reward.color}, 0 0 40px ${reward.color}, 0 0 60px ${reward.color};
      animation: pulsate 1s infinite alternate;
    "
>
 ${reward.name}
</p>
`;

    // Add a "Return" button
    const returnButton = document.createElement("button");
    returnButton.textContent = "Open More Boxes";

    // Apply styles and behavior for the return button
    returnButton.style.margin = "30px auto";
    returnButton.style.display = "block";
    returnButton.style.padding = "15px 30px";
    returnButton.style.fontSize = "1em";
    returnButton.style.backgroundColor = "#ffcc00";
    returnButton.style.color = "#101820";
    returnButton.style.border = "none";
    returnButton.style.borderRadius = "8px";
    returnButton.style.cursor = "pointer";
    returnButton.style.transition =
      "transform 0.3s ease, background-color 0.3s";

    returnButton.addEventListener("mouseover", () => {
      returnButton.style.backgroundColor = "#ffe066";
      returnButton.style.transform = "scale(1.1)";
    });

    returnButton.addEventListener("mouseout", () => {
      returnButton.style.backgroundColor = "#ffcc00";
      returnButton.style.transform = "scale(1)";
    });

    returnButton.addEventListener("click", () => {
      if (attempts >= maxAttempts) {
        window.location.href = "buylootboxes.html"; // Redirect to the buy lootboxes page
        return;
      }

      lootbox.style.display = "block";
      openButton.style.display = "block";
      rewardDiv.innerHTML = "";
      rewardDiv.textContent = "";
      rewardDiv.style.textShadow = "none";
      lightBeam.style.opacity = "0";
      screenFlash.style.animation = "none";
      openButton.style.margin = "30px auto";
    });

    rewardDiv.appendChild(returnButton);
  }, totalDuration + flashDuration / 2); // Add flash duration to the total delay
});
