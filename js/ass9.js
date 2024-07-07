var wNameInput = document.getElementById('WebsiteName');
var wUrlInput = document.getElementById('WebsiteUrl');
var tbodyEl = document.getElementById('tbody');
var pList;

//! localStorage 
if (localStorage.getItem('website') !== null) {
    //! old user
    //! [{}] <==(JSON.parse)== string 
    pList = JSON.parse(localStorage.getItem('website'));
    displayPList();
} else {
    //! null
    pList = [];
}

//!<button onclick="addwebSite()"
//! add website fn 
function addwebSite() {
   // Validate inputs
   validateInput('WebsiteName', 'name');
   validateInput('WebsiteUrl', 'url');

   if (wNameInput.classList.contains('is-invalid') || wUrlInput.classList.contains('is-invalid')) {
       popup(); // Call popup if inputs are invalid
       return;
   }

    //!object
    var website = {
        name: wNameInput.value,
        url: wUrlInput,
    }
    pList.push(website);
    localStorage.setItem('website', JSON.stringify(pList)) //! to save the data (like string)
    displayPList();
    //! clearInputs();
    console.log(pList);
}

function clearInputs() {
    wNameInput.value = '';
    wUrlInput.value = '';
}

function displayWebsite(p, index) {
    tbodyEl.innerHTML += `
    <tr>
        <th>${index + 1}</th>
            <td>${p.name}</td>
            <td><button><i class="fa-solid fa-eye pe-2"></i><a href="http:/www.${p.url}/">visit</a></button></td>
            <td><button onclick="deleteWebsite( ${index})" class="delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>      
    `
}

function displayPList() {
    tbodyEl.innerHTML = '';
    for (var i = 0; i < pList.length; i++) {
        displayWebsite(pList[i], i) //! i is the number of the element
    }
}

//! delete fn 
function deleteWebsite(index) {
    pList.splice(index, 1);
    displayPList();
    localStorage.setItem('website', JSON.stringify(pList))
    console.log(pList);
}


function validateInput(inputId, regExkey) {
    var input = document.getElementById(inputId);
    var regEx = {
        name: /^[a-zA-Z0-9]{3,}$/,
        url: /^[a-zA-Z0-9]{1,}\.com$/,
    }
    var isValid = regEx[regExkey].test(input.value);
    input.classList.remove('is-valid', 'is-invalid'); //!(override)
    if (isValid) {
        input.classList.add('is-valid')
        //! if you text false alert hidde
    } else {
        input.classList.add('is-invalid')
        //! if you text false alert show 
    }
}

//!popup

function popup() {
    var wNameInput = document.getElementById('WebsiteName');
    var wUrlInput = document.getElementById('WebsiteUrl');
    const popup = document.getElementById("popup");

    if (wNameInput.value === '' || wUrlInput.value === '') {
        popup.classList.add("open-popup");
        document.body.style.overflow = 'hidden'; //ADD THIS

    }
    else {
        setTimeout(() => {
            wNameInput.value = '';
            wUrlInput.value = '';
            closePopup();
        }, 2000);
    }

}

//! close popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
    document.body.style.overflow = 'auto'; // Re-enable scrolling

}

