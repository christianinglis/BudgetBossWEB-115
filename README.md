# Budget Boss
# WEB-115 Final Project proposal


# Summary 
Budget Boss is a personal finance tracker that gamifies financial responsibility. Unlike a standard spreadsheet, your financial health is represented by a "Base" or "Character". Consistent saving strengthens your defenses, while overspending triggers alerts and visual "damage" to your financial status. The goal is to provide a clear, engaging dashboard for managing income and expenses within a tight time frame.

# Core Features
The application will feature a single-page interface consisting of:

- The Command Center (Dashboard): A visual display of the user's current total balance and the "Health" of their financial base.

- Transaction Log: A scrollable list displaying recent income and expenses with timestamps and categories.

- Action Panel: A simple form to input the transaction name, amount, and type (Income/Expense).

- Status Indicators: Visual warnings (color changes/icons) that trigger when specific budget thresholds are crossed.

# Technical Implementation
Classes & Inheritance

The lofic will be driven by an Object-Oriented approach:
- Transaction (Base Class): Contains properties like id, name, amount, and date.

- Income/ Expense(Subclasses): Inherit from Transaction. Expense will include a category property (ex: Food, Rent, Hobbies).

- User (Manager Class): Responsible for maintaining the state of the budget, an array of all transactions, and calculating the final balance.

# Logic & Algorithms
- Total Calculation: Uses a loop (or .reduce()) to iterate through the transaction array and determine the current standing.

- Budget Guard: if/else statements will moniot spending.
    For example:
    - If totalExpenses > 80% of totalIncome, trigger a "Shields low" warning.
    - If balance < 0, the "Base" enters a "Critical Failure" state.

# Planned Extentions (DLC)
- Local Storage: Implement localStorage to ensure that data persists. When the user returns to the app, the User class will hydrate its state from the saved JSON.

- Fetch API (Currency Conversation): Integrater a third-party API (ex: ExchangeRate-API) to allow users to toggle their budget view between USD, EUR, and JPY.

# Timeline
Phase 1:
    - Logic Layer (Classes, Math, Console Testing)
Phase 2:
    - UI/DOM Implementation & Event Listeners
Phase 3:
    - Local Storage & API Integration
Phase 4:
    - Final Bug Squashing & CSS Polish