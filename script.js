// Classes
class Transaction {
    constructor(name, amount) {
        this.id = Date.now();
        this.name = name;
        this.amount = parseFloat(amount);
        this.date = new Date().toLocaleDateString();
    }
}