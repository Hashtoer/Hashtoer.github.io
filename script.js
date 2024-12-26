const noButton = document.getElementById('no-button');
const buttonsContainer = document.querySelector('.buttons');

// Function to move the "No" button far away from the cursor
function moveNoButton(event) {
  const buttonRect = noButton.getBoundingClientRect();
  const containerRect = buttonsContainer.getBoundingClientRect();

  // Cursor's position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Calculate new random position far away from the cursor
  let newX, newY;

  do {
    newX = Math.random() * containerRect.width - buttonRect.width / 2;
    newY = Math.random() * containerRect.height - buttonRect.height / 2;
  } while (
    Math.abs(newX - mouseX) < 300 || // Ensure it's far enough horizontally
    Math.abs(newY - mouseY) < 300    // Ensure it's far enough vertically
  );

  // Apply new position
  noButton.style.transform = `translate(${newX}px, ${newY}px)`;
}

// Add event listener for mouseover
noButton.addEventListener('mouseover', moveNoButton);
