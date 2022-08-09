import useFetch from '../services/useFetch';
import { useState, useEffect } from "react";

export function StudentDetails(){
    const {data, isLoading, error} = useFetch('http://localhost:5000/users/students');
    console.log(data);
    return(data.count);
}

export function TeacherDetails(){
    const {data, isLoading, error} = useFetch('http://localhost:5000/users/teachers');
    console.log(data);
    return(data.length);
}

export function ClassDetails(){
    const {data, isLoading, error} = useFetch('http://localhost:5000/subjects');
    console.log(data);
    return(data.count);
}