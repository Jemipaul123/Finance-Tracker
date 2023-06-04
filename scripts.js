const transactionDD = document.getElementById("transaction");
const modifyDDIncome = document.getElementById("modifyIncome");
const modifyDDExpense = document.getElementById("modifyExpense");
const table = document.getElementById("table");

const formIncome = document.getElementById("formIncome");
const formExpense = document.getElementById("formExpense");

const inputField = document.getElementById("inputfield");

const itemInput = document.getElementById("itemInput");
const amtInput = document.getElementById("amtInput");
const editInput = document.getElementById("editInput");

let currentbalance = 0;
let balance = document.getElementById("balance");
let items = [];

addBalance(currentbalance);

function handleclearAll() {


  modifyDDIncome.style.display = "none";
  modifyDDExpense.style.display = "none";
  formIncome.style.display = "none";
  formExpense.style.display = "none";
 

}

function addBalance(newValue) {
  currentbalance += newValue;
  balance.innerHTML = `<div>Your current balance is ${currentbalance}</div>`;
}

function subtractBalance(value) {
  currentbalance -= value;
  balance.innerHTML = `<div>Your current balance is ${currentbalance}</div>`;
}

function addItem(item, amount)
 {
  items.push({ item, amount });
  console.log(items);
}

function displayItems() {


        table.innerHTML = "";

        const headerRow = document.createElement("tr");
        const itemHeader = document.createElement("th");
        itemHeader.textContent = "Item";

        const amountHeader = document.createElement("th");
        amountHeader.textContent = "Amount";


        headerRow.appendChild(itemHeader);
        headerRow.appendChild(amountHeader);
        table.appendChild(headerRow);

  items.forEach((item) => {

    const row = document.createElement("tr");
    const itemCell = document.createElement("td");
    itemCell.textContent = item.item;


    const amountCell = document.createElement("td");
    amountCell.textContent = item.amount;


    row.appendChild(itemCell);
    row.appendChild(amountCell);
    table.appendChild(row);

  });
}

function editItem() {
  displayItems();

  editInput.style.display = "block";

  editInput.addEventListener("submit", (event) => {
    event.preventDefault();
     editChanges.style.display="block"

     editChanges.addEventListener("submit",(event)=>{
             event.preventDefault();

               const itemName = document.getElementById("editItem").value;
                console.log(itemName);
                const editName = document.getElementById("edit--1").value;
                const editAmt = document.getElementById("edit--2").value;
              

                console.log(editName);
                console.log(editAmt);
                items.forEach((data) => {
                  if (data.item === itemName) {
                    data.item = editName;
                    data.amount = editAmt;
                  }
                });

                displayItems();

     })
    
  });
   editChanges.reset();
     editInput.reset();
     handleclearAll();
     
     transactionDD.selectedIndex = 0;
     modifyDDIncome.selectedIndex = 0;
}

function removeItem() {
     
  
 
  editInput.style.display = "block";
  const editItem=document.getElementById("editItem")
  editItem.setAttribute("placeholder","Enter the item you want to delete")
  
  editInput.addEventListener("submit", (event) => {
   event.preventDefault();
   const val=editItem.value;
   items = items.filter((data) => data.item !== val);




  
})
}
formExpense.addEventListener("submit", (event) => {
        event.preventDefault();
        const option2 = modifyDDExpense.value;
        const item = itemInput.value;
        const amt = parseFloat(amtInput.value);
        option2 === "add" ? addItem(item, amt) : null;

  formExpense.reset();
  handleclearAll();
  transactionDD.selectedIndex = 0;
  modifyDDExpense.selectedIndex = 0;
});

formIncome.addEventListener("submit", (event) => {


      event.preventDefault();

      const option2 = modifyDDIncome.value;
      const val = parseFloat(inputField.value);
      option2 === "add" ? addBalance(val) : subtractBalance(val);

  formIncome.reset();
  handleclearAll();
  transactionDD.selectedIndex = 0;
  modifyDDIncome.selectedIndex = 0;
});

transactionDD.addEventListener("change", () => {
  const selectedOption = transactionDD.value;
  console.log("Selected option: " + selectedOption);

  if (selectedOption === "income") 
  {
    modifyDDIncome.style.display = "block";
    modifyDDExpense.style.display = "none";
    formExpense.style.display = "none";
    formIncome.style.display = "none";
  } 
  
  
  
  else if (
    
    
    selectedOption === "expense") {
    modifyDDExpense.style.display = "block";
    modifyDDIncome.style.display = "none";
    formExpense.style.display = "none";
    formIncome.style.display = "none";
  }
   else 
  {
    modifyDDIncome.style.display = "none";
    modifyDDExpense.style.display = "none";
    formIncome.style.display = "none";
    formExpense.style.display = "none";
  }
});

modifyDDIncome.addEventListener("change", () => {

      const selectedOption2 = modifyDDIncome.value;
      console.log("Selected option " + selectedOption2);
      formIncome.style.display = "block";
    });

modifyDDExpense.addEventListener("change", () => {


        const selectedOption2 = modifyDDExpense.value;
        console.log("Selected option " + selectedOption2);
        selectedOption2 == "add" ? (formExpense.style.display = "block") : (formExpense.style.display = "none");
        if (selectedOption2 == "edit") editItem();
        else if (selectedOption2 == "remove") removeItem();
});
