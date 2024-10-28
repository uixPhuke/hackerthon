import { useState } from 'react';

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    
    if (uploadedFile && (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || uploadedFile.type === 'text/csv')) {
      setFile(uploadedFile);
      setError(null);
      console.log('Uploaded file:', uploadedFile);
    } else {
      setError("Please upload a valid Excel (.xlsx) or CSV file.");
      setFile(null);
    }
  };

  return (
    <div className="admin-dashboard p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <div className="bulk-upload mt-4">
        <label htmlFor="upload" className="block font-semibold">Bulk Upload Providers</label>
        <input
          type="file"
          id="upload"
          onChange={handleFileUpload}
          className="p-2 border mt-2"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        {file && <p className="mt-2 text-green-600">File selected: {file.name}</p>}
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
