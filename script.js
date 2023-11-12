const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPhone = document.getElementById('phone');
const userList = document.getElementById('users');
const form = document.getElementById('form');
const msg = document.querySelector('.msg');

form.addEventListener('submit', addUser);
userList.addEventListener('click', removeUser);
userList.addEventListener('click', editUser);

function addUser(e) {
    e.preventDefault();

    if (inputName.value === '' || inputEmail.value === '' || inputPhone.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        console.log(1);

        setTimeout(() => msg.remove(), 3000);
    } else {
        //Creating different elements to be added in DOM
        const li = document.createElement('li');
        const delBtn = document.createElement('input');
        const editBtn = document.createElement('input');

        //Creating Delete button
        delBtn.className = 'del float-right';
        delBtn.setAttribute('type', "button");
        delBtn.setAttribute('value', "DELETE");

        //Creating Edit button
        editBtn.className = 'edit float-right';
        editBtn.setAttribute('type', "button");
        editBtn.setAttribute('value', "EDIT");

        //Appending all above 3 elements
        li.appendChild(document.createTextNode(`${inputName.value} - ${inputEmail.value} - ${inputPhone.value}`));
        li.appendChild(delBtn);
        li.appendChild(editBtn);

        //appendimg the li to ul inside DOM
        userList.appendChild(li);

        //Storing user Data as an object
        const userData = {
            userName: `${inputName.value}`,
            userEmail: `${inputEmail.value}`,
            userPhone: `${inputPhone.value}`
        }

        //storing userData in crudcrud using AXIOS
        axios.post('https://crudcrud.com/api/038489098a13442a85056901156d4c8d/appointmentData', userData)
            .then((response) => console.log(response.data._id))
            .catch((error) => console.log(error))

        inputName.value = '';
        inputEmail.value = '';
        inputPhone.value = '';

    }
}

function removeUser(e) {
    if (e.target.classList.contains('del')) {
        if (confirm('Are you sure!')) {
            //spliting li text, returns an array
            console.log(e.target.parentElement.innerText);
            partsString = e.target.parentElement.innerText.split('-');
            email_add = partsString[1].trim();
            userList.removeChild(e.target.parentElement);
            localStorage.removeItem(email_add);
        }
    }
}

function editUser(e) {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are you sure')) {
            partsString = e.target.parentElement.innerText.split('-');
            inputName.value = partsString[0].trim();
            inputEmail.value = partsString[1].trim();
            inputPhone.value = partsString[2].trim();
            localStorage.removeItem(partsString[1].trim());
            userList.removeChild(e.target.parentElement);
        }
    }
}
