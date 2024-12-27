const noButton = document.getElementById('no-button');
const container = document.querySelector('.container');

let cornerIndex = 0; // Track which corner to move to next

// Array of corner positions
const corners = [
  { top: '0', left: '0' }, // Top-left
  { top: '0', left: 'calc(100% - 100px)' }, // Top-right (adjusted for button width)
  { top: 'calc(100% - 50px)', left: '0' }, // Bottom-left (adjusted for button height)
  { top: 'calc(100% - 50px)', left: 'calc(100% - 100px)' }, // Bottom-right
];

// Function to move the "No" button to the next corner
function moveNoButton() {
  // Get the next corner's position
  const { top, left } = corners[cornerIndex];

  // Apply the new position
  noButton.style.top = top;
  noButton.style.left = left;

  // Increment the corner index (loop back to 0 if it exceeds array length)
  cornerIndex = (cornerIndex + 1) % corners.length;
}

// Add event listener for hover
noButton.addEventListener('mouseover', moveNoButton);
