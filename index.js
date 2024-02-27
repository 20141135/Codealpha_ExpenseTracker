let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const income = prompt('Enter your income:');
function renderExpenses() {
    // const expenseList = document.getElementById('expenses');
    // expenseList.innerHTML = '';
    // expenses.forEach((expense, index) => {
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //     <span id="content">${expense.name} : $${expense.amount}</span>
    //     <button onclick="editExpense(${index})" id="edit">Edit</button>
    //     <button onclick="deleteExpense(${index})" id="delete">Delete</button>
    //     `;
    //     expenseList.appendChild(li);
    // });
    const expenseList = document.getElementById('expenses');
    const listContainer = document.querySelector('.list');
    
    // Check if expenses array is empty
    if (expenses.length === 0) {
        listContainer.style.display = 'none';  // Hide the list container
    } else {
        listContainer.style.display = 'block';  // Show the list container
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span id="content">${expense.name} : $${expense.amount}</span>
            <button onclick="editExpense(${index})" id="edit">Edit</button>
            <button onclick="deleteExpense(${index})" id="delete">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }
}

function addExpense() {
    const expenseName = document.getElementById("nameExpense").querySelector('input').value;
    const expensePrice = document.getElementById("priceExpense").querySelector('input').value;

    if (expenseName && expensePrice) {
        const newExpense = {
            name: expenseName,
            amount: parseFloat(expensePrice)
        }

        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();

        document.getElementById("nameExpense").querySelector('input').value = '';
        document.getElementById("priceExpense").querySelector('input').value = '';
    }
}

function editExpense(index) {
    const newName = prompt('Enter new expense name:');
    const newAmount = parseFloat(prompt('Enter new expense amount:'));

    if (newName !== null && !isNaN(newAmount)) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;

        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

function deleteExpense(index) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');

    if (confirmDelete) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

}


function totalExpense(){
    const expenseList=document.getElementById('expenses');
    let total=0;
    expenses.forEach((expense,index)=>{
        total+=expense.amount;
    });
        // Corrected line to set the total to the innerHTML of the element with id 'total'
    document.getElementById('total').innerHTML=`$${total.toFixed(2)}`;

const indicatorButton = document.getElementById('indicator');

if (income <total) {
    indicatorButton.innerHTML = "Your expense is high";
    indicatorButton.style.backgroundColor = 'red';
} else {
    indicatorButton.innerHTML = "Your expense is low";
    indicatorButton.style.backgroundColor = 'green';
}


}


// Initial rendering
renderExpenses();
