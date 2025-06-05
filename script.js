// This ensures our script runs only after the HTML page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to our HTML elements
  const gameMap = document.getElementById('game-map');
  const player = document.getElementById('player');

  // Store the player's current logical position (x and y coordinates)
  // We start the player roughly in the center of the map
  let playerX = gameMap.offsetWidth / 2 - player.offsetWidth / 2;
  let playerY = gameMap.offsetHeight / 2 - player.offsetHeight / 2;

  // Function to update the player's visual position on the screen
  function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
  }

  // Set the player's initial position when the game starts
  updatePlayerPosition();

  // Add a click event listener to the game map
  gameMap.addEventListener('click', (event) => {
    // Get the click coordinates relative to the viewport (the browser window)
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Get the position of the game map relative to the viewport
    const mapRect = gameMap.getBoundingClientRect();
    const mapLeft = mapRect.left;
    const mapTop = mapRect.top;

    // Calculate the click coordinates relative to the game map itself
    // This is important because the player moves within the map's coordinate system
    const clickXInMap = clickX - mapLeft;
    const clickYInMap = clickY - mapTop;

    // Calculate the new target position for the player
    // We subtract half of the player's width/height to center the player on the click
    let targetX = clickXInMap - player.offsetWidth / 2;
    let targetY = clickYInMap - player.offsetHeight / 2;

    // --- Basic Boundary Checking ---
    // Ensure the player doesn't move off the left edge (min 0px)
    targetX = Math.max(0, targetX);
    // Ensure the player doesn't move off the top edge (min 0px)
    targetY = Math.max(0, targetY);

    // Ensure the player doesn't move off the right edge (max map width - player width)
    targetX = Math.min(gameMap.offsetWidth - player.offsetWidth, targetX);
    // Ensure the player doesn't move off the bottom edge (max map height - player height)
    targetY = Math.min(gameMap.offsetHeight - player.offsetHeight, targetY);

    // Update the player's logical position
    playerX = targetX;
    playerY = targetY;

    // Update the player's visual position on the screen
    updatePlayerPosition();

    console.log(
      `Player moved to: X=${playerX.toFixed(0)}, Y=${playerY.toFixed(0)}`
    );
  });
});
