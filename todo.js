let form = document.getElementById('form');
let updateform = document.getElementById('updateform');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let assignInput = document.getElementById('assignInput');
let statusId = document.getElementById('statusId');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let textInputupdate = document.getElementById('textInputupdate');
let dateInputupdate = document.getElementById('dateInputupdate');
let textareaupdate = document.getElementById('textareaupdate');
let assignInputupdate = document.getElementById('assignInputupdate');
let statusIdupdate = document.getElementById('statusIdupdate');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});
// const setError = (element, message) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector('.error');

//   errorDisplay.innerText = message;
//   inputControl.classList.add('error');
//   inputControl.classList.remove('success')
// }
// const setSuccess = element => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector('.error');

//   errorDisplay.innerText = '';
//   inputControl.classList.add('success');
//   inputControl.classList.remove('error');
// };


// const formValidation = () => {
//   const usernameValue = username.value.trim();
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();
//   const password2Value = password2.value.trim();
//   if (textInput.value === '') {
//     console.log('failure');
//     msg.innerHTML = 'Task cannot be blank';
//   } else {
//     console.log('success');
//     msg.innerHTML = '';
//     acceptData();
//     add.setAttribute('data-bs-dismiss', 'modal');
//     add.click();

//     (() => {
//       add.setAttribute('data-bs-dismiss', '');
//     })();
//   }
//   if(textInput === '') {
//       setError(username, 'Task cannot be blank');
//   } else {
//       setSuccess(username);
//   }

//   if(emailValue === '') {
//       setError(email, 'Email is required');
//   } else if (!isValidEmail(emailValue)) {
//       setError(email, 'Provide a valid email address');
//   } else {
//       setSuccess(email);
//   }

//   if(passwordValue === '') {
//       setError(password, 'Password is required');
//   } else if (passwordValue.length < 8 ) {
//       setError(password, 'Password must be at least 8 character.')
//   } else {
//       setSuccess(password);
//   }

//   if(password2Value === '') {
//       setError(password2, 'Please confirm your password');
//   } else if (password2Value !== passwordValue) {
//       setError(password2, "Passwords doesn't match");
//   } else {
//       setSuccess(password2);
//   }

// };

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};


// let formValidation = () => {
//   if (textInput.value === '') {
//     console.log('failure');
//     msg.innerHTML = 'Task cannot be blank';
//   } else {
//     console.log('success');
//     msg.innerHTML = '';
//     acceptData();
//     add.setAttribute('data-bs-dismiss', 'modal');
//     add.click();

//     (() => {
//       add.setAttribute('data-bs-dismiss', '');
//     })();
//   }
//   if (dateInput.value == ''){
//     console.log('failure');
//     msg.innerHTML = 'Task must fill';
//   } else {
//     console.log('success');
//     msg.innerHTML = '';
//     acceptData();
//     add.setAttribute('data-bs-dismiss', 'modal');
//     add.click();

//     (() => {
//       add.setAttribute('data-bs-dismiss', '');
//     })();
//   }
//     (() => {
//       add.setAttribute('data-bs-dismiss', '');
//     })();
//   if(assignInput.value == ''){
//     console.log('failure');
//     msg.innerHTML = 'Task must fill';
//   } else {
//     console.log('success');
//     msg.innerHTML = '';
//     acceptData();
//     add.setAttribute('data-bs-dismiss', 'modal');
//     add.click();

//     (() => {
//       add.setAttribute('data-bs-dismiss', '');
//     })();
//   }
//   if(statusId.value == ''){
//       console.log('failure');
//     } else {
//       console.log('success');
//       msg.innerHTML = '';
//       acceptData();
//       add.setAttribute('data-bs-dismiss', 'modal');
//       add.click();
  
//       (() => {
//         add.setAttribute('data-bs-dismiss', '');
//       })();
//     }
// };

let data = [{}];

let acceptData = () => {
  if (updateform.dataset.taskId) {
    // Update existing task
    let selectedTaskId = updateform.dataset.taskId;
    let selectedTask = data[selectedTaskId];

    selectedTask.text = textInput.value;
    selectedTask.date = dateInput.value;
    selectedTask.description = textarea.value;
    selectedTask.type = assignInput.value;
    selectedTask.status = statusId.value;

    localStorage.setItem('data', JSON.stringify(data));
  } else {
    // Add new task
    data.push({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
      type: assignInput.value,
      status: statusId.value,
    });

    localStorage.setItem('data', JSON.stringify(data));
  }

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = '';
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span
          <span class="small text-secondary"> ${x.type} &nbsp;  &nbsp;
           ${x.status} </span>
           <span class="small text-secondary">${x.description}</span>
          
          <span class="options">
           <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i><i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  let selectedData = data[selectedTask.id];
  textInput.value = selectedData['text'];
  dateInput.value = selectedData['date'];
  textarea.value = selectedData['description'];
  updateform.dataset.taskId = selectedTask.id;
  console.log(selectedTask.id);
  assignInput.value = selectedData['type'];
  statusId.value = selectedData['status'];
};

let resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
  textarea.value = '';
  assignInput.value = '';
  statusId.value = '';

  delete updateform.dataset.taskId;
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data);
  createTasks();
})();
