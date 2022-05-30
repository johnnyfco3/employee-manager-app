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
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    else if(mode === 'delete') {
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
