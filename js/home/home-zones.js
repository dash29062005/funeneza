/* =========================================================
   HOME-ZONES.JS
   Choose Your Zone section for homepage

   Responsibilities:
   - Store zone card data
   - Render cards into #zones-grid
   - Reveal cards on scroll
   ========================================================= */

const ZONES_IMAGE_PATH = "./images/zones/";
const ZONE_BOARD_ROWS = 2;
const ZONE_BOARD_COLS = 5;
const ZONE_TARGET_BOARD_WIDTH = 1420;
const ZONE_DOT_SIZE = 20;
const ZONE_CARD_RATIO_W = 3;
const ZONE_CARD_RATIO_H = 4;
const ZONE_CORRIDOR = 1;

let zonesResizeTimer = null;

const zonesData = [
  {
    title: "Arcade",
    subtitle: "Enter Arcade World",
    slug: "arcade"
  },
  {
    title: "Bumper Car",
    subtitle: "Ride Smash Repeat",
    slug: "bumper-car"
  },
  {
    title: "Bowling",
    subtitle: "Roll Strike Repeat",
    slug: "bowling"
  },
  {
    title: "Trampoline",
    subtitle: "Jump Play Repeat",
    slug: "trampoline"
  },
  {
    title: "Cricket Simulator",
    subtitle: "Step Into Stadium",
    slug: "cricket-simulator"
  },
  {
    title: "VR",
    subtitle: "Reality Reimagined Now",
    slug: "vr"
  },
  {
    title: "Adventure",
    subtitle: "Thrill Beyond Limits",
    slug: "adventure"
  },
  {
    title: "Mini Bowling",
    subtitle: "Pocket Size Strikes",
    slug: "mini-bowling"
  },
  {
    title: "SoftPlay",
    subtitle: "Little Joy World",
    slug: "soft-play"
  },
  {
    title: "Cafe & Retro",
    subtitle: "Fuel Your Fun",
    slug: "cafe-retro"
  }
];

function debounce(fn, delay = 140) {
  return (...args) => {
    clearTimeout(zonesResizeTimer);
    zonesResizeTimer = setTimeout(() => fn(...args), delay);
  };
}

function buildZoneCard(zone) {
  const style = [
    "position:absolute",
    `left:${zone.x}px`,
    `top:${zone.y}px`,
    `width:${zone.width}px`,
    `height:${zone.height}px`,
    `min-height:${zone.height}px`
  ].join(";");

  return `
    <article class="zone-card" style="${style}">
      <div class="zone-card-media">
        <img
          src="${ZONES_IMAGE_PATH}${zone.slug}.webp"
          alt="${zone.title}"
          loading="lazy"
        />
      </div>
      <div class="zone-card-body">
        <h3 class="zone-card-title">${zone.title}</h3>
        <p class="zone-card-subtitle">${zone.subtitle}</p>
      </div>
    </article>
  `;
}

/* --- Reveal cards on scroll --- */
function initZoneReveal() {
  const zoneCards = document.querySelectorAll(".zone-card");
  if (!zoneCards.length) return;

  if (!("IntersectionObserver" in window)) {
    zoneCards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px 80px 0px"
    }
  );

  zoneCards.forEach((card) => observer.observe(card));
}

function packZoneCardsPacman(items, containerWidth) {
  const totalCards = ZONE_BOARD_ROWS * ZONE_BOARD_COLS;
  const selectedItems = items.slice(0, totalCards);
  const dotSize = ZONE_DOT_SIZE;
  const corridorSize = ZONE_CORRIDOR * dotSize;
  const maxBoardDots = Math.floor(Math.max(0, Math.min(containerWidth, ZONE_TARGET_BOARD_WIDTH)) / dotSize);
  const availableCardDots = maxBoardDots - (ZONE_BOARD_COLS + 1) * ZONE_CORRIDOR;
  const cardWidthDots = Math.floor(availableCardDots / ZONE_BOARD_COLS);
  const cardHeightDots = Math.max(
    1,
    Math.round((cardWidthDots * ZONE_CARD_RATIO_H) / ZONE_CARD_RATIO_W)
  );
  const boardWidthDots = ZONE_BOARD_COLS * cardWidthDots + (ZONE_BOARD_COLS + 1) * ZONE_CORRIDOR;
  const boardHeightDots = ZONE_BOARD_ROWS * cardHeightDots + (ZONE_BOARD_ROWS + 1) * ZONE_CORRIDOR;
  const boardWidth = boardWidthDots * dotSize;
  const boardHeight = boardHeightDots * dotSize;
  const cardWidth = cardWidthDots * dotSize;
  const cardHeight = cardHeightDots * dotSize;

  if (
    !dotSize ||
    selectedItems.length !== totalCards ||
    cardWidthDots < 1 ||
    cardHeightDots < 1
  ) {
    return null;
  }

  const grid = [];

  // FIX 1: Mark used blocks at the individual DOT level instead of Card level
  function markUsedDots(column, row, wDots, hDots) {
    const startXDot = column * (wDots + ZONE_CORRIDOR);
    const startYDot = row * (hDots + ZONE_CORRIDOR);

    for (let y = startYDot; y < startYDot + hDots; y++) {
      if (!grid[y]) grid[y] = [];
      for (let x = startXDot; x < startXDot + wDots; x++) {
        grid[y][x] = true;
      }
    }
  }

  const layoutItems = selectedItems.map((item, index) => {
    const row = Math.floor(index / ZONE_BOARD_COLS);
    const column = index % ZONE_BOARD_COLS;
    const x = (ZONE_CORRIDOR + column * (cardWidthDots + ZONE_CORRIDOR)) * dotSize;
    const y = (ZONE_CORRIDOR + row * (cardHeightDots + ZONE_CORRIDOR)) * dotSize;

    // FIX 2: Map the card boundaries into the dot grid matrix
    markUsedDots(column, row, cardWidthDots, cardHeightDots);

    return {
      ...item,
      x,
      y,
      width: cardWidth,
      height: cardHeight,
      row,
      column
    };
  });

  layoutItems.grid = grid;
  layoutItems.dotSize = dotSize;
  layoutItems.corridor = ZONE_CORRIDOR;
  
  // FIX 3: Assign rows and cols to the actual DOT totals so the animation spans the whole container
  layoutItems.cols = boardWidthDots;
  layoutItems.rows = boardHeightDots;
  
  layoutItems.boardWidth = boardWidth;
  layoutItems.boardHeight = boardHeight;
  layoutItems.cardWidth = cardWidth;
  layoutItems.cardHeight = cardHeight;

  return layoutItems;
}

function renderZoneBoard(layoutItems, zonesGrid) {
  zonesGrid.style.position = "relative";
  zonesGrid.style.width = `${layoutItems.boardWidth}px`;
  zonesGrid.style.height = `${layoutItems.boardHeight}px`;
  zonesGrid.style.margin = "0 auto";
  zonesGrid.style.setProperty("--zone-dot-size", `${layoutItems.dotSize}px`);

  // Target pre-rendered DOM elements and inject sizing/coordinates smoothly
  layoutItems.forEach((zone) => {
    const cardEl = zonesGrid.querySelector(`.zone-card[data-slug="${zone.slug}"]`);
    if (cardEl) {
      cardEl.style.position = "absolute";
      cardEl.style.left = `${zone.x}px`;
      cardEl.style.top = `${zone.y}px`;
      cardEl.style.width = `${zone.width}px`;
      cardEl.style.height = `${zone.height}px`;
      cardEl.style.minHeight = `${zone.height}px`;
    }
  });
}


function publishZoneBoard(layoutItems) {
  const board = {
    cards: layoutItems,
    grid: layoutItems.grid,       // Expose the dot-level grid array
    rows: layoutItems.rows,       // Passes the total dot rows count
    cols: layoutItems.cols,       // Passes the total dot columns count
    corridorSize: layoutItems.corridor * layoutItems.dotSize,
    cardWidth: layoutItems.cardWidth,
    cardHeight: layoutItems.cardHeight,
    boardWidth: layoutItems.boardWidth,
    boardHeight: layoutItems.boardHeight
  };

  window.zoneGameBoard = board;
  window.dispatchEvent(
    new CustomEvent("zone-board-ready", {
      detail: board
    })
  );
}  
  function runZoneBoardLayout() {
  const zonesGrid = document.getElementById("zones-grid");
  if (!zonesGrid) return;

  const sectionEl = document.querySelector(".home-zones");
  const container = sectionEl?.querySelector(".container");
  const containerWidth = Math.max(0, Math.floor((container || zonesGrid).clientWidth));
  const layoutItems = packZoneCardsPacman(zonesData, containerWidth);

  if (!layoutItems) {
    zonesGrid.innerHTML = "";
    zonesGrid.style.height = "0px";
    return;
  }

  renderZoneBoard(layoutItems, zonesGrid);
  initZoneReveal();
  publishZoneBoard(layoutItems);
}

const rerunZoneBoardLayout = debounce(() => {
  runZoneBoardLayout();
}, 160);

/* --- Main zones init --- */
export function initZones() {
  const zonesGrid = document.getElementById("zones-grid");
  if (!zonesGrid) return;

  runZoneBoardLayout();
  window.removeEventListener("resize", rerunZoneBoardLayout);
  window.addEventListener("resize", rerunZoneBoardLayout, { passive: true });
}
