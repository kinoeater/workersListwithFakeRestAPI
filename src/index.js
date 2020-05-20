import { Request } from "./requests";
import { UI } from "./ui";

// Element Seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const URL = "http://localhost:3000/employees";

const request = new Request(URL);
const ui = new UI();
let updateState = null;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", getAllEmployees);
  form.addEventListener("submit", addEmployee);
  employeesList.addEventListener("click", updateOrDelete);
  updateEmployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() {
  request
    .get()
    .then((employees) => ui.addAllEmployeeToUI(employees))
    .catch((err) => console.error(err));
}

function addEmployee(e) {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();

  if (
    employeeName === "" ||
    employeeDepartment === "" ||
    employeeSalary === ""
  ) {
    alert("Lütfen tüm alanları doldurun!");
  } else {
    request
      .post({
        name: employeeName,
        department: employeeDepartment,
        salary: Number(employeeSalary),
      })
      .then((employee) => {
        ui.addEmployeeToUI(employee);
      })
      .catch((err) => console.log(err));
  }

  ui.clearInput();
  e.preventDefault();
}

function updateOrDelete(e) {
  if (e.target.id === "delete-employee") {
    deleteEmployee(e.target);
  } else if (e.target.id === "update-employee") {
    // console.log(e.target);
    const targetEmployee = e.target.parentElement.parentElement;
    updateEmployeeController(targetEmployee);
  }
}
function deleteEmployee(targetEmployee) {
  const employeeID =
    targetEmployee.parentElement.previousElementSibling.previousElementSibling
      .textContent;
  request
    .delete(employeeID)
    .then((message) => {
      ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch((err) => console.error(err));
}

function updateEmployeeController(targetEmployee) {
  ui.toggeleUpdateButton(targetEmployee);
  if (updateState === null) {
    updateState = {
      updateID: targetEmployee.children[3].textContent,
      updateParent: targetEmployee,
    };
  } else {
    updateState = null;
  }
}

function updateEmployee() {
  //Güncelleme
  const data = {
    name: nameInput.value.trim(),
    department: departmentInput.value.trim(),
    salary: salaryInput.value.trim(),
  };
  const id = updateState.updateID;
  const parent = updateState.updateParent;

  request
    .put(id, data)
    .then((updatedEmployee) => {
      ui.updateEmployeeOnUI(updatedEmployee, parent);
    })
    .catch((err) => console.error(err));
}

//******GET Request******/
/* request
  .get()
  .then((employees) => console.log(employees))
  .catch((err) => console.error(err)); */

//******POST Request***/

/*   const data = {
  name: "Serhat Say",
  department: "Finance",
  salary: "2800",
};
request
  .post(data)
  .then((employees) => console.log(employees))
  .catch((err) => console.error(err));  */

//******PUT Request***/
/*
const data = {
  name: "Hans Kurzgeschishte",
  department: "Cleaning",
  salary: "2300",
};
request
  .put(9, data)
  .then((employees) => console.log(employees))
  .catch((err) => console.error(err));  */

//******DELETE Request***/

/*
request
  .delete(2)
  .then((employees) => console.log(employees))
  .catch((err) => console.error(err));
*/
