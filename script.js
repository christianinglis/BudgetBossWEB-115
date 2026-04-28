// Classes
class Transaction {
    constructor(name, amount) {
        this.id = Date.now();
        this.name = name;
        this.amount = parseFloat(amount);
        this.date = new Date().toLocaleDateString();
    }
}

class Income extends Transaction {
    constructor(name, amount) {
        super(name, amount);
        this.type = 'income';
    }
}

class Expense extends Transaction {
    constructor(name, amount) {
        super(name, amount);
        this.type = 'expense';
        this.category = category;
    }
}

class BudgetBoss {
    constructor() {

        const savedData = JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactions = savedData;
        this.balance = 0;
        this.updateBalance();
    }

    addTransaction(item) {
        this.transactions.push(item);
        this.saveData();
        this.updateBalance();
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
        this.updateBalance();
    }

    updateBalance() {
        this.balance = this.transactions.reduce((acc, t) => {
            return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
        }, 0);
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
}

// App Initialization
const boss =  new BudgetBoss();
const form = document.getElementById('transaction-form');
const typeSelect = document.getElementById('type');
const catSelect = document.getElementById('category');
const logContainer = document.getElementById('transaction-log');

// Category visibility
typeSelect.addEventListener('change', () => {
    catSelect.classList.toggle('hidden', typeSelect.value === 'income');
});

