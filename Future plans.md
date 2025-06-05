verview of the Next Phase (Phase 2: Data Structures & Rendering)
Item Data Structure: Define a standardized way to represent items (e.g., ID, name, type, slot, image path).
Player Inventory & Equipment Arrays: Create JavaScript arrays/objects to hold items that the player possesses and items they have equipped.
UI Element References: Get references to the HTML elements where items will be displayed (inventory list, equipment slots).
Item Rendering Functions:
renderInventory(): A function that takes the playerInventory data and dynamically creates <li> elements in the inventory-list HTML element.
renderEquipment(): A function that takes the playerEquipment data and updates the img tags within the equip-slot divs.