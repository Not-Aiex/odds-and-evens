let numBank = [];
let numBankEvens = [];
let numBankOdds = [];

function addNumber(n) {
  numBank.push(n);
  render();
}

function BankForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
        Add value to the number bank
        <input name="new" type="number" min="1" />
    </label>
    <button>Add Number</button>
    `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const num = data.get("new");
    const number = Number(num);
    addNumber(number);
  });
  return $form;
}

function AddNumber() {
  const $button = document.createElement("div");
  $button.innerHTML = `
    <button>Add random number between 1 and 1000</button
    `;
  $button.addEventListener("click", function () {
    numBank.push(Math.round(Math.random() * 999) + 1);
    render();
  });
  return $button;
}

function Sort() {
  const $button = document.createElement("div");
  $button.innerHTML = `
    <button>Sort</button>
    `;
  $button.addEventListener("click", function () {
    if (numBank.length <= 0) {
      render();
      return $button;
    }
    let tempNum = numBank.shift();
    if (tempNum % 2 === 1) {
      numBankOdds.push(tempNum);
    } else {
      numBankEvens.push(tempNum);
    }
    render();
  });
  return $button;
}

function SortAll() {
  const $button = document.createElement("div");
  $button.innerHTML = `
    <button>Sort All</button
    `;
  $button.addEventListener("click", function () {
    while (numBank.length > 0) {
      let tempNum = numBank.pop();
      if (tempNum % 2 === 1) {
        numBankOdds.push(tempNum);
      } else {
        numBankEvens.push(tempNum);
      }
    }
    render();
  });
  return $button;
}

function Bank(displayArray) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  const display = displayArray.map((a) => a + "        ");
  $bank.replaceChildren(...display);
  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <div class="container">
        <BankForm></BankForm>
        <Sort></Sort>
        <SortAll></SortAll>
    </div>
    <RandomNumber></RandomNumber>
    <main>
        <h2>Bank</h2>
        <Bank id="all"></Bank>
        <h2>Odds</h2>
        <Bank id="odds"></Bank>
        <h2>Evens</h2>
        <Bank id="evens"></Bank>
    </main>
`;
  $app.querySelector("BankForm").replaceWith(BankForm());
  $app.querySelector("RandomNumber").replaceWith(AddNumber());
  $app.querySelector("Sort").replaceWith(Sort());
  $app.querySelector("SortAll").replaceWith(SortAll());
  $app.querySelector("Bank#all").replaceWith(Bank(numBank));
  $app.querySelector("Bank#odds").replaceWith(Bank(numBankOdds));
  $app.querySelector("Bank#evens").replaceWith(Bank(numBankEvens));
}
render();
