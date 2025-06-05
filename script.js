/* script.js */

document.addEventListener('DOMContentLoaded', () => {
  const gameMap = document.getElementById('game-map');
  const player = document.getElementById('player');

  // --- Configuration ---
  const playerSpeed = 5; // Pixels per frame for player movement

  // --- Game Map Data (2D Array) ---
  // Increased map size to better show filling behavior
  const gameMapData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row 0
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Row 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const MAP_ROWS = gameMapData.length;
  const MAP_COLS = gameMapData[0].length;

  let TILE_SIZE;

  let playerGridX;
  let playerGridY;
  let playerX;
  let playerY;

  let targetX;
  let targetY;
  let isMoving = false;

  // --- Helper function to get tile type ---
  function getTileType(x, y) {
      if (x < 0 || x >= MAP_COLS || y < 0 || y >= MAP_ROWS) {
          return 1; // Treat out-of-bounds as a wall
      }
      return gameMapData[y][x];
  }

  // --- Render Map Function ---
  function renderMap() {
      gameMap.innerHTML = ''; // Clear existing tiles
      for (let y = 0; y < MAP_ROWS; y++) {
          for (let x = 0; x < MAP_COLS; x++) {
              const tileDiv = document.createElement('div');
              tileDiv.classList.add('tile');

              const tileType = gameMapData[y][x];
              switch (tileType) {
                  case 0: tileDiv.classList.add('grass'); break;
                  case 1: tileDiv.classList.add('wall'); break;
                  case 2: tileDiv.classList.add('water'); break;
                  case 3: tileDiv.classList.add('door'); break;
              }
              gameMap.appendChild(tileDiv);
          }
      }
      console.log("Map rendered with " + (MAP_ROWS * MAP_COLS) + " tiles.");
  }

  // --- Update Player Position Function ---
  function updatePlayerPosition() {
      player.style.left = `${playerX}px`;
      player.style.top = `${playerY}px`;
      player.style.display = 'block'; // Ensure player is visible
      // console.log(`Player actual position: (${playerX}, ${playerY})`); // Keep this for now, very helpful
  }

  // --- Core Initialization Function (called on load and resize) ---
  function initializeGameElements() {
      // Use requestAnimationFrame for more reliable dimension reading after layout
      requestAnimationFrame(() => {
          const mapWidth = gameMap.offsetWidth;
          const mapHeight = gameMap.offsetHeight;

          console.log(`[INIT] gameMap dimensions (offsetWidth/Height): ${mapWidth}px x ${mapHeight}px`);

          if (mapWidth === 0 || mapHeight === 0) {
              console.warn("[INIT] gameMap has zero dimensions. Retrying initialization...");
              // If dimensions are still 0, try again after a short delay
              setTimeout(initializeGameElements, 50); // Recursive call
              return;
          }

          // Calculate TILE_SIZE: Use the MINIMUM of what's needed to fit columns or rows
          // This ensures tiles are never too big to fit in either dimension.
          const tileSizeBasedOnWidth = Math.floor(mapWidth / MAP_COLS);
          const tileSizeBasedOnHeight = Math.floor(mapHeight / MAP_ROWS);

          TILE_SIZE = Math.min(tileSizeBasedOnWidth, tileSizeBasedOnHeight);

          // If TILE_SIZE becomes zero (due to tiny map or huge columns/rows), default it
          if (TILE_SIZE === 0) {
              console.warn("[INIT] Calculated TILE_SIZE is 0. Defaulting to 1px.");
              TILE_SIZE = 1; // Fallback to avoid division by zero or invisible tiles
          }


          console.log(`[INIT] Calculated TILE_SIZE: ${TILE_SIZE}px`);

          // Apply calculated TILE_SIZE to CSS Grid
          gameMap.style.gridTemplateColumns = `repeat(${MAP_COLS}, ${TILE_SIZE}px)`;
          gameMap.style.gridTemplateRows = `repeat(${MAP_ROWS}, ${TILE_SIZE}px)`;
          console.log(`[INIT] gameMap grid-template-columns/rows set.`);

          // --- Initial Player Positioning ---
          let startTileX = -1;
          let startTileY = -1;
          for (let y = 0; y < MAP_ROWS; y++) {
              for (let x = 0; x < MAP_COLS; x++) {
                  if (gameMapData[y][x] === 0) { // Assuming 0 is grass
                      startTileX = x;
                      startTileY = y;
                      break;
                  }
              }
              if (startTileX !== -1) break;
          }

          if (startTileX === -1) {
              startTileX = 0;
              startTileY = 0;
              console.warn("[INIT] No walkable start tile found, defaulting to (0,0).");
          }

          playerGridX = startTileX;
          playerGridY = startTileY;

          const playerWidth = player.offsetWidth || 25; // Use 25px default if not computed yet
          const playerHeight = player.offsetHeight || 25;
          console.log(`[INIT] Player dimensions: ${playerWidth}px x ${playerHeight}px`);

          playerX = playerGridX * TILE_SIZE + (TILE_SIZE / 2) - (playerWidth / 2);
          playerY = playerGridY * TILE_SIZE + (TILE_SIZE / 2) - (playerHeight / 2);

          targetX = playerX;
          targetY = playerY;

          updatePlayerPosition();
          console.log(`[INIT] Player initialized at grid (${playerGridX}, <span class="math-inline">\{playerGridY\}\) pixel \(</span>{playerX}, ${playerY})`);
      });
  }

  // --- Game Loop for Movement ---
  function gameLoop() {
      if (isMoving) {
          const dx = targetX - playerX;
          const dy = targetY - playerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < playerSpeed) {
              playerX = targetX;
              playerY = targetY;
              isMoving = false;
              playerGridX = Math.round(playerX / TILE_SIZE);
              playerGridY = Math.round(playerY / TILE_SIZE);
              console.log(`[LOOP] Player arrived at target: (${playerX.toFixed(0)}, ${playerY.toFixed(0)})`);
          } else {
              const moveAmountX = (dx / distance) * playerSpeed;
              const moveAmountY = (dy / distance) * playerSpeed;

              playerX += moveAmountX;
              playerY += moveAmountY;
          }
          updatePlayerPosition();
      }
      requestAnimationFrame(gameLoop);
}

// --- Initial Game Setup Call ---
renderMap();
initializeGameElements(); // This now uses requestAnimationFrame internally
requestAnimationFrame(gameLoop);


// --- Click Event Listener ---
gameMap.addEventListener('click', (event) => {
    if (!TILE_SIZE || TILE_SIZE === 0) {
        console.warn("TILE_SIZE not initialized or is zero. Click ignored.");
        return;
    }

    const mapRect = gameMap.getBoundingClientRect();
    const clickXInMap = event.clientX - mapRect.left;
    const clickYInMap = event.clientY - mapRect.top;

    const clickedGridX = Math.floor(clickXInMap / TILE_SIZE);
    const clickedGridY = Math.floor(clickYInMap / TILE_SIZE);

    // console.log(`[CLICK] Clicked pixel: (${clickXInMap.toFixed(0)}, <span class="math-inline">\{clickYInMap\.toFixed\(0\)\}\) \-\> Grid\: \(</span>{clickedGridX}, ${clickedGridY})`); // Debug click coordinates

    const tileTypeAtClick = getTileType(clickedGridX, clickedGridY);
    if (tileTypeAtClick === 1 || tileTypeAtClick === 2) {
        console.log(`[CLICK] Cannot walk on tile type: <span class="math-inline">\{tileTypeAtClick\} at grid \(</span>{clickedGridX}, ${clickedGridY})`);
        return;
    }

    targetX = clickedGridX * TILE_SIZE + (TILE_SIZE / 2) - (player.offsetWidth / 2);
    targetY = clickedGridY * TILE_SIZE + (TILE_SIZE / 2) - (player.offsetHeight / 2);

    isMoving = true;
    // console.log(`[CLICK] Setting target to: (${targetX.toFixed(0)}, ${targetY.toFixed(0)})`); // Debug target
});

// Handle window resize to re-calculate TILE_SIZE and update grid/player
window.addEventListener('resize', () => {
    console.log("[RESIZE] Window resized. Re-initializing elements and re-rendering map.");
    renderMap();
    initializeGameElements();
});
});
/* style.css */

body {
margin: 0;
overflow: hidden; /* Prevents unwanted scrollbars */
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh; /* Ensures body takes full viewport height */
background-color: #333;
font-family: sans-serif;
}

#game-container {
width: 90vw;
max-width: 1200px;
aspect-ratio: 16 / 9; /* Maintain a 16:9 aspect ratio */
max-height: 90vh; /* Ensure it fits vertically even if wide */

border: 2px solid #555;
background-color: #222; /* Background if game-map doesn't fill it, should be rarely seen */
overflow: hidden;
position: relative;
box-shadow: 0 0 15px rgba(0,0,0,0.5);
}

#game-map {
width: 100%;
height: 100%;

/* --- ABSOLUTELY CRUCIAL: THESE MUST BE DELETED if present. No background on the container! --- */
/* background-color: #4CAF50; */
/* background-image: ... */
/* background-size: ... */
/* --- END OF DELETED LINES --- */

display: grid; /* Use CSS Grid for layout */
position: absolute;
top: 0;
left: 0;
z-index: 5; /* Give map a z-index, but lower than player */
}

/* Styles for individual map tiles */
.tile {
box-sizing: border-box; /* Include padding/border in size */
border: 1px solid rgba(0,0,0,0.1); /* Subtle grid lines */
}

/* Example tile types with colors */
.tile.grass { background-color: #4CAF50; }
.tile.wall { background-color: #795548; }
.tile.water { background-color: #2196F3; }
.tile.door { background-color: #CDDC39; }

#player {
width: 25px; /* Slightly larger player for better visibility */
height: 25px;
background-color: dodgerblue;
border: 2px solid royalblue;
border-radius: 50%;
position: absolute;
left: 0;
top: 0;
z-index: 10; /* Ensures player is definitively above map tiles and map container */
}

/* Media Query for Phone Landscape View */
@media (max-height: 500px) and (orientation: landscape) {
  #game-container {
      width: 98vw;
      height: 95vh;
      max-width: none; /* Remove max-width constraint for phones */
      max-height: none; /* Remove max-height constraint for phones */
      border-width: 1px;
      box-shadow: none;
  }
  #player {
      width: 20px; /* Even smaller player on tiny phone screens */
      height: 20px;
  }
}