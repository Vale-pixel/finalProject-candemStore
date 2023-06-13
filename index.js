const DOMAIN = 'http://localhost:';
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
let maxCostumer;

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
    maxCostumer = usernames.length

    //console.log(response.rows)
    usernames.forEach((row)=>{
      //<option value="btc">BTC</option>
      const nameOption = document.createElement('option')
      nameOption.innerText = row[0]
      nameOption.setAttribute('value', row)
      dropName.appendChild(nameOption)

    })

    let quantityArray = Array.from({length: maxCostumer})
    quantityArray = quantityArray.map((x,i) => i)
 
    quantityArray.splice(0,2)
    quantityArray.forEach(( value)=>{
      const numberOption = document.createElement('option')
      numberOption.innerText = value
      numberOption.setAttribute('value', value)
      dropQuantity.appendChild(numberOption)
         //console.log(dropQuantity)
    })

    dropQuantity.addEventListener('change', (e) => {
      const selectedQuantity = parseInt(e.target.value);

      let dropdownsContainer = document.getElementById("dropdowns-container");
      dropdownsContainer.innerHTML = "";

      const selectedFriends = [];

      for (let i = 0; i < selectedQuantity; i++) {
        const newDropdown = document.createElement("select");
        newDropdown.classList.add("form-select")
        newDropdown.id = "newDropdownId"
        
        usernames.forEach((row) => {
          const nameOption = document.createElement('option');
          nameOption.innerText = row[0];
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

dropName.addEventListener('change',(e)=>{
  console.log(e.target.value)
})


const postEndpoint = async () => {
  try {
    const raw = await fetch(
      `${DOMAIN}${PORT}/${POST_ROUTE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'person1': 'Olivia',
          'person2': 'Sophia'
        })
      }
    );
    const response = await raw.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

getMain();
postEndpoint();



