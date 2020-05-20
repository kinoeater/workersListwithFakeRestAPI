export class UI {
  constructor() {
    this.employeesList = document.getElementById("employees");
    this.updateButton = document.getElementById("update");
    this.nameInput = document.getElementById("name");
    this.departmentInput = document.getElementById("department");
    this.salaryInput = document.getElementById("salary");
    this.updateEmplpoyee = document.querySelector(".update-employee");
  }

  addAllEmployeeToUI(employees) {
    let result = "";
    employees.forEach((employee) => {
      result += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>                                
            `;
    });
    //    console.log(result);
    this.employeesList.innerHTML = result;
  }

  clearInput() {
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
  }

  addEmployeeToUI(employee) {
    this.employeesList.innerHTML += `
    <tr>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
                            
        `;
  }

  deleteEmployeeFromUI(element) {
    element.remove();
  }

  toggeleUpdateButton(targetEmployee) {
    if (this.updateButton.style.display === "none") {
      this.updateButton.style.display = "block";
      // targetButton.textContent = "Vazgeç";
      this.addEmployeInfoToInputs(targetEmployee);
    } else {
      this.updateButton.style.display = "none";
      //targetButton.textContent = "Güncelle";
      this.clearInput();
    }
  }

  addEmployeInfoToInputs(targetEmployee) {
    const children = targetEmployee.children;
    this.nameInput.value = targetEmployee.children[0].textContent;
    this.departmentInput.value = targetEmployee.children[1].textContent;
    this.salaryInput.value = targetEmployee.children[2].textContent;
  }

  updateEmployeeOnUI(updatedEmployee, parent) {
    parent.innerHTML = `
    <tr>
        <td>${updatedEmployee.name}</td>
        <td>${updatedEmployee.department}</td>
        <td>${updatedEmployee.salary}</td>
        <td>${updatedEmployee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
                            
        `;
    this.clearInput();
  }
}
