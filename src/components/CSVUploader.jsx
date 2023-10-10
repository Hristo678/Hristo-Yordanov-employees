import Papa from 'papaparse';
import './CSVUploader.css'

function CSVUploader({ onDataLoaded }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(file){
        Papa.parse(file, {
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (result) => {
            const data = []
      
            // Checking if the csv table has header, if there is no header, the data in the first row and column will be empId (number value).
            if(typeof result.data[0][0] === 'number'){
              data.push( { empId: result.data[0][0], projectId: result.data[0][1], 
              dateFrom: result.data[0][2], dateTo: result.data[0][3] })
            }
            // Iterating thedata array from the file, and saving the data into data object.
            for (let i = 1; i < result.data.length; i++) {
              data.push( { empId: result.data[i][0], projectId: result.data[i][1], 
              dateFrom: result.data[i][2], dateTo: result.data[i][3] })
            }
              onDataLoaded(data);
            },
          });
    }else{
        onDataLoaded([])
    }
  };

  return (
    <div className="file-upload-container">
       <label htmlFor="file-upload" className="custom-file-upload-button">
          Choose a CSV File
      </label>
      <input
        type="file"
        id="file-upload"
        accept=".csv"
        className="file-upload-input"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default CSVUploader;