/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const gameMap = document.getElementById('game-map');
    let player = document.getElementById('player'); 
  
    // --- Configuration ---
    const playerSpeed = 5; // Pixels per frame for player movement
  
    // --- Game Map Data (2D Array) ---
    const OVERWORLD_MAP_DATA = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Added a door at (4,9)
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  
    const HOUSE_INTERIOR_1_MAP_DATA = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 3, 1, 1, 1, 1] // Door at (5,9) to exit house
    ];
  
    const CAVE_MAP_DATA = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 1], // Door at (11,9) to exit cave
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  
  
    // --- Door Definitions ---
    const DOOR_DEFINITIONS = {
      "overworld": {
        "5,12": {
          destinationMap: HOUSE_INTERIOR_1_MAP_DATA,
          spawnPoint: { x: 5, y: 8 },
          exitPoint: { x: 5, y: 13 }
        },
        "10,2": {
          destinationMap: CAVE_MAP_DATA,
          spawnPoint: { x: 7, y: 9 },
          exitPoint: { x: 10, y: 3 }
        },
        "4,9": { // Door at (4,9) in OVERWORLD_MAP_DATA
          destinationMap: HOUSE_INTERIOR_1_MAP_DATA,
          spawnPoint: { x: 5, y: 8 }, // Player spawns at x=5, y=8 inside the house
          exitPoint: { x: 4, y: 10 } // Player exits back to (4,10) in overworld
        }
      },
      "house1_interior": {
        "5,9": { // Door at (5,9) in HOUSE_INTERIOR_1_MAP_DATA
          destinationMap: OVERWORLD_MAP_DATA,
          spawnPoint: { x: 4, y: 10 } // Player exits back to (4,10) in overworld
        }
      },
      "cave1_interior": {
        "11,9": { // Door at (11,9) in CAVE_MAP_DATA
          destinationMap: OVERWORLD_MAP_DATA,
          spawnPoint: { x: 10, y: 3 }
        }
      }
    };
  
    // --- Current Game State ---
    let currentMapName = "overworld";
    let gameMapData = OVERWORLD_MAP_DATA;
  
    let currentMapDoorDefinitions = DOOR_DEFINITIONS[currentMapName]; // This needs to be dynamic!
  
    let MAP_ROWS;
    let MAP_COLS;
  
    let TILE_SIZE;
  
    let playerGridX;
    let playerGridY;
    let playerX;
    let playerY;
  
    let targetX;
    let targetY;
    let isMoving = false;
    let currentPath = [];
    let pathIndex = 0;
  
    // --- Helper function to get tile type ---
    function getTileType(x, y, mapData = gameMapData) {
        if (x < 0 || x >= mapData[0].length || y < 0 || y >= mapData.length) {
            return 1;
        }
        return mapData[y][x];
    }
  
    // --- Helper: Find adjacent walkable tile ---
    function findAdjacentWalkableTile(targetGridX, targetGridY) {
        const neighbors = [
            { x: targetGridX, y: targetGridY - 1 }, // Up
            { x: targetGridX, y: targetGridY + 1 }, // Down
            { x: targetGridX - 1, y: targetGridY }, // Left
            { x: targetGridX + 1, y: targetGridY }  // Right
        ];
  
        for (const neighbor of neighbors) {
            if (getTileType(neighbor.x, neighbor.y) === 0) { // Using current gameMapData here
                return neighbor;
            }
        }
        return null;
    }
  
    // --- Render Map Function ---
    function renderMap() {
        if (player && player.parentNode) {
            player.parentNode.removeChild(player);
        }
        gameMap.innerHTML = ''; // Clear existing tiles
  
        MAP_ROWS = gameMapData.length;
        MAP_COLS = gameMapData[0].length;
  
        gameMap.style.gridTemplateColumns = `repeat(${MAP_COLS}, ${TILE_SIZE}px)`;
        gameMap.style.gridTemplateRows = `repeat(${MAP_ROWS}, ${TILE_SIZE}px)`;
  
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
                    default: tileDiv.classList.add('grass');
                }
                gameMap.appendChild(tileDiv);
            }
        }
        console.log(`Map rendered with ${MAP_ROWS * MAP_COLS} tiles. New dimensions: ${MAP_COLS}x${MAP_ROWS}.`);
  
        gameMap.appendChild(player); // Re-append the player element
    }
  
    // --- Update Player Position Function ---
    function updatePlayerPosition() {
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;
    }
  
    // --- Function to wait for player dimensions ---
    function waitForPlayerDimensions(callback) {
        if (!player || !gameMap.contains(player)) {
            console.warn("[INIT] Player element not initially found in DOM/gameMap. Creating/re-appending from waitForPlayerDimensions (should be rare).");
            player = document.createElement('div');
            player.id = 'player';
            gameMap.appendChild(player);
        }
  
        player.style.display = 'block';
        player.style.width = '25px';
        player.style.height = '25px';
        player.style.backgroundColor = 'dodgerblue';
        player.style.border = '2px solid royalblue';
        player.style.borderRadius = '50%';
        player.style.boxSizing = 'border-box';
  
        const checkDimensions = () => {
            const playerWidth = player.clientWidth;
            const playerHeight = player.clientHeight;
  
            const computedStyle = window.getComputedStyle(player);
            const computedWidth = parseFloat(computedStyle.width);
            const computedHeight = parseFloat(computedStyle.height);
  
            if (isNaN(computedWidth) || isNaN(computedHeight) || playerWidth === 0 || playerHeight === 0 || computedWidth === 0 || computedHeight === 0) {
                requestAnimationFrame(checkDimensions);
            } else {
                console.log(`%c[INIT] Player dimensions confirmed: ${playerWidth}px x ${playerHeight}px`, 'color: #0F0;');
                callback(playerWidth, playerHeight);
            }
        };
        requestAnimationFrame(checkDimensions);
    }
  
    // --- A* Pathfinding related functions ---
    class Node {
        constructor(x, y, gCost, hCost, parent) {
            this.x = x;
            this.y = y;
            this.gCost = gCost;
            this.hCost = hCost;
            this.fCost = gCost + hCost;
            this.parent = parent;
        }
        equals(otherNode) {
            return this.x === otherNode.x && this.y === otherNode.y;
        }
    }
  
    function calculateHeuristic(node, endNode) {
        return Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y);
    }
  
    function getNeighbors(node) {
        const neighbors = [];
        const directions = [
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 },  // Down
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }   // Right
        ];
  
        for (const dir of directions) {
            const neighborX = node.x + dir.dx;
            const neighborY = node.y + dir.dy;
  
            if (getTileType(neighborX, neighborY) === 0) {
                neighbors.push({ x: neighborX, y: neighborY });
            }
        }
        return neighbors;
    }
  
    function reconstructPath(endNode) {
        const path = [];
        let currentNode = endNode;
        while (currentNode !== null) {
            path.push({ x: currentNode.x, y: currentNode.y });
            currentNode = currentNode.parent;
        }
        return path.reverse();
    }
  
    function findPath(startGrid, endGrid) {
        console.log(`[PATHFINDING] Finding path from (${startGrid.x},${startGrid.y}) to (${endGrid.x},${endGrid.y})`);
  
        const startNode = new Node(startGrid.x, startGrid.y, 0, calculateHeuristic(startGrid, endGrid), null);
        const endNode = new Node(endGrid.x, endGrid.y, 0, 0, null);
  
        const openList = [startNode];
        const closedList = new Set();
        const openListMap = new Map();
        openListMap.set(`${startNode.x},${startNode.y}`, startNode);
        const closedListMap = new Map();
  
        while (openList.length > 0) {
            openList.sort((a, b) => a.fCost - b.fCost);
            const currentNode = openList.shift();
            openListMap.delete(`${currentNode.x},${currentNode.y}`);
  
            if (currentNode.equals(endNode)) {
                console.log("[PATHFINDING] Path found!");
                return reconstructPath(currentNode);
            }
  
            closedList.add(`${currentNode.x},${currentNode.y}`);
            closedListMap.set(`${currentNode.x},${currentNode.y}`, currentNode);
  
            const neighbors = getNeighbors(currentNode);
  
            for (const neighborPos of neighbors) {
                if (closedList.has(`${neighborPos.x},${neighborPos.y}`)) {
                    continue;
                }
  
                const newGCost = currentNode.gCost + 1;
  
                let neighborNode = openListMap.get(`${neighborPos.x},${neighborPos.y}`);
  
                if (!neighborNode || newGCost < neighborNode.gCost) {
                    if (!neighborNode) {
                        neighborNode = new Node(
                            neighborPos.x,
                            neighborPos.y,
                            newGCost,
                            calculateHeuristic(neighborPos, endGrid),
                            currentNode
                        );
                        openList.push(neighborNode);
                        openListMap.set(`${neighborPos.x},${neighborPos.y}`, neighborNode);
                    } else {
                        neighborNode.gCost = newGCost;
                        neighborNode.fCost = newGCost + neighborNode.hCost;
                        neighborNode.parent = currentNode;
                    }
                }
            }
        }
  
        console.warn("[PATHFINDING] No path found!");
        return [];
    }
  
    // --- Function to handle map transitions ---
    function switchMap(newMapData, spawnGridX, spawnGridY, newMapName) {
      console.log(`[MAP TRANSITION] Switching to map: ${newMapName}`);
      gameMapData = newMapData;
      currentMapName = newMapName; // CRUCIAL: Set the new map name here!
      currentMapDoorDefinitions = DOOR_DEFINITIONS[currentMapName]; // CRUCIAL: Update door definitions based on the new map name
  
      currentPath = [];
      isMoving = false;
  
      renderMap(); // This call now handles re-appending the player to gameMap
  
      waitForPlayerDimensions((playerWidth, playerHeight) => {
          playerGridX = spawnGridX;
          playerGridY = spawnGridY;
          playerX = playerGridX * TILE_SIZE + (TILE_SIZE / 2) - (playerWidth / 2);
          playerY = playerGridY * TILE_SIZE + (TILE_SIZE / 2) - (playerHeight / 2);
          updatePlayerPosition();
          console.log(`[MAP TRANSITION] Player spawned at (${playerGridX}, ${playerGridY}) in new map.`);
      });
    }
  
  
    // --- Core Initialization Function (called on load and resize) ---
    function initializeGameElements() {
        requestAnimationFrame(() => {
            const mapWidth = gameMap.offsetWidth;
            const mapHeight = gameMap.offsetHeight;
  
            console.log(`[INIT] gameMap dimensions (offsetWidth/Height): ${mapWidth}px x ${mapHeight}px`);
  
            if (mapWidth === 0 || mapHeight === 0) {
                console.warn("[INIT] gameMap has zero dimensions. Retrying initialization...");
                setTimeout(initializeGameElements, 50);
                return;
            }
  
            const tileSizeBasedOnWidth = Math.floor(mapWidth / MAP_COLS);
            const tileSizeBasedOnHeight = Math.floor(mapHeight / MAP_ROWS);
  
            TILE_SIZE = Math.min(tileSizeBasedOnWidth, tileSizeBasedOnHeight);
  
            if (TILE_SIZE === 0) {
                console.warn("[INIT] Calculated TILE_SIZE is 0. Defaulting to 1px.");
                TILE_SIZE = 1;
            }
  
            console.log(`[INIT] Calculated TILE_SIZE: ${TILE_SIZE}px`);
  
            gameMap.style.gridTemplateColumns = `repeat(${MAP_COLS}, ${TILE_SIZE}px)`;
            gameMap.style.gridTemplateRows = `repeat(${MAP_ROWS}, ${TILE_SIZE}px)`;
            console.log(`[INIT] gameMap grid-template-columns/rows set.`);
  
            waitForPlayerDimensions((playerWidth, playerHeight) => {
                if (!isMoving && currentPath.length === 0) {
                  let startTileX = -1;
                  let startTileY = -1;
                  for (let y = 0; y < MAP_ROWS; y++) {
                      for (let x = 0; x < MAP_COLS; x++) {
                          if (gameMapData[y][x] === 0) {
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
  
                  playerX = startTileX * TILE_SIZE + (TILE_SIZE / 2) - (playerWidth / 2);
                  playerY = startTileY * TILE_SIZE + (TILE_SIZE / 2) - (playerHeight / 2);
  
                  targetX = playerX;
                  targetY = playerY;
  
                  updatePlayerPosition();
                  console.log(`[INIT] Player initialized at grid (${playerGridX}, ${playerGridY}) pixel (${playerX.toFixed(0)}, ${playerY.toFixed(0)})`);
                } else {
                  console.log("[INIT] Player position maintained due to map switch or ongoing movement.");
                }
            });
        });
    }
  
    // --- Game Loop for Movement ---
    function gameLoop() {
        if (currentPath.length > 0 && pathIndex < currentPath.length) {
            const nextStep = currentPath[pathIndex];
            const targetPixelX = nextStep.x * TILE_SIZE + (TILE_SIZE / 2) - (player.clientWidth / 2);
            const targetPixelY = nextStep.y * TILE_SIZE + (TILE_SIZE / 2) - (player.clientHeight / 2);
  
            const dx = targetPixelX - playerX;
            const dy = targetPixelY - playerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
  
            if (distance < playerSpeed) {
                playerX = targetPixelX;
                playerY = targetPixelY;
                pathIndex++;
  
                if (pathIndex >= currentPath.length) {
                    currentPath = [];
                    pathIndex = 0;
                    isMoving = false;
                    playerGridX = nextStep.x;
                    playerGridY = nextStep.y;
                    console.log(`[LOOP] Player arrived at final destination: (${playerGridX}, ${playerGridY})`);
                } else {
                    playerGridX = nextStep.x;
                    playerGridY = nextStep.y;
                }
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
    initializeGameElements();
    requestAnimationFrame(gameLoop);
  
  
    // --- Modified Click Event Listener ---
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
  
        const tileTypeAtClick = getTileType(clickedGridX, clickedGridY);
  
        if (tileTypeAtClick === 3) { // It's a door
            // IMPORTANT: currentMapDoorDefinitions MUST reflect the *current* map
            const doorInfo = currentMapDoorDefinitions[`${clickedGridX},${clickedGridY}`];
  
            if (doorInfo) {
              const dx = Math.abs(playerGridX - clickedGridX);
              const dy = Math.abs(playerGridY - clickedGridY);
              const isAdjacent = (dx === 0 && dy === 1) || (dx === 1 && dy === 0);
  
              if (isAdjacent) {
                  console.log(`[CLICK] Player is adjacent to door at (${clickedGridX}, ${clickedGridY}). Entering.`);
                  
                  // --- Re-evaluated and simplified nextMapName determination ---
                  let nextMapName;
                  if (doorInfo.destinationMap === OVERWORLD_MAP_DATA) {
                      nextMapName = "overworld";
                  } else if (doorInfo.destinationMap === HOUSE_INTERIOR_1_MAP_DATA) {
                      nextMapName = "house1_interior";
                  } else if (doorInfo.destinationMap === CAVE_MAP_DATA) {
                      nextMapName = "cave1_interior";
                  } else {
                      console.error("[CLICK] Unknown destination map data for door. Cannot determine next map name.");
                      return; // Prevent further execution if map name cannot be determined
                  }
                  // --- End re-evaluation ---
                  
                  switchMap(doorInfo.destinationMap, doorInfo.spawnPoint.x, doorInfo.spawnPoint.y, nextMapName);
              } else {
                  const adjacentWalkable = findAdjacentWalkableTile(clickedGridX, clickedGridY);
                  if (adjacentWalkable) {
                      const startGrid = { x: playerGridX, y: playerGridY };
                      const endGrid = adjacentWalkable;
                      
                      currentPath = findPath(startGrid, endGrid);
  
                      if (currentPath.length > 0) {
                          if (currentPath[0].x === playerGridX && currentPath[0].y === playerGridY) {
                            currentPath.shift();
                          }
                          if (currentPath.length > 0) {
                              pathIndex = 0;
                              isMoving = true;
                              console.log(`[CLICK] Pathing to door at (${clickedGridX}, ${clickedGridY}) to become adjacent.`);
                          } else {
                              isMoving = false;
                              console.log("[CLICK] Path to adjacent door tile is empty.");
                          }
                      } else {
                          isMoving = false;
                          console.log("[CLICK] No path found to an adjacent walkable tile next to the door.");
                      }
                  } else {
                      console.log(`[CLICK] Door at (${clickedGridX}, ${clickedGridY}) has no walkable adjacent tiles.`);
                  }
              }
            } else {
              // This is the warning you were seeing: currentMapDoorDefinitions was wrong
              console.warn(`[CLICK] No door definition found for tile (${doorKey}) in current map (${currentMapName}).`);
            }
            return;
        }
  
        if (tileTypeAtClick === 1 || tileTypeAtClick === 2) {
            console.log(`[CLICK] Cannot walk on tile type: ${tileTypeAtClick} at grid (${clickedGridX}, ${clickedGridY})`);
            currentPath = [];
            isMoving = false;
            return;
        }
  
        const startGrid = { x: playerGridX, y: playerGridY };
        const endGrid = { x: clickedGridX, y: clickedGridY };
  
        currentPath = findPath(startGrid, endGrid);
  
        if (currentPath.length > 0) {
            if (currentPath[0].x === playerGridX && currentPath[0].y === playerGridY) {
              currentPath.shift();
            }
            if (currentPath.length > 0) {
                pathIndex = 0;
                isMoving = true;
                console.log("[CLICK] Path calculated. Player starting movement.");
            } else {
                isMoving = false;
                console.log("[CLICK] Path calculated, but it's empty.");
            }
        } else {
            isMoving = false;
            console.log("[CLICK] No path found to the clicked destination.");
        }
    });
  
    // Handle window resize to re-calculate TILE_SIZE and update grid/player
    window.addEventListener('resize', () => {
        console.log("[RESIZE] Window resized. Re-initializing elements and re-rendering map.");
        renderMap();
        initializeGameElements();
    });
  });