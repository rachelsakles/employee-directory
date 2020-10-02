import React from "react"; 

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

function sortByDate(result) { 
  //1999-01-11
  function sortDate(date){
    const [year,month,day] = format(date)
    let newDate = year +""+month+""+day
    //19990111
    newDate = +newDate
    console.log(newDate)
    return newDate
  }

  return result.sort((a,b) => sortDate(a.dob.date) - sortDate(b.dob.date))

}

function ResultList(props) {
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody> 
        {props.results.map((emp, index) => (
          <tr key={index}>
            <th scope="row"><img src={emp.picture.medium}/></th>
            <td>{emp.name.first} {emp.name.last}</td>
            <td>{emp.phone}</td>
            <td><a href={"mailto: " + emp.email}>{emp.email}</a></td>
            <td>{formatDate(emp.dob.date)}</td>
          </tr>))}
      </tbody>
    </table>
  )

}

//     <ul className="list-group">
//       {props.results.map(result => (
//         <li className="list-group-item" key={result.id}>
//           <img alt={result.title} className="img-fluid" src={result.images.original.url} />
//         </li>
//       ))}
//     </ul>

// ); 
export default ResultList;
