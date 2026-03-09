# LA 2076 - Mayoral Campaign Board Game

A web-based, playable version of the LA 2076 board game where you compete to become the Mayor of Los Angeles in 2076.

## How to Play

### Game Overview
- **Objective**: Accumulate the most votes by Election Day (20 minutes)
- **Players**: 2-4 players
- **Game Duration**: 20 minutes

### Starting the Game

1. **Setup**: 
   - Select the number of players (2-4)
   - Enter player names
   - Roles are assigned in reverse turn order (last player picks first, first player picks last)

2. **Select Your Role** - Each role has a unique advantage:
   - **Tech Entrepreneur**: Start with 3 extra Resource Cards
   - **Labor Union Representative**: Drawing Policy Cards costs 0 moves instead of 1
   - **Environmental Activist**: Each Billboard grants 2 extra votes
   - **Business Leader**: Campaign actions cost 1 fewer Resource
   - **Community Organizer**: Campaign events grant 2 extra votes
   - **Veteran Politician**: Start with 3 Policy Cards

### Gameplay

#### Each Turn
You have **5 moves** per turn. You can use moves for:

1. **Movement** (1 move)
   - Move 1 connected space on the board
   - Red circles are Event spots
   - Click on a neighboring spot to move there

2. **Pick Up Cards** (varies)
   - Draw a Policy Card (use 1 move or 0 if Labor Union rep)
   - Draw a Resource Card (use 1 move)
   - Max 5 Policy Cards in hand (must discard to collect more)
   - Unlimited Resource Cards

3. **Campaign Actions** (use Resource Cards, not moves)
   - **Buy a Billboard** (Cost: 3 Resources) → Gain 5 votes + block enemy movement
   - **Host Campaign Event** (Cost: 5 Resources) → Gain 7 votes
   - **Political Sabotage** (Cost: 10 Resources) → Target opponent loses 3 votes per billboard

### Event Spots

When you land on an Event Spot (red):

- **Regular Event**: You gain votes
  - With matching Policy Card of same color: Use policy to gain policy votes instead
  - Without: Take base event votes
  - Can use up to 3 Policy Cards per event

- **Scandal Card**: You lose 20 votes OR spend 2 Resources to cancel
  - You CANNOT have negative votes (minimum 0)

### Board Layout

The board represents LA geography:
- **North**: Burbank area
- **South**: Long Beach area
- **West**: Coast (Malibu, Santa Monica)
- **East**: El Monte, Pasadena
- ~60 interconnected locations with iconic LA roads and neighborhoods

### Voting System

**Vote Sources**:
- Events: 10, 15, or 20 points (depending on event level)
- Scandal: -20 points
- Billboards: 5 points + role bonuses
- Campaign Events: 7 points + role bonuses
- Political Sabotage: 10 points (opponent loses 3 per billboard)

### Ending the Game

When the 20-minute timer reaches zero:
- All players stop playing
- Scores are tallied
- **Highest votes = MAYOR**

## Controls

- **Click on board spots** to move (if neighboring)
- **Click on red event spots** to draw event cards
- **Use sidebar buttons** to draw cards and perform actions
- **Discard cards** by clicking them in your policy hand
- **End Turn** button to pass to next player

## Strategy Tips

1. **Focus on Events**: Event spots give the most votes
2. **Collect Matching Policies**: Match policy color to event color for bonus votes
3. **Resource Management**: Save resources for campaign actions
4. **Sabotage**: Use sabotage on opponents with many billboards
5. **Position Matters**: Control areas with event spots

## Technical Details

- Built with HTML5, CSS3, and JavaScript (no dependencies)
- Fully responsive design
- Real-time 20-minute countdown timer
- SVG-based board rendering
- Dynamic game state management

## Features

✓ Fully playable game
✓ 6 unique candidate roles with balance testing
✓ 60+ interconnected LA locations
✓ Event and Scandal card systems
✓ Campaign action mechanics
✓ Real-time voting and standings
✓ 20-minute game timer
✓ Complete game UI and controls
✓ Responsive design for multiple screen sizes

## Files

- `index.html` - Main game structure
- `styles.css` - Game styling and layout
- `game.js` - Core game logic and mechanics

---

**Enjoy your mayoral campaign!** 🗳️
