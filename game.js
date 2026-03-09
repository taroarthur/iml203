// ============================================================================
// LA 2076 BOARD GAME - JavaScript Game Logic
// ============================================================================

// ============================================================================
// GAME CONFIGURATION & DATA
// ============================================================================

// LA Boardgame Board Spots - Representing a map of Los Angeles
// Coordinates mapped from Long Beach (south) to Burbank (north) and 
// Coast (west) to El Monte (east)
// Major roads included: 405, 101, 10, 110, Figueroa, Sunset, Hollywood, etc.
const LABoardSpots = [
    // Northern tier (Burbank/San Fernando Valley area) - Near 101, 405
    { id: 0, name: "Burbank", x: 450, y: 80, type: "normal", neighbors: [1, 20] },
    { id: 1, name: "North Hollywood (101)", x: 520, y: 120, type: "normal", neighbors: [0, 2, 21] },
    { id: 2, name: "Griffith Park", x: 580, y: 140, type: "event", neighbors: [1, 3, 22] },
    { id: 3, name: "Los Feliz", x: 600, y: 180, type: "normal", neighbors: [2, 4, 23] },
    { id: 4, name: "Highland Park", x: 650, y: 200, type: "event", neighbors: [3, 5, 24] },
    
    // Upper East LA
    { id: 5, name: "Eagle Rock", x: 700, y: 220, type: "normal", neighbors: [4, 6, 25] },
    { id: 6, name: "South Pasadena", x: 720, y: 270, type: "normal", neighbors: [5, 7, 26] },
    { id: 7, name: "Pasadena", x: 750, y: 160, type: "event", neighbors: [6, 1, 8] },
    { id: 8, name: "Sierra Madre", x: 800, y: 140, type: "normal", neighbors: [7, 9] },
    { id: 9, name: "Arcadia", x: 820, y: 200, type: "normal", neighbors: [8, 6, 10] },
    
    // West LA / Santa Monica area
    { id: 10, name: "Malibu (Coast)", x: 150, y: 100, type: "normal", neighbors: [11, 30] },
    { id: 11, name: "Topanga Canyon", x: 200, y: 150, type: "normal", neighbors: [10, 12, 31] },
    { id: 12, name: "Santa Monica (Coast)", x: 250, y: 200, type: "event", neighbors: [11, 13, 32] },
    { id: 13, name: "Brentwood (405)", x: 300, y: 240, type: "normal", neighbors: [12, 14, 33] },
    { id: 14, name: "Pacific Palisades", x: 220, y: 280, type: "event", neighbors: [13, 15, 34] },
    { id: 15, name: "Malibu Hills", x: 160, y: 250, type: "normal", neighbors: [14, 10, 11] },
    
    // Central/Hollywood area
    { id: 16, name: "Hollywood (Sunset Blvd)", x: 480, y: 200, type: "event", neighbors: [17, 18, 35] },
    { id: 17, name: "West Hollywood", x: 420, y: 240, type: "normal", neighbors: [16, 19, 36] },
    { id: 18, name: "Hollywood Hills", x: 520, y: 240, type: "normal", neighbors: [16, 2, 37] },
    { id: 19, name: "Beverly Hills (405)", x: 380, y: 280, type: "event", neighbors: [17, 20, 38] },
    { id: 20, name: "Encino (405/101)", x: 420, y: 140, type: "normal", neighbors: [0, 19, 39] },
    
    // Downtown LA area
    { id: 21, name: "Figueroa Corridor (110)", x: 450, y: 320, type: "normal", neighbors: [1, 22, 40] },
    { id: 22, name: "Downtown LA", x: 520, y: 300, type: "event", neighbors: [2, 21, 23, 41] },
    { id: 23, name: "Boyle Heights", x: 600, y: 320, type: "normal", neighbors: [3, 22, 24, 42] },
    { id: 24, name: "Lincoln Heights", x: 650, y: 300, type: "event", neighbors: [4, 23, 5, 43] },
    
    // Mid-city LA
    { id: 25, name: "Echo Park", x: 620, y: 360, type: "normal", neighbors: [5, 24, 44] },
    { id: 26, name: "Silver Lake", x: 660, y: 380, type: "event", neighbors: [6, 25, 45] },
    { id: 27, name: "El Monte (East)", x: 750, y: 340, type: "event", neighbors: [9, 26, 46] },
    
    // South-central LA
    { id: 28, name: "Koreatown", x: 480, y: 360, type: "event", neighbors: [21, 22, 40, 47] },
    { id: 29, name: "Hancock Park", x: 450, y: 400, type: "normal", neighbors: [17, 28, 41, 48] },
    { id: 30, name: "Wilshire District", x: 380, y: 340, type: "normal", neighbors: [13, 19, 29, 49] },
    { id: 31, name: "West LA (10 Freeway)", x: 320, y: 300, type: "event", neighbors: [12, 13, 30, 50] },
    { id: 32, name: "Bel Air", x: 340, y: 240, type: "normal", neighbors: [12, 31, 51] },
    
    // Mid-South LA
    { id: 33, name: "Encino Hills", x: 360, y: 160, type: "normal", neighbors: [13, 19, 20] },
    { id: 34, name: "Calabasas", x: 250, y: 180, type: "normal", neighbors: [14, 15, 10] },
    { id: 35, name: "Studio City", x: 500, y: 160, type: "normal", neighbors: [16, 18, 1, 20] },
    { id: 36, name: "Sherman Oaks", x: 440, y: 180, type: "normal", neighbors: [17, 35, 19] },
    
    // West Adams / South LA
    { id: 37, name: "Los Feliz Village", x: 540, y: 280, type: "normal", neighbors: [16, 18, 23] },
    { id: 38, name: "Leimert Park", x: 520, y: 420, type: "normal", neighbors: [28, 29, 47, 48] },
    { id: 39, name: "Ladera Heights", x: 420, y: 460, type: "event", neighbors: [29, 30, 50, 49] },
    { id: 40, name: "Inglewood (405/101)", x: 400, y: 380, type: "event", neighbors: [21, 28, 39] },
    
    // Playa / Beach areas
    { id: 41, name: "Playa Vista (405)", x: 340, y: 380, type: "normal", neighbors: [22, 31, 40, 49] },
    { id: 42, name: "Mar Vista", x: 300, y: 420, type: "normal", neighbors: [23, 31, 41, 50] },
    { id: 43, name: "West Adams", x: 600, y: 380, type: "normal", neighbors: [24, 25, 45, 53] },
    { id: 44, name: "Cypress Park", x: 640, y: 420, type: "normal", neighbors: [25, 26, 46, 54] },
    { id: 45, name: "Mount Washington", x: 680, y: 400, type: "event", neighbors: [26, 43, 44, 55] },
    
    // Long Beach area
    { id: 46, name: "Baldwin Park", x: 720, y: 380, type: "normal", neighbors: [27, 44, 45] },
    { id: 47, name: "Crenshaw District", x: 480, y: 460, type: "event", neighbors: [28, 38, 40, 48] },
    { id: 48, name: "View Park", x: 520, y: 480, type: "normal", neighbors: [38, 39, 47, 49] },
    { id: 49, name: "Culver City (10)", x: 380, y: 440, type: "event", neighbors: [30, 39, 41, 42, 50] },
    { id: 50, name: "Torrance", x: 300, y: 480, type: "normal", neighbors: [31, 42, 49, 51] },
    
    // South Bay
    { id: 51, name: "Palos Verdes", x: 200, y: 500, type: "event", neighbors: [32, 50, 52] },
    { id: 52, name: "Redondo Beach (Coast)", x: 180, y: 580, type: "normal", neighbors: [51, 60] },
    
    // Mid-South
    { id: 53, name: "Denny Park", x: 600, y: 440, type: "normal", neighbors: [43, 44, 54, 56] },
    { id: 54, name: "Glassell Park", x: 680, y: 460, type: "event", neighbors: [45, 46, 53, 57] },
    { id: 55, name: "East LA", x: 700, y: 420, type: "normal", neighbors: [45, 54, 58] },
    
    // Southeast Los Angeles
    { id: 56, name: "South Gate", x: 580, y: 500, type: "normal", neighbors: [53, 54, 64] },
    { id: 57, name: "Vernon", x: 660, y: 500, type: "normal", neighbors: [54, 55, 65] },
    { id: 58, name: "Montebello", x: 740, y: 440, type: "event", neighbors: [55, 57, 66] },
    
    // Long Beach approach
    { id: 59, name: "Compton", x: 520, y: 560, type: "event", neighbors: [48, 56, 64] },
    { id: 60, name: "Long Beach (Coast)", x: 320, y: 620, type: "event", neighbors: [52, 61, 62] },
    { id: 61, name: "Long Beach Port", x: 380, y: 660, type: "normal", neighbors: [60, 59, 63] },
    { id: 62, name: "Lakewood", x: 420, y: 640, type: "event", neighbors: [60, 61, 64] },
    { id: 63, name: "Signal Hill", x: 460, y: 620, type: "normal", neighbors: [61, 62, 65] },
    { id: 64, name: "Downey", x: 560, y: 580, type: "normal", neighbors: [56, 59, 63, 66] },
    { id: 65, name: "Bell/Bell Gardens", x: 640, y: 560, type: "event", neighbors: [57, 63, 64, 66] },
    { id: 66, name: "Whittier", x: 720, y: 520, type: "event", neighbors: [58, 65, 67] },
    { id: 67, name: "Norwalk (Santa Fe Springs)", x: 780, y: 540, type: "normal", neighbors: [66] }
];

// Candidate Roles with unique advantages
const CandidateRoles = [
    {
        id: "tech",
        name: "Tech Entrepreneur",
        description: "Start with 3 extra Resource Cards",
        benefit: "Gain 3 extra resources at game start"
    },
    {
        id: "labor",
        name: "Labor Union Representative",
        description: "Draw Policy Cards cost 0 moves instead of 1",
        benefit: "Policy cards are free to draw"
    },
    {
        id: "environmental",
        name: "Environmental Activist",
        description: "Each billboard purchased grants 2 extra votes",
        benefit: "+2 votes per billboard"
    },
    {
        id: "business",
        name: "Business Leader",
        description: "Resource Cards cost only 2 per action instead of 3/5/10",
        benefit: "-1 resource cost per action"
    },
    {
        id: "community",
        name: "Community Organizer",
        description: "Host campaign events grant 2 extra votes",
        benefit: "+2 votes per campaign event"
    },
    {
        id: "political",
        name: "Veteran Politician",
        description: "Start with 3 Policy Cards instead of 0",
        benefit: "Start with 3 cards"
    }
];

// Policy Cards (Color-coded by category)
const PolicyCards = [
    // Red policies - Housing/Development
    { id: 1, color: "red", name: "Housing Development", votes: 10, category: "housing" },
    { id: 2, color: "red", name: "Affordable Housing", votes: 15, category: "housing" },
    { id: 3, color: "red", name: "Homelessness Solutions", votes: 20, category: "housing" },
    
    // Blue policies - Public Services/Infrastructure
    { id: 4, color: "blue", name: "Public Transportation", votes: 10, category: "infrastructure" },
    { id: 5, color: "blue", name: "Water/Sewage System", votes: 15, category: "infrastructure" },
    { id: 6, color: "blue", name: "Infrastructure Overhaul", votes: 20, category: "infrastructure" },
    
    // Yellow policies - Jobs/Economy
    { id: 7, color: "yellow", name: "Job Creation", votes: 10, category: "economy" },
    { id: 8, color: "yellow", name: "Small Business Support", votes: 15, category: "economy" },
    { id: 9, color: "yellow", name: "Economic Growth", votes: 20, category: "economy" },
    
    // Green policies - Environment/Parks
    { id: 10, color: "green", name: "Park Expansion", votes: 10, category: "environment" },
    { id: 11, color: "green", name: "Clean Air Initiative", votes: 15, category: "environment" },
    { id: 12, color: "green", name: "Green City Plan", votes: 20, category: "environment" },
    
    // Purple policies - Education/Safety
    { id: 13, color: "purple", name: "School Funding", votes: 10, category: "education" },
    { id: 14, color: "purple", name: "Police Reform", votes: 15, category: "education" },
    { id: 15, color: "purple", name: "Public Safety Plan", votes: 20, category: "education" },
];

// Event Cards - Expanded variety for better gameplay
const EventCards = [
    // Red events - Housing/Development
    { id: 1, color: "red", title: "Housing Crisis Deepens", description: "Residents need affordable housing solutions in their neighborhoods", voteValue: 15 },
    { id: 2, color: "red", title: "Homelessness Surge", description: "Downtown streets overflow with unhoused individuals", voteValue: 20 },
    { id: 3, color: "red", title: "Eviction Wave", description: "Families being displaced from neighborhoods across LA", voteValue: 25 },
    { id: 4, color: "red", title: "Affordable Housing Demand", description: "Community groups demand new affordable units", voteValue: 15 },
    { id: 5, color: "red", title: "Housing Development Controversy", description: "Neighborhood opposes new mixed-use development", voteValue: 20 },
    
    // Blue events - Infrastructure/Transit
    { id: 6, color: "blue", title: "405 Gridlock", description: "Massive traffic jam on the 405 freeway at rush hour", voteValue: 15 },
    { id: 7, color: "blue", title: "Water Main Breaks", description: "Critical infrastructure failure causing service disruption", voteValue: 20 },
    { id: 8, color: "blue", title: "Metro Strike", description: "Public transit workers demand better conditions and pay", voteValue: 25 },
    { id: 9, color: "blue", title: "Pothole Crisis", description: "Streets deteriorate, public demands road repairs", voteValue: 15 },
    { id: 10, color: "blue", title: "Subway Expansion Planned", description: "Community meetings for new transit corridor", voteValue: 20 },
    
    // Yellow events - Economy/Jobs
    { id: 11, color: "yellow", title: "Job Losses", description: "Major companies laying off workers in Los Angeles", voteValue: 15 },
    { id: 12, color: "yellow", title: "Business District Decline", description: "Small businesses closing due to rising costs and gentrification", voteValue: 20 },
    { id: 13, color: "yellow", title: "Economic Recession", description: "LA economy hits major downturn affecting all sectors", voteValue: 25 },
    { id: 14, color: "yellow", title: "Startup Boom", description: "Tech companies moving to LA and hiring workers", voteValue: 15 },
    { id: 15, color: "yellow", title: "Retail Renewal Project", description: "Plans announced to revitalize downtown shopping district", voteValue: 20 },
    
    // Green events - Environment/Climate
    { id: 16, color: "green", title: "Smog Alert", description: "Poor air quality engulfs Los Angeles for days", voteValue: 15 },
    { id: 17, color: "green", title: "Wildfire Threat", description: "Massive fires in hills approaching neighborhoods and causing evacuations", voteValue: 20 },
    { id: 18, color: "green", title: "Climate Emergency", description: "Extreme heat wave and severe drought conditions grips the city", voteValue: 25 },
    { id: 19, color: "green", title: "Green Space Initiative", description: "Communities demand more parks and nature reserves", voteValue: 15 },
    { id: 20, color: "green", title: "Ocean Pollution Crisis", description: "Beach communities fight to protect marine life", voteValue: 20 },
    
    // Purple events - Education/Safety
    { id: 21, color: "purple", title: "School Crowding", description: "Local schools severely overcrowded with insufficient resources", voteValue: 15 },
    { id: 22, color: "purple", title: "Crime Wave Concerns", description: "Violence increases in neighborhoods raising safety concerns", voteValue: 20 },
    { id: 23, color: "purple", title: "Gang Violence Crisis", description: "Severe gang conflicts and violence in multiple communities", voteValue: 25 },
    { id: 24, color: "purple", title: "Youth Program Success", description: "Community youth center opens and reduces crime", voteValue: 15 },
    { id: 25, color: "purple", title: "School Funding Expansion", description: "Parents demand increased education budget allocation", voteValue: 20 },
];

// Scandal Cards
const ScandalCards = [
    { id: 1, title: "Campaign Finance Scandal", description: "Illegal donations discovered", voteValue: -20, isScandalCard: true },
    { id: 2, title: "Corruption Investigation", description: "Former associates under federal indictment", voteValue: -20, isScandalCard: true },
    { id: 3, title: "Public Comments Controversy", description: "Offensive statement recorded and released", voteValue: -20, isScandalCard: true },
    { id: 4, title: "Failed Project", description: "Major initiative collapses", voteValue: -20, isScandalCard: true },
    { id: 5, title: "Scandal in the Media", description: "Front page news exposes problems", voteValue: -20, isScandalCard: true },
];

// ============================================================================
// GAME STATE
// ============================================================================

class Game {
    constructor() {
        this.gameState = "setup"; // setup, roleSelection, playing, ended
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.gameEndTime = null;
        this.timerInterval = null;
        this.selectedRole = null;
        this.selectedRoleByPlayer = {};
        this.movesRemaining = 5;
        this.currentDisplayedEvent = null;
        
        // Card decks
        this.policyDeck = [];
        this.eventDeck = [];
        this.resourceDeck = [];
        
        this.initializeDom();
    }

    initializeDom() {
        // Setup screen
        document.getElementById("startGameBtn").addEventListener("click", () => {
            const playerCount = parseInt(document.getElementById("playerCount").value);
            this.startGameSetup(playerCount);
        });

        // Player names screen
        document.getElementById("continueBtn").addEventListener("click", () => {
            this.collectPlayerNames();
        });

        // Role selection
        document.getElementById("selectRoleBtn").addEventListener("click", () => {
            this.selectPlayerRole();
        });

        // Game actions
        document.getElementById("drawPolicyBtn").addEventListener("click", () => {
            this.drawPolicyCard();
        });

        document.getElementById("drawResourceBtn").addEventListener("click", () => {
            this.drawResourceCard();
        });

        document.getElementById("endTurnBtn").addEventListener("click", () => {
            this.endTurn();
        });

        // Campaign actions
        document.getElementById("buyBillboardBtn").addEventListener("click", () => {
            this.buyCampaignAction("billboard");
        });

        document.getElementById("hostEventBtn").addEventListener("click", () => {
            this.buyCampaignAction("event");
        });

        document.getElementById("sabotageBtn").addEventListener("click", () => {
            this.buyCampaignAction("sabotage");
        });

        // End game
        document.getElementById("playAgainBtn").addEventListener("click", () => {
            location.reload();
        });
    }

    startGameSetup(playerCount) {
        // Create players
        this.players = [];
        for (let i = 0; i < playerCount; i++) {
            this.players.push({
                id: i,
                name: `Player ${i + 1}`,
                votes: 0,
                resources: 0,
                billboards: 0,
                policyCards: [],
                position: 0,
                role: null,
                color: this.getPlayerColor(i),
                scandalsResolved: 0,
                guestList: []
            });
        }

        // Show player names screen
        this.showPlayerNamesScreen();
    }

    showPlayerNamesScreen() {
        const form = document.getElementById("playerNamesForm");
        form.innerHTML = "";
        
        for (let i = 0; i < this.players.length; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Player ${i + 1} Name`;
            input.value = `Player ${i + 1}`;
            input.id = `playerName${i}`;
            form.appendChild(input);
        }

        this.switchScreen("playerNamesScreen");
    }

    collectPlayerNames() {
        for (let i = 0; i < this.players.length; i++) {
            const name = document.getElementById(`playerName${i}`).value || `Player ${i + 1}`;
            this.players[i].name = name;
        }

        // Reverse order for role selection
        this.currentPlayerIndex = this.players.length - 1;
        this.showRoleSelectionForPlayer();
    }

    showRoleSelectionForPlayer() {
        if (this.currentPlayerIndex < 0) {
            // All roles selected, start game
            this.startGame();
            return;
        }

        const player = this.players[this.currentPlayerIndex];
        document.getElementById("currentPlayerRole").textContent = `${player.name}, select your role:`;
        
        const rolesContainer = document.getElementById("rolesContainer");
        rolesContainer.innerHTML = "";
        
        CandidateRoles.forEach((role) => {
            const roleCard = document.createElement("div");
            roleCard.className = "role-card";
            roleCard.innerHTML = `
                <div class="role-name">${role.name}</div>
                <div class="role-benefit">${role.benefit}</div>
            `;
            
            roleCard.addEventListener("click", () => {
                this.selectRole(role);
            });
            
            rolesContainer.appendChild(roleCard);
        });

        this.switchScreen("roleSelectionScreen");
    }

    selectRole(role) {
        const player = this.players[this.currentPlayerIndex];
        player.role = role;
        this.selectedRoleByPlayer[player.id] = role;
        
        // Remove the selected role from availability
        this.currentPlayerIndex--;
        this.showRoleSelectionForPlayer();
    }

    startGame() {
        this.gameState = "playing";
        this.gameStarted = true;
        this.movesRemaining = 5;
        this.initializeDecks();
        this.currentPlayerIndex = 0;
        
        // Apply role bonuses
        this.players.forEach(player => {
            if (player.role.id === "tech") {
                player.resources = 3;
            } else if (player.role.id === "political") {
                // Draw 3 policy cards
                for (let i = 0; i < 3 && this.policyDeck.length > 0; i++) {
                    player.policyCards.push(this.policyDeck.pop());
                }
            }
        });

        // Set game end time
        this.gameEndTime = Date.now() + 20 * 60 * 1000; // 20 minutes from now

        this.switchScreen("gameScreen");
        this.renderBoard();
        this.updateUI();
        this.startTimer();
    }

    initializeDecks() {
        // Create shuffled copies of card decks
        this.policyDeck = [...PolicyCards].sort(() => Math.random() - 0.5);
        
        // Event deck with only a few scandals mixed in (better balance)
        this.eventDeck = [...EventCards];
        // Add only 2-3 scandal cards for the entire game (vs 15 before)
        const numScandals = Math.floor(Math.random() * 2) + 2; // 2 or 3 scandals
        const shuffledScandals = [...ScandalCards].sort(() => Math.random() - 0.5);
        for (let i = 0; i < numScandals; i++) {
            this.eventDeck.push(shuffledScandals[i]);
        }
        this.eventDeck = this.eventDeck.sort(() => Math.random() - 0.5);
        
        // Resource cards (represent financial resources)
        this.resourceDeck = Array(50).fill().map((_, i) => ({ id: i, type: "resource", amount: 1 }));
        this.resourceDeck = this.resourceDeck.sort(() => Math.random() - 0.5);
    }

    startTimer() {
        this.updateTimer();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const timeLeft = Math.max(0, this.gameEndTime - Date.now());
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const timerDisplay = document.getElementById("timerDisplay");
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        
        if (timeLeft < 60000) {
            timerDisplay.classList.add("low-time");
        }

        if (timeLeft <= 0) {
            clearInterval(this.timerInterval);
            this.endGame();
        }
    }

    // ============================================================================
    // GAME LOGIC
    // ============================================================================

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    getPlayerColor(index) {
        const colors = ["#e74c3c", "#3498db", "#f39c12", "#27ae60", "#9b59b6", "#1abc9c"];
        return colors[index % colors.length];
    }

    renderBoard() {
        const svg = document.getElementById("gameBoard");
        svg.innerHTML = "";

        // Draw background map
        this.drawLAMap(svg);

        // Create a group for connections so they appear behind spots
        const connectionsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        connectionsGroup.setAttribute("id", "connections-layer");
        svg.appendChild(connectionsGroup);

        // Draw connections between spots
        LABoardSpots.forEach(spot => {
            if (spot.neighbors) {
                spot.neighbors.forEach(neighborId => {
                    if (neighborId > spot.id) { // Draw each connection only once
                        const neighbor = LABoardSpots[neighborId];
                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", spot.x);
                        line.setAttribute("y1", spot.y);
                        line.setAttribute("x2", neighbor.x);
                        line.setAttribute("y2", neighbor.y);
                        line.setAttribute("stroke", "#999");
                        line.setAttribute("stroke-width", "2");
                        line.setAttribute("opacity", "0.6");
                        connectionsGroup.appendChild(line);
                    }
                });
            }
        });

        // Create groups for spots and labels
        const spotsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        spotsGroup.setAttribute("id", "spots-layer");
        svg.appendChild(spotsGroup);

        const labelsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        labelsGroup.setAttribute("id", "labels-layer");
        svg.appendChild(labelsGroup);

        // Draw spots
        LABoardSpots.forEach(spot => {
            // Circle for the spot
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", spot.x);
            circle.setAttribute("cy", spot.y);
            circle.setAttribute("r", "14");
            circle.setAttribute("class", `board-spot ${spot.type}`);
            
            circle.addEventListener("click", () => {
                this.selectSpot(spot.id);
            });
            
            spotsGroup.appendChild(circle);
        });

        // Draw labels with better positioning to avoid overlap
        LABoardSpots.forEach((spot, idx) => {
            // Calculate label position to minimize overlaps
            const labelY = spot.y + 28;
            
            // Background rectangle for text (smaller and more compact)
            const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bgRect.setAttribute("x", spot.x - 35);
            bgRect.setAttribute("y", labelY - 8);
            bgRect.setAttribute("width", "70");
            bgRect.setAttribute("height", "14");
            bgRect.setAttribute("fill", "white");
            bgRect.setAttribute("opacity", "0.9");
            bgRect.setAttribute("rx", "2");
            bgRect.setAttribute("stroke", "#ddd");
            bgRect.setAttribute("stroke-width", "0.5");
            labelsGroup.appendChild(bgRect);
            
            // Label text (smaller font)
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", spot.x);
            text.setAttribute("y", labelY);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "10");
            text.setAttribute("font-weight", "500");
            labelsGroup.appendChild(text);
        });

        this.renderPlayerPositions();
    }

    drawLAMap(svg) {
        // Create a background group
        const mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        mapGroup.setAttribute("id", "la-map-background");
        svg.insertBefore(mapGroup, svg.firstChild);

        // Draw ocean/coastline
        const ocean = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        ocean.setAttribute("x", "0");
        ocean.setAttribute("y", "0");
        ocean.setAttribute("width", "900");
        ocean.setAttribute("height", "700");
        ocean.setAttribute("fill", "#e3f2fd");
        mapGroup.appendChild(ocean);

        // Draw coast line (approximation of LA coast)
        const coastPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        coastPath.setAttribute("d", "M 200,50 Q 150,100 140,200 Q 130,300 160,400 Q 180,500 250,600 Q 320,700 400,700 L 900,700 L 900,0 Q 800,80 650,100 Q 500,120 200,50 Z");
        coastPath.setAttribute("fill", "#b3e5fc");
        coastPath.setAttribute("opacity", "0.6");
        mapGroup.appendChild(coastPath);

        // Mountain/hill regions (north)
        const northMountains = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        northMountains.setAttribute("cx", "500");
        northMountains.setAttribute("cy", "150");
        northMountains.setAttribute("rx", "200");
        northMountains.setAttribute("ry", "100");
        northMountains.setAttribute("fill", "#d7ccc8");
        northMountains.setAttribute("opacity", "0.3");
        mapGroup.appendChild(northMountains);

        // Santa Monica Mountains (west)
        const westMountains = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        westMountains.setAttribute("cx", "250");
        westMountains.setAttribute("cy", "250");
        westMountains.setAttribute("rx", "120");
        westMountains.setAttribute("ry", "150");
        westMountains.setAttribute("fill", "#d7ccc8");
        westMountains.setAttribute("opacity", "0.25");
        mapGroup.appendChild(westMountains);

        // San Gabriel Mountains (east/northeast)
        const eastMountains = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        eastMountains.setAttribute("cx", "750");
        eastMountains.setAttribute("cy", "200");
        eastMountains.setAttribute("rx", "100");
        eastMountains.setAttribute("ry", "140");
        eastMountains.setAttribute("fill", "#d7ccc8");
        eastMountains.setAttribute("opacity", "0.3");
        mapGroup.appendChild(eastMountains);

        // Major freeway corridors (visual only)
        const freeways = [
            // 405 corridor
            { points: "M 350,100 Q 380,250 400,400 Q 420,600 450,700", name: "405" },
            // 101 corridor
            { points: "M 350,80 Q 450,150 500,300 Q 520,500 550,700", name: "101" },
            // 10 corridor
            { points: "M 300,250 Q 400,300 500,350 Q 600,400 700,450", name: "10" },
            // 110 corridor
            { points: "M 450,200 Q 480,280 510,350 Q 520,450 530,700", name: "110" }
        ];

        freeways.forEach(freeway => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", freeway.points);
            path.setAttribute("stroke", "#ffb74d");
            path.setAttribute("stroke-width", "3");
            path.setAttribute("fill", "none");
            path.setAttribute("opacity", "0.15");
            mapGroup.appendChild(path);
        });

        // Regional boundaries/zones (subtle)
        const zones = [
            // Santa Monica/Westside zone
            { x: 250, y: 300, r: 150, name: "Westside" },
            // Central LA zone
            { x: 480, y: 350, r: 140, name: "Central" },
            // Downtown zone
            { x: 530, y: 280, r: 100, name: "Downtown" },
            // South LA zone
            { x: 500, y: 500, r: 150, name: "South LA" },
            // San Gabriel Valley zone
            { x: 750, y: 350, r: 120, name: "San Gabriel" }
        ];

        zones.forEach(zone => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", zone.x);
            circle.setAttribute("cy", zone.y);
            circle.setAttribute("r", zone.r);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", "#ccc");
            circle.setAttribute("stroke-width", "1");
            circle.setAttribute("stroke-dasharray", "4,4");
            circle.setAttribute("opacity", "0.3");
            mapGroup.appendChild(circle);
        });
    }

    renderPlayerPositions() {
        const svg = document.getElementById("gameBoard");
        const playersGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        playersGroup.setAttribute("id", "players-layer");
        svg.appendChild(playersGroup);
        
        this.players.forEach((player, index) => {
            const spot = LABoardSpots[player.position];
            
            // Calculate offset for multiple players on same spot
            const offsetX = -12 + (index * 8);
            const offsetY = -18;

            // Draw meeple background circle
            const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            bgCircle.setAttribute("cx", spot.x + offsetX);
            bgCircle.setAttribute("cy", spot.y + offsetY);
            bgCircle.setAttribute("r", "8.5");
            bgCircle.setAttribute("fill", player.color);
            bgCircle.setAttribute("stroke", "#333");
            bgCircle.setAttribute("stroke-width", "2");
            bgCircle.setAttribute("filter", "drop-shadow(0 2px 3px rgba(0,0,0,0.3))");
            playersGroup.appendChild(bgCircle);

            // Draw number for player
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", spot.x + offsetX);
            text.setAttribute("y", spot.y + offsetY + 4);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "13");
            text.setAttribute("fill", "white");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("pointer-events", "none");
            text.textContent = player.id + 1;
            playersGroup.appendChild(text);
        });
    }

    selectSpot(spotId) {
        const player = this.getCurrentPlayer();
        const currentSpot = LABoardSpots[player.position];
        const targetSpot = LABoardSpots[spotId];

        // Check if movement is valid
        if (spotId === player.position) {
            if (targetSpot.type === "event") {
                this.drawEventCard(spotId);
            }
            return;
        }

        // Check if it's a neighbor and we have moves
        if (currentSpot.neighbors && currentSpot.neighbors.includes(spotId) && this.movesRemaining > 0) {
            player.position = spotId;
            this.movesRemaining--;
            
            // Check if the spot has an event
            if (targetSpot.type === "event") {
                this.drawEventCard(spotId);
            }
            
            this.renderBoard();
            this.updateUI();
        } else if (!currentSpot.neighbors || !currentSpot.neighbors.includes(spotId)) {
            alert("That spot is not adjacent to your current position!");
        } else if (this.movesRemaining <= 0) {
            alert("You have no moves remaining!");
        }
    }

    drawEventCard(spotId) {
        if (this.eventDeck.length === 0) {
            alert("No more event cards!");
            return;
        }

        const card = this.eventDeck.pop();
        this.currentDisplayedEvent = card;
        this.showEventModal(card, spotId);
    }

    showEventModal(card, spotId) {
        const modal = document.getElementById("eventModal");
        const eventCard = document.getElementById("eventCard");
        const eventActions = document.getElementById("eventActions");

        if (card.isScandalCard) {
            eventCard.innerHTML = `
                <div class="event-title">⚠️ SCANDAL</div>
                <div class="event-description">${card.title}</div>
                <div class="event-description">${card.description}</div>
                <div class="event-value">-${Math.abs(card.voteValue)} votes</div>
            `;

            eventActions.innerHTML = `
                <button class="btn-resolve" onclick="game.resolveScandalAccept(${card.voteValue})">Accept Scandal (-${Math.abs(card.voteValue)} votes)</button>
                <button class="btn-cancel" onclick="game.resolveScandalSpend()">Spend 2 Resources to Cancel</button>
            `;
        } else {
            const player = this.getCurrentPlayer();
            const matchingCards = player.policyCards.filter(p => p.color === card.color);
            
            eventCard.innerHTML = `
                <div class="event-title">${card.title}</div>
                <div class="event-description">${card.description}</div>
                <div class="event-value">Base: ${card.voteValue} votes</div>
                <div style="font-size: 12px; color: #666; margin-top: 10px;">
                    Matching Policy Cards in hand: ${matchingCards.length}
                </div>
            `;

            let actionHtml = '';
            
            if (matchingCards.length > 0) {
                actionHtml = `<button class="btn-resolve" onclick="game.resolveEventWithPolicy()">Use Policy Card(s) for ${card.voteValue} votes</button>`;
            } else {
                actionHtml = `<p style="color: #666; font-size: 14px;">You need a matching policy card to gain votes from this event.</p>
                              <button class="btn-cancel" onclick="game.closeEventModal()">Continue (no votes gained)</button>`;
            }

            eventActions.innerHTML = actionHtml;
        }

        modal.classList.remove("hidden");
    }

    resolveEventWithPolicy() {
        // Use policy card to gain votes from event
        const player = this.getCurrentPlayer();
        const currentEvent = this.currentDisplayedEvent;
        
        const matchingCard = player.policyCards.find(p => p.color === currentEvent.color);
        if (matchingCard) {
            player.votes += currentEvent.voteValue;
            player.policyCards = player.policyCards.filter(p => p !== matchingCard);
        }
        
        this.currentDisplayedEvent = null;
        this.closeEventModal();
        this.updateUI();
    }

    resolveScandalAccept(voteValue) {
        const player = this.getCurrentPlayer();
        player.votes = Math.max(0, player.votes + voteValue);
        this.currentDisplayedEvent = null;
        this.closeEventModal();
        this.updateUI();
    }

    resolveScandalSpend() {
        const player = this.getCurrentPlayer();
        if (player.resources >= 2) {
            player.resources -= 2;
            this.currentDisplayedEvent = null;
            this.closeEventModal();
            this.updateUI();
        } else {
            alert("Not enough resources!");
        }
    }

    closeEventModal() {
        document.getElementById("eventModal").classList.add("hidden");
    }

    drawPolicyCard() {
        const player = this.getCurrentPlayer();
        
        if (this.movesRemaining <= 0) {
            alert("No moves remaining this turn!");
            return;
        }
        
        if (player.policyCards.length >= 5) {
            alert("You can only hold 5 policy cards. Discard one first (click on it in your hand).");
            return;
        }

        if (this.policyDeck.length === 0) {
            alert("No more policy cards!");
            return;
        }

        const card = this.policyDeck.pop();
        player.policyCards.push(card);
        this.movesRemaining--;
        this.updateUI();
    }

    drawResourceCard() {
        const player = this.getCurrentPlayer();
        
        if (this.movesRemaining <= 0) {
            alert("No moves remaining this turn!");
            return;
        }
        
        if (this.resourceDeck.length === 0) {
            alert("No more resource cards!");
            return;
        }

        player.resources += 1;
        this.resourceDeck.pop();
        this.movesRemaining--;
        this.updateUI();
    }

    buyCampaignAction(action) {
        const player = this.getCurrentPlayer();
        let cost = 0;
        let votes = 0;

        switch (action) {
            case "billboard":
                cost = this.getAdjustedCost(3);
                if (player.resources >= cost) {
                    player.resources -= cost;
                    player.billboards += 1;
                    votes = 5 + (player.role.id === "environmental" ? 2 : 0);
                    player.votes += votes;
                }
                break;

            case "event":
                cost = this.getAdjustedCost(5);
                if (player.resources >= cost) {
                    player.resources -= cost;
                    votes = 7 + (player.role.id === "community" ? 2 : 0);
                    player.votes += votes;
                }
                break;

            case "sabotage":
                cost = this.getAdjustedCost(10);
                if (player.resources >= cost) {
                    // Select opponent
                    const opponents = this.players.filter(p => p.id !== player.id);
                    if (opponents.length > 0) {
                        const target = opponents[Math.floor(Math.random() * opponents.length)];
                        target.votes = Math.max(0, target.votes - 3 * target.billboards);
                        player.resources -= cost;
                    }
                }
                break;
        }

        this.updateUI();
    }

    getAdjustedCost(baseCost) {
        if (this.getCurrentPlayer().role.id === "business") {
            return Math.max(1, baseCost - 1);
        }
        return baseCost;
    }

    endTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.movesRemaining = 5;
        this.renderBoard();
        this.updateUI();
    }

    updateUI() {
        const player = this.getCurrentPlayer();

        // Update player info
        document.getElementById("currentPlayerName").textContent = player.name;
        document.getElementById("currentPlayerColor").style.backgroundColor = player.color;
        document.getElementById("movesRemaining").textContent = this.movesRemaining || 5;

        // Update stats
        document.getElementById("playerVotes").textContent = player.votes;
        document.getElementById("playerResources").textContent = player.resources;
        document.getElementById("playerBillboards").textContent = player.billboards;

        // Update standings
        const standings = document.getElementById("standingsList");
        standings.innerHTML = "";
        
        const sorted = [...this.players].sort((a, b) => b.votes - a.votes);
        sorted.forEach((p, i) => {
            const item = document.createElement("div");
            item.className = `standing-item ${p.id === player.id ? "current" : ""}`;
            item.innerHTML = `
                <span class="standing-name">${i + 1}. ${p.name}</span>
                <span class="standing-votes">${p.votes}</span>
            `;
            standings.appendChild(item);
        });

        // Update hand display
        const handDisplay = document.getElementById("policyHand");
        handDisplay.innerHTML = "";
        player.policyCards.forEach((card, i) => {
            const cardEl = document.createElement("div");
            cardEl.className = `card-item color-${card.color}`;
            cardEl.innerHTML = `${card.name} (${card.votes})`;
            cardEl.addEventListener("click", () => {
                this.discardCard(i);
            });
            handDisplay.appendChild(cardEl);
        });

        // Update campaign action buttons
        const resourcesCost = {
            billboard: this.getAdjustedCost(3),
            event: this.getAdjustedCost(5),
            sabotage: this.getAdjustedCost(10)
        };

        document.getElementById("buyBillboardBtn").disabled = player.resources < resourcesCost.billboard;
        document.getElementById("hostEventBtn").disabled = player.resources < resourcesCost.event;
        document.getElementById("sabotageBtn").disabled = player.resources < resourcesCost.sabotage || this.players.length < 2;
    }

    discardCard(cardIndex) {
        const player = this.getCurrentPlayer();
        player.policyCards.splice(cardIndex, 1);
        this.updateUI();
    }

    endGame() {
        this.gameState = "ended";
        clearInterval(this.timerInterval);

        // Sort players by votes
        const sorted = [...this.players].sort((a, b) => b.votes - a.votes);

        // Display results
        const resultsContainer = document.getElementById("finalResults");
        resultsContainer.innerHTML = "";

        sorted.forEach((player, i) => {
            const resultItem = document.createElement("div");
            resultItem.className = `final-results-item ${i === 0 ? "winner-highlight" : ""}`;
            resultItem.innerHTML = `
                <span class="final-results-rank">#${i + 1}</span>
                <span class="final-results-name">${player.name} (${player.role.name})</span>
                <span class="final-results-votes">${player.votes}</span>
            `;
            resultsContainer.appendChild(resultItem);
        });

        this.switchScreen("endGameScreen");
    }

    switchScreen(screenId) {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.add("hidden");
        });
        document.getElementById(screenId).classList.remove("hidden");
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

let game;

document.addEventListener("DOMContentLoaded", () => {
    game = new Game();
});
