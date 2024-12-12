import React, { useEffect, useState } from 'react';
import FileUploadForm from './components/FileUploadForm';
import ResultsTable from './components/ResultsTable';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file) => setFile(file);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an HTML file to upload.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('htmlFile', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setResult(response.data);
      }
      return response;
    } catch (err) {
      console.error(err);
      setError('Failed to analyze file.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError('');
  }, [file]);

  return (
    <div className="min-h-screen w-full overflow-hidden text-center bg-gray-50 font-sans">
      <div className="mx-auto my-8 max-w-lg bg-blue-500 p-6 rounded-lg">
        <h1 className="text-2xl text-white font-bold">Accessibility Analyzer</h1>
        <h2 className="mt-2 text-lg text-gray-100">.html files only.</h2>
        <FileUploadForm
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {result && (
        <div className="mx-auto my-8 max-w-4xl p-4 bg-white shadow-lg rounded-lg">
          <ResultsTable results={result} />
        </div>
      )}
      <ScrollToTop/>
    </div>
  );
}

export default App;
