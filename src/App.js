import './App.css';
import CSVUploader from './components/CSVUploader';
import EmployeesPairTable from './components/EmployeesPairTable';
import { useEffect, useState } from 'react';

function App() {

  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {

  },[employeesData])

  const handleDataLoaded = (data) => {
    setEmployeesData(data);
  };

  return (
    <div className="App">
      <div>
      <h1>Employees pair identificator</h1>
      <CSVUploader onDataLoaded={handleDataLoaded} />
      <EmployeesPairTable employeesData={employeesData} />
    </div>
    </div>
  );
}

export default App;
