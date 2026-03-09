// p5.js Sketch for LA 2076 Satellite Map Visualization
let satelliteSketch;

function createSatelliteMap(p) {
    let mapWidth = 1000;
    let mapHeight = 800;
    let scale = 1;

    p.setup = function() {
        let container = document.getElementById('p5_container');
        let canvas = p.createCanvas(mapWidth, mapHeight);
        canvas.parent('p5_container');
        canvas.style('display', 'block');
        
        // Draw the initial satellite map
        drawSatelliteMap();
    };

    p.draw = function() {
        // The sketch is primarily static, but can be extended for animations
    };

    function drawSatelliteMap() {
        // Background: Satellite-style light blue/gray
        p.background(200, 210, 220);

        // Draw water/ocean (dark blue)
        p.fill(45, 85, 130);
        p.stroke(35, 70, 110);
        p.strokeWeight(2);
        
        // Ocean fill on left side (Pacific)
        p.rect(0, 0, 80, mapHeight);
        
        // Ocean curves
        p.beginShape();
        p.curveVertex(80, 0);
        p.curveVertex(85, 50);
        p.curveVertex(78, 150);
        p.curveVertex(82, 250);
        p.curveVertex(75, 350);
        p.curveVertex(80, 450);
        p.curveVertex(70, 550);
        p.curveVertex(85, 650);
        p.curveVertex(80, 750);
        p.curveVertex(80, 800);
        p.vertex(0, 800);
        p.vertex(0, 0);
        p.endShape(p.CLOSE);

        // Draw terrain - varied greenish/tan colors for LA areas
        drawTerrainZones();

        // Draw major freeways and roads
        drawFreeways();

        // Draw urban areas with building-like patterns
        drawUrbanCenters();

        // Draw mountains/hills
        drawTopography();

        // Draw water features (LA River, reservoirs)
        drawWaterFeatures();

        // Add some atmospheric haze effect
        p.fill(255, 255, 255, 15);
        p.rect(0, 0, mapWidth, mapHeight);
    }

    function drawTerrainZones() {
        // Base terrain colors (satellite view style)
        // Different zones get different greenish/tan satellite colors

        // Downtown LA / Central area (gray-ish, urban)
        p.fill(160, 160, 160);
        p.rect(350, 350, 150, 100);

        // Valley area - lighter tan
        p.fill(200, 190, 150);
        p.rect(400, 150, 250, 150);

        // Beach areas - sandy tan
        p.fill(210, 200, 170);
        p.rect(320, 500, 80, 150);

        // South LA - mixed green/tan
        p.fill(170, 175, 140);
        p.rect(250, 450, 200, 200);

        // East LA / Pasadena area - green hills
        p.fill(140, 165, 100);
        p.rect(600, 250, 200, 150);

        // San Gabriel Valley - agricultural/green
        p.fill(155, 180, 110);
        p.rect(650, 400, 180, 150);

        // West LA - mixed urban/green
        p.fill(175, 170, 150);
        p.rect(200, 300, 150, 150);

        // Long Beach area - urban mixed
        p.fill(165, 165, 165);
        p.rect(300, 600, 120, 100);

        // Santa Monica area - lighter
        p.fill(195, 190, 180);
        p.rect(200, 250, 100, 100);
    }

    function drawFreeways() {
        // I-405 (vertical, western freeway)
        p.stroke(100, 100, 100);
        p.strokeWeight(6);
        drawWavyLine(220, 100, 220, 750, 15);

        // I-101 (diagonal through valley and downtown)
        drawWavyLine(350, 150, 520, 500, 15);

        // I-10 (horizontal, major east-west)
        drawWavyLine(150, 380, 700, 380, 15);

        // I-110 (south, vertical to Long Beach)
        p.stroke(100, 100, 100);
        p.strokeWeight(6);
        drawWavyLine(380, 350, 380, 650, 15);

        // 605 Freeway
        drawWavyLine(320, 500, 320, 650, 12);

        // Major secondary roads (thinner)
        p.strokeWeight(3);
        p.stroke(130, 130, 130);
        
        // Sunset Boulevard / major surface streets
        drawWavyLine(250, 200, 600, 350, 15);
        
        // Hollywood area roads
        drawWavyLine(420, 250, 480, 280, 10);
        
        // Beach access roads
        drawWavyLine(200, 400, 200, 550, 10);
    }

    function drawWavyLine(x1, y1, x2, y2, amplitude) {
        let segments = 30;
        p.beginShape();
        for (let i = 0; i <= segments; i++) {
            let t = i / segments;
            let x = p.lerp(x1, x2, t);
            let y = p.lerp(y1, y2, t);
            
            // Add slight wave variation
            let perpX = -(y2 - y1) / p.dist(x1, y1, x2, y2);
            let perpY = (x2 - x1) / p.dist(x1, y1, x2, y2);
            
            let wave = p.sin(t * p.PI) * amplitude * 0.3;
            x += perpX * wave;
            y += perpY * wave;
            
            p.vertex(x, y);
        }
        p.endShape();
    }

    function drawUrbanCenters() {
        // Downtown LA - dense grid pattern
        drawBlockPattern(380, 380, 80, 70, 8, 8, 130, 130, 130);
        
        // Hollywood area
        drawBlockPattern(430, 260, 60, 50, 6, 5, 140, 140, 140);
        
        // Pasadena
        drawBlockPattern(630, 290, 50, 40, 5, 4, 135, 135, 135);
        
        // Long Beach downtown
        drawBlockPattern(330, 630, 60, 50, 6, 5, 140, 140, 140);
        
        // Santa Monica / Westwood area
        drawBlockPattern(230, 290, 50, 50, 5, 5, 145, 145, 145);
    }

    function drawBlockPattern(x, y, width, height, cols, rows, r, g, b) {
        let blockW = width / cols;
        let blockH = height / rows;
        
        p.fill(r, g, b);
        p.stroke(r - 20, g - 20, b - 20);
        p.strokeWeight(1);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // Slight variation in color for realistic appearance
                let variation = p.random(-15, 15);
                p.fill(r + variation, g + variation, b + variation);
                p.rect(x + i * blockW, y + j * blockH, blockW - 1, blockH - 1);
            }
        }
    }

    function drawTopography() {
        // Santa Monica Mountains - northern hills
        p.fill(100, 140, 80);
        p.noStroke();
        drawMountainShape(420, 180, 150, 70);

        // San Gabriel Mountains - northeastern
        p.fill(110, 150, 85);
        drawMountainShape(700, 150, 120, 60);

        // Griffith Observatory area hill
        p.fill(115, 145, 90);
        drawMountainShape(500, 280, 80, 40);
    }

    function drawMountainShape(cx, cy, w, h) {
        p.beginShape();
        p.curveVertex(cx - w / 2, cy + h);
        p.curveVertex(cx - w / 2 + 20, cy + h - 30);
        p.curveVertex(cx - w / 4, cy - h / 2);
        p.curveVertex(cx, cy - h);
        p.curveVertex(cx + w / 4, cy - h / 2);
        p.curveVertex(cx + w / 2 - 20, cy + h - 30);
        p.curveVertex(cx + w / 2, cy + h);
        p.endShape();

        // Summit peak
        p.fill(140, 160, 110);
        p.ellipse(cx, cy - h + 15, 20, 20);
    }

    function drawWaterFeatures() {
        // LA River (winding through downtown and south)
        p.stroke(60, 100, 150);
        p.strokeWeight(4);
        p.noFill();

        p.beginShape();
        p.curveVertex(580, 250);
        p.curveVertex(560, 300);
        p.curveVertex(540, 350);
        p.curveVertex(520, 400);
        p.curveVertex(500, 450);
        p.curveVertex(480, 500);
        p.curveVertex(460, 550);
        p.curveVertex(440, 600);
        p.curveVertex(420, 650);
        p.endShape();

        // Reservoirs (darker blue circles)
        p.fill(50, 90, 140);
        p.circle(700, 280, 40);
        p.circle(140, 300, 35);
        p.circle(750, 120, 30);
    }

    p.windowResized = function() {
        // Optional: handle window resize
    };
}

// Initialize p5.js when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        satelliteSketch = new p5(function(p) {
            createSatelliteMap(p);
        });
    });
} else {
    satelliteSketch = new p5(function(p) {
        createSatelliteMap(p);
    });
}
