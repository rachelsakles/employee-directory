import React from "react";  
import "./EmployeeTable.css"; 

// Function to format the date correctly
function format(ogDate){
  const date = ogDate.substring(0,ogDate.indexOf("T"))
  const year = date.substring(0,date.indexOf("-"))
  const month = date.substring(date.indexOf("-")+1, date.lastIndexOf("-"))
  const day = date.substring(date.lastIndexOf("-")+1)
  return [year,month,day]
}

function formatDate(date) { 
  //1999-01-11
  const [year,month,day] =  format(date)
  return `${month}/${day}/${year}`

}
// Populate the table with data
function ResultList(props) {
  return (
    <tbody> 
      {props.results.map((emp, index) => (
        <tr key={index}>
          <td id="img"><img src={emp.picture.medium} alt="img"/></td>
          <td>{emp.name.first} {emp.name.last}</td>
          <td>{emp.phone}</td>
          <td><a href={"mailto: " + emp.email}>{emp.email}</a></td>
          <td>{formatDate(emp.dob.date)}</td>
        </tr>))}
    </tbody>
  )
  
}
export default ResultList;
