let transactions = [];

const generateId = () => +new Date();


const transactionForm = document.getElementById('transactionForm');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('transactionFormTitleInput').value.trim();
  const amount = Number(document.getElementById('transactionFormAmountInput').value);
  const date = document.getElementById('transactionFormDateInput').value;
  const type = document.getElementById('transactionFormTypeSelect').value;

  if (title === '') {
    alert ('keterangan transaksi tidak boleh kosong!');
    return;
  }

  if (amount < 1) {
    alert('Nominal uang harus minimal Rp.1!');
    return;
  }

  const newTransaction = {
    id: generateId(),
    title: title,
    amount: amount,
    date: date,
    type: type,
  };

  transactions.push(newTransaction);
  
  transactionForm.reset();

  saveData();
})

function renderTransactions(dataToRender = transactions) {
  
  incomeList.innerHTML = '';
  expenseList.innerHTML = '';

  let totalIncome = 0;
  let totalExpense = 0;
  for (const t of transactions) {
    if (t.type === 'income') totalIncome += t.amount;
    else totalExpense += t.amount;
  }
  const balance = totalIncome - totalExpense;
  document.querySelector('.tracker-summary__balance-amount').innerText = `Rp ${balance}`;
  document.querySelector('.tracker-summary__stat-amount--income').innerText = `Rp ${totalIncome}`;
  document.querySelector('.tracker-summary__stat-amount--expense').innerText = `Rp ${totalExpense}`;

  for (const transaction of dataToRender) {
    const card = document.createElement('div');
    // Penyesuaian testid sesuai kriteria reviewer:
    card.setAttribute('data-testid', 'transactionItem');
    
    // Menambahkan class agar tampilannya lebih rapi sesuai desain
    card.classList.add('tracker-transaction-item');

    const typeText = transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran';

    card.innerHTML = `
      <div class="tracker-transaction-item__detail">
        <h4 data-testid="transactionItemTitle" class="tracker-transaction-item__title">${transaction.title}</h4>
        <p data-testid="transactionItemDate" class="tracker-transaction-item__date">${transaction.date}</p>
        <p data-testid="transactionItemType" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; text-transform: capitalize;">${transaction.type}</p>
      </div>
      <div class="tracker-transaction-item__right">
        <p data-testid="transactionItemAmount" class="tracker-transaction-item__amount tracker-transaction-item__amount--${transaction.type}">
          Rp ${transaction.amount}
        </p>
        <div class="tracker-transaction-item__actions">
          <button class="tracker-transaction-item__btn" onclick="editTransaction(${transaction.id})">Edit</button>
          <button data-testid="transactionItemDeleteButton" class="tracker-transaction-item__btn" onclick="deleteTransaction(${transaction.id})">Hapus</button>
          <button data-testid="transactionItemEditTypeButton" class="tracker-transaction-item__btn" onclick="changeTransactionType(${transaction.id})">Ubah Tipe</button>
        </div>
      </div>
    `;

    if (transaction.type === 'income') {
      incomeList.appendChild(card);
    } else {
      expenseList.appendChild(card);
    }
  }
}

const STORAGE_KEY = 'tracker-app-data';
const EVENT_UPDATE = 'transaction:updated';

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser tidak mendukung local storage');
    return false;
  }
  return true;
}

const saveData = () => {
  if (isStorageExist()) {
    const parsed = JSON.stringify(transactions);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(EVENT_UPDATE));
  }
}

const loadDataFromStorage = () => {
  if (isStorageExist()) {
    const serialData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serialData);

    if (data !== null) {
      transactions = data;
    }

    document.dispatchEvent(new Event(EVENT_UPDATE));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDataFromStorage();
})

document.addEventListener(EVENT_UPDATE, () => {
  renderTransactions();
});

const deleteTransaction = (id) => {
  transactions = transactions.filter(t => t.id !== id);
  saveData();
}

const editTransaction = (id) => {
  const transactionToEdit = transactions.find(t => t.id === id);
  if (transactionToEdit) {

    document.getElementById('transactionFormTitleInput').value = transactionToEdit.title;
    document.getElementById('transactionFormAmountInput').value = transactionToEdit.amount;
    document.getElementById('transactionFormDateInput').value = transactionToEdit.date;
    document.getElementById('transactionFormTypeSelect').value = transactionToEdit.type;

    deleteTransaction(id);
  }
}

const changeTransactionType = (id) => {
  const index = transactions.findIndex(t => t.id === id);
  
  if (index !== -1) {
    if (transactions[index].type === 'income') {
      transactions[index].type = 'expense';
    } else {
      transactions[index].type = 'income';
    }

    saveData();
  }
}

const searchInput = document.getElementById('searchTransactionFormTitleInput');
const searchForm = document.getElementById('searchTransactionForm');

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const keyword = searchInput.value.toLowerCase().trim();
  
  const filteredData = transactions.filter(t => 
    t.title.toLowerCase().includes(keyword)
  );
  
  renderTransactions(filteredData);
});

searchInput.addEventListener('input', function (e) {
  const keyword = e.target.value.toLowerCase().trim();
  
  const filteredData = transactions.filter(t => 
    t.title.toLowerCase().includes(keyword)
  );
  
  renderTransactions(filteredData);
});

const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
      themeToggleBtn.innerText = '☀️';
    } else {
      themeToggleBtn.innerText = '🌙';
    }
    
    localStorage.setItem('theme', theme);
  });
}

