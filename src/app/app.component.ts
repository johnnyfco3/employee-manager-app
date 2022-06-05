import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  employees: Employee[] = [];
  name: string = '';
  email: string = '';
  jobTitle: string = '';
  phone: string = '';
  imageUrl: string = '';
  editEmployee: Employee = {} as Employee;
  deleteEmployee: Employee = {} as Employee;
  key: string = '';

  constructor(private employeeService: EmployeeService) { } 

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  onAddEmployee(): void {
    document.getElementById('add-employee-form')?.click()
    const newEmployee: Employee = {
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      phone: this.phone,
      imageUrl: this.imageUrl
    };
    this.employeeService.addEmployee(newEmployee).subscribe(
      (data: Employee) => {
        this.employees.push(data);
        this.name = '';
        this.email = '';
        this.jobTitle = '';
        this.phone = '';
        this.imageUrl = '';
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }

  onUpdateEmployee(employee: Employee): void {
    document.getElementById('edit-employee-form')?.click()
    this.employeeService.updateEmployee(employee).subscribe(
      (data: Employee) => {
        const index = this.employees.findIndex(e => e.id === data.id);
        this.employees[index] = data;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }

  onDeleteEmployee(employeeId: number | undefined): void {
    document.getElementById('delete-employee-form')?.click()
    this.employeeService.deleteEmployee(employeeId as number).subscribe(
      (data: void) => {
        const index = this.employees.findIndex(e => e.id === employeeId);
        this.employees.splice(index, 1);
      }
    )
  }

  searchEmployees(searchTerm: string): void {
    const results: Employee[] = [];
    this.employees.forEach(employee => {
      if(employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 
        || employee.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        || employee.jobTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        || employee.phone.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        results.push(employee);
      }
    });
    this.employees = results;
    if(results.length === 0 || searchTerm === '') {
      this.employeeService.getEmployees().subscribe(
        (data: Employee[]) => {
          this.employees = data;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    }
  }

  onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    else if(mode === 'edit') {
      this.editEmployee = employee as Employee;
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    else if(mode === 'delete') {
      this.deleteEmployee = employee as Employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
