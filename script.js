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
    constructor(name, amount, category) {
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
        this.balance = this.transactions.reduce((acc, curr) => {
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

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const type = typeSelect.value;

    let entry;
    if (type === 'income') {
        entry = new Income(name, amount);
    } else {
        entry = new Expense(name, amount, catSelect.value);
    }

    boss.addTransaction(entry);
    renderUI();
    form.reset();
    catSelect.classList.add('hidden');
});

// Render UI
function renderUI() {
    const balanceEl = document.getElementById('total-balance');
    const visualEl = document.getElementById('base-visual');
    const statusText = visualEl.querySelector('.glitch-text');

    balanceEl.innerText = `$${boss.balance.toFixed(2)}`;

    //Logic for gamified status
    if (boss.balance < 0) {
        visualEl.className = 'status-critical';
        statusText.innerText = "CRITICAL FAILURE";
    } else if (boss.balance < 200) {
        visualEl.className = 'status-warning';
        statusText.innerText = "SHIELDS LOW";
    } else {
        visualEl.className = 'status-nominal';
        statusText.innerText = "SYSTEMS NOMINAL";
    }

    // Loop through the transactions to build the log
    logContainer.innerHTML = '';
    boss.transactions.forEach(t => {
        const div = document.createElement('div');
        div.className = `transaction-card ${t.type}`;
        div.innerHTML = `
            <div>
                <strong>${t.name}</strong> <br>
                <small>${t.category || 'Revenue'}</small>
            </div>
            <div>
                <span>${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</span>
                <button onclick="deleteEntry(${t.id})" style="width: auto; margin-left: 10px; display: inline;">X</button>
            </div>
        `;
        logContainer.appendChild(div);
    });
}

// Global Delete Function
window.deleteEntry = (id) => {
    boss.deleteTransaction(id);
    renderUI();
};

// Initial load
renderUI();