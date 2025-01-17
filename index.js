const DOMAIN = 'http://localhost:';
//helllo
const PORT = 5001;
// Resources
const RESOURCE = 'names';
const POST_ROUTE = 'post_endpoint';


// Elements
const listContainer = document.querySelector('.names-list');
console.log(listContainer);

const populateNamesList = (namesList) => {
  namesList.forEach(le => {
    //Create the HTML element
    const listItem = document.createElement('li');
    listItem.innerText = le;
    // Add to the container
    listContainer.appendChild(listItem);
  });
}

const dropName = document.getElementById('inputGroupSelect01')
const dropQuantity = document.getElementById('inputGroupSelect02')
const newDropdownName = document.getElementById('newDropdownId');
const submitbtn = document.getElementById('submit-btn')
const newSuggestionId = document.getElementById('container-suggestions');
let maxCostumer;
let suggestions;
let selectedFriends = [];

submitbtn.addEventListener('click', () => setTastes())
// fetch(`${DOMAIN}${PORT}/${RESOURCE}`)
//   .then(raw => raw.json())
//   .then(response => {
//     //logic
//     populateNamesList(response.names);
//   })
//   .catch(e => console.log(e));
// Add a click event listener to the button

const getMain = async () => {
  try {
    const raw = await fetch(`${DOMAIN}${PORT}/${RESOURCE}`);
    const response = await raw.json();
    const usernames = response.rows
    const friends = response.rows
    maxCostumer = usernames.length

    // //console.log(response.rows)
    // usernames.forEach((row)=>{
    //   //<option value="btc">BTC</option>
    //   const nameOption = document.createElement('option')
    //   nameOption.classList.add("form-select")
    //   nameOption.id = "inputGroupSelect01"
    //   nameOption.innerText = row[0]
    //   nameOption.setAttribute('value', row)
    //   dropName.appendChild(nameOption)
    // })

    let quantityArray = Array.from({length: maxCostumer})
    quantityArray = quantityArray.map((x,i) => i)

    quantityArray.splice(0,2)
    quantityArray.forEach(( value)=>{
      const numberOption = document.createElement('option')
      numberOption.classList.add("form-select")
      numberOption.id = "inputGroupSelect02"
      numberOption.innerText = value
      numberOption.setAttribute('value', value)
      dropQuantity.appendChild(numberOption)
         //console.log(dropQuantity)
    })

    dropQuantity.addEventListener('change', (e) => {
      const selectedQuantity = parseInt(e.target.value);

      let dropdownsContainer = document.getElementById("dropdowns-container");
      dropdownsContainer.innerHTML = "";

console.log(selectedQuantity)
      for (let i = 0; i < selectedQuantity; i++) {
        const newDropdown = document.createElement("select");
        newDropdown.classList.add("form-select")
        newDropdown.id = "newDropdownId"
        
        friends.forEach((row) => {
          const nameOption = document.createElement('option');
          nameOption.innerText = row[0];
          nameOption.setAttribute('value', row)
          newDropdown.appendChild(nameOption);
        });

        newDropdown.addEventListener('change', (e) => {
        selectedFriends[i] = e.target.value;
        console.log(selectedFriends);
      });
        dropdownsContainer.appendChild(newDropdown);

        console.log(newDropdown)

      }
    });

//console.log(usernames)
  } catch (error) {
    console.log(error);
  }
}

const postEndpoint = async (selectedCostumers) => {
  try {
    const raw = await fetch(
      `${DOMAIN}${PORT}/${POST_ROUTE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "data" : selectedCostumers
        })
      }
    );
    const response = await raw.json();
    console.log(response.data);
    suggestions = response.data

      // Clear the existing suggestions
      newSuggestionId.innerHTML = "";

      Object.values(suggestions).forEach((suggestion) => {
        const suggestionElement = document.createElement('p');
        suggestionElement.classList.add("recommendationClass");
        suggestionElement.id = "recommendationId"
        suggestionElement.textContent = JSON.stringify(suggestion);
  
        newSuggestionId.appendChild(suggestionElement);
      });

  } catch (error) {
    console.log(error);
  }
}

function setTastes() {
  const costumerValues = selectedFriends.map((costumer)=> costumer.split(","))
  console.log(costumerValues)
  postEndpoint(costumerValues);
}
// dropName.addEventListener('change',(e)=>{
//   console.log(e.target.value)
// })



getMain();




