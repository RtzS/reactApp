import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('/employeeList')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ employees: data, isLoading: false }, () => { console.log('Employee Fetched') }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { employees, isLoading, error } = this.state;

        if (error) {
            return <p > { error.message } < /p>;
        }

        if (isLoading) {
            return <p > Loading... < /p>;
        }

        return ( < div > < h4 > List < /h4>< ul > {
            employees.map(employees => < li class = "blue" > < a href = " " > < span class = "empID" > { employees.Employee_Id } < /span><span class="empName"> { employees.Emp_Name } </span > < /a>< /li > )
        } < /ul > < /div > );
}
}

export default Employees;