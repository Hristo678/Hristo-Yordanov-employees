import { useEffect, useState } from 'react';
import './EmployeesPairTable.css';

function EmployeesPairTable({ employeesData }) {
  
  const [employeesPairData, setEmployeesPairData] = useState({})
  const [bestPair, setBestPair] = useState(null)

  useEffect(() => {
  setEmployeesPairData({})
    setBestPair(null)
    calculateCommonProjects()
  },[employeesData])

  useEffect(() => {
    if (Object.keys(employeesPairData).length > 0) {
      findBestPair();
    }else{
        setBestPair(null)
    }
  }, [employeesPairData]);

  const calculateCommonProjects = () => {
    const employeesPairDataTemp = {}
    for (let i = 0; i < employeesData.length; i++) {
      for (let j = i + 1; j < employeesData.length; j++) {
        const emp1 = employeesData[i]
        const emp2 = employeesData[j]
        // Check if the employees hava common projects.
        if (emp1.empId !== emp2.empId && emp1.projectId === emp2.projectId) {
        
            const projectWorkingDays = findCommonDays(emp1.dateFrom, emp1.dateTo, emp2.dateFrom, emp2.dateTo)
            let empId1;
            let empId2;
            // Order employees id descending
            if(emp1.empId < emp2.empId ){
                empId1 = emp1.empId
                empId2 = emp2.empId
            }else{
                empId1 = emp2.empId
                empId2 = emp1.empId
            }
            // Concat the two employees with plus sign
            const employeePair = `${empId1}+${empId2}`

            // Check if such pair exists, add the project to the list of other projects and increase the total working days.
            if(employeesPairDataTemp?.[employeePair]){
              const pair = employeesPairDataTemp[employeePair]
              pair.projects.push({projectId: emp1.projectId, projectWorkingDays })
              pair.totalWorkingDays = projectWorkingDays + pair.totalWorkingDays
            }else{
              // Add the pair to the object and set the project list and working days.
              employeesPairDataTemp[employeePair] = {projects: [{projectId: emp1.projectId, projectWorkingDays }], totalWorkingDays: projectWorkingDays}
            }
        }
      }
    }
    setEmployeesPairData(employeesPairDataTemp)
  };

  const findBestPair = () => {
    let bestPair = {totalWorkingDays: 0};
    // Iterating through the entries of employees pairs and compare the total working days.
    // Saving the best pair in the bestPair object.
    Object.entries(employeesPairData).forEach((entries) => {
        const pair = entries[0]
        const obj = entries[1]
        if(bestPair?.totalWorkingDays < obj.totalWorkingDays){
            bestPair = {pair, totalWorkingDays: obj.totalWorkingDays}
        }
    })
    const empId1 = bestPair.pair.split('+')[0]
    const empId2 = bestPair.pair.split('+')[1]
    setBestPair({empId1, empId2, ...employeesPairData[bestPair.pair]})
  }

  function findCommonDays(startDate1, endDate1, startDate2, endDate2) {
    // Parse the dates into Date objects
    const start1 = new Date(startDate1);
    const end1 = endDate1 !== 'NULL' ? new Date(endDate1) : new Date();
    const start2 = new Date(startDate2);
    const end2 = endDate2 !== 'NULL' ? new Date(endDate2) : new Date();
  
    // Calculate the common start date
    const commonStart = start1 > start2 ? start1 : start2;
  
    // Calculate the common end date
    const commonEnd = end1 < end2 ? end1 : end2;
  
    // Calculate the difference in days
    const timeDifference = commonEnd - commonStart;
    const commonDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
    return commonDays;
  }


  return (
    <div className='table-wrapper'>
      <h2>Common Projects</h2>
      <table className='employees-pair-table'>
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
          {bestPair?.projects && bestPair.projects.map((project, index) => (
            <tr key={index}>
              <td>{bestPair.empId1}</td>
              <td>{bestPair.empId2}</td>
              <td>{project.projectId}</td>
              <td>{project.projectWorkingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default EmployeesPairTable;