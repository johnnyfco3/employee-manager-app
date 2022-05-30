import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../employee';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerUrl = environment.apiBaseURl;

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiServerUrl + '/employee/all');
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.apiServerUrl + '/employee/add', employee);
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(this.apiServerUrl + '/employee/update', employee);
    }

    deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(this.apiServerUrl + '/employee/delete/' + employeeId);
    }

}
