// p5.js Sketch for Game Board Visualization
let boardSketch;

function createGameBoard(p) {
    let mapWidth = 1000;
    let mapHeight = 800;
    let nodeRadius = 20;
    let nodes = [];

    // Define board nodes with positions and numbers
    function initializeBoard() {
        // Create a grid-based network with only horizontal and vertical connections
        const spacing = 100;
        const nodePositions = [
            // Row 0
            {x: 80, y: 50, num: 1},
            {x: 180, y: 50, num: 2},
            {x: 280, y: 50, num: 10},
            {x: 380, y: 50, num: 57},
            {x: 480, y: 50, num: 35},
            {x: 580, y: 50, num: 31},
            {x: 680, y: 50, num: 22},
            
            // Row 1
            {x: 80, y: 150, num: 3},
            {x: 180, y: 150, num: 4},
            {x: 280, y: 150, num: 11},
            {x: 380, y: 150, num: 12},
            {x: 480, y: 150, num: 56},
            {x: 580, y: 150, num: 58},
            {x: 680, y: 150, num: 60},
            
            // Row 2
            {x: 80, y: 250, num: 8},
            {x: 180, y: 250, num: 9},
            {x: 280, y: 250, num: 13},
            {x: 380, y: 250, num: 19},
            {x: 480, y: 250, num: 20},
            {x: 580, y: 250, num: 59},
            {x: 680, y: 250, num: 61},
            
            // Row 3
            {x: 80, y: 350, num: 5},
            {x: 180, y: 350, num: 14},
            {x: 280, y: 350, num: 15},
            {x: 380, y: 350, num: 21},
            {x: 480, y: 350, num: 30},
            {x: 580, y: 350, num: 39},
            {x: 680, y: 350, num: 40},
            
            // Row 4
            {x: 80, y: 450, num: 32},
            {x: 180, y: 450, num: 16},
            {x: 280, y: 450, num: 17},
            {x: 380, y: 450, num: 18},
            {x: 480, y: 450, num: 29},
            {x: 580, y: 450, num: 38},
            {x: 680, y: 450, num: 41},
            
            // Row 5
            {x: 80, y: 550, num: 33},
            {x: 180, y: 550, num: 6},
            {x: 280, y: 550, num: 7},
            {x: 380, y: 550, num: 27},
            {x: 480, y: 550, num: 28},
            {x: 580, y: 550, num: 37},
            {x: 680, y: 550, num: 42},
            
            // Row 6
            {x: 80, y: 650, num: 34},
            {x: 180, y: 650, num: 45},
            {x: 280, y: 650, num: 46},
            {x: 380, y: 650, num: 44},
            {x: 480, y: 650, num: 25},
            {x: 580, y: 650, num: 36},
            {x: 680, y: 650, num: 43},
            
            // Row 7
            {x: 180, y: 750, num: 49},
            {x: 280, y: 750, num: 50},
            {x: 380, y: 750, num: 23},
            {x: 480, y: 750, num: 52},
            {x: 580, y: 750, num: 51},
            {x: 680, y: 750, num: 47},
        ];

        // Event spots (red circles)
        const eventSpots = [10, 3, 61, 47, 48, 24];
        
        nodes = nodePositions.map(pos => ({
            ...pos,
            isEvent: eventSpots.includes(pos.num)
        }));
    }

    // Define connections between nearby nodes
    function getConnections() {
        const connections = [];
        
        // Connect nodes that are horizontally or vertically adjacent
        const nodeMap = {};
        nodes.forEach(node => {
            nodeMap[node.num] = node;
        });
        
        nodes.forEach((node, idx) => {
            // Find nodes at the same y-position (horizontal neighbors)
            const horizontalNeighbors = nodes.filter(n => 
                n.y === node.y && 
                Math.abs(n.x - node.x) === 100
            );
            
            // Find nodes at the same x-position (vertical neighbors)
            const verticalNeighbors = nodes.filter(n => 
                n.x === node.x && 
                Math.abs(n.y - node.y) === 100
            );
            
            // Add connections to the right and below to avoid duplicates
            horizontalNeighbors.forEach(neighbor => {
                if (neighbor.x > node.x) {
                    const edge = [node.num, neighbor.num].sort();
                    if (!connections.some(c => c[0] === edge[0] && c[1] === edge[1])) {
                        connections.push(edge);
                    }
                }
            });
            
            verticalNeighbors.forEach(neighbor => {
                if (neighbor.y > node.y) {
                    const edge = [node.num, neighbor.num].sort();
                    if (!connections.some(c => c[0] === edge[0] && c[1] === edge[1])) {
                        connections.push(edge);
                    }
                }
            });
        });
        
        return connections;
    }

    p.setup = function() {
        let container = document.getElementById('p5_container');
        let canvas = p.createCanvas(mapWidth, mapHeight);
        canvas.parent('p5_container');
        canvas.style('display', 'block');
        
        initializeBoard();
    };

    p.draw = function() {
        drawBoard();
    };

    function drawBoard() {
        // Light background
        p.background(240, 240, 235);
        
        // Draw connections first (so they appear behind nodes)
        drawConnections();
        
        // Draw nodes
        drawNodes();
    }

    function drawConnections() {
        const connections = getConnections();
        
        p.stroke(100, 100, 100);
        p.strokeWeight(2);
        p.noFill();
        
        connections.forEach(([num1, num2]) => {
            const node1 = nodes.find(n => n.num === num1);
            const node2 = nodes.find(n => n.num === num2);
            
            if (node1 && node2) {
                p.line(node1.x, node1.y, node2.x, node2.y);
            }
        });
    }

    function drawNodes() {
        nodes.forEach(node => {
            // Draw circle
            if (node.isEvent) {
                p.fill(180, 50, 50);  // Red for event spots
            } else {
                p.fill(230, 230, 230);  // Light gray for regular nodes
            }
            
            p.stroke(80, 80, 80);
            p.strokeWeight(1.5);
            p.circle(node.x, node.y, nodeRadius * 2);
            
            // Draw number
            p.fill(0, 0, 0);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(11);
            p.textStyle(p.NORMAL);
            p.noStroke();
            p.text(node.num, node.x, node.y);
        });
    }

    p.windowResized = function() {
        // Optional: handle window resize
    };
}

// Initialize p5.js when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        boardSketch = new p5(function(p) {
            createGameBoard(p);
        });
    });
} else {
    boardSketch = new p5(function(p) {
        createGameBoard(p);
    });
}
