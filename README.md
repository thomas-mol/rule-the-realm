# Rule the Realm

Rule the Realm is a web application designed to track the performance of different villains in the board game **Villainous**. Players can log their game results, analyze win rates, and see which villains dominate the realm.

## Features

- 🏆 **Game Tracking**: Log game sessions with selected villains, winner, date, and number of players.
- 📊 **Villain Statistics**: Track wins, losses, and overall performance of each villain.
- 🔍 **Filtering & Sorting**: Find villains based on their performance and popularity.
- ☁️ **Firebase Integration**: Real-time data storage and retrieval using Firestore.
- 🎯 **Form Validation**: Secure and structured data input with React Hook Form and Zod.

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: React Hook Form
- **Backend**: Firestore (Firebase)
- **Validation**: Zod
- **UI Components**: Bootstrap, react-select

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/rule-the-realm.git
   cd rule-the-realm
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project.
   - Enable Firestore.
   - Add your Firebase config to `src/config/firebase.ts`.

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

1. Add a new game session by selecting villains, setting the player count, and choosing the winner.
2. View villain statistics to see win/loss ratios.
3. Analyze trends and determine the strongest villain!

## Contributing

Contributions are welcome! Feel free to fork the repository, open an issue, or submit a pull request.

## License

MIT License © 2025 Thomas Mol

