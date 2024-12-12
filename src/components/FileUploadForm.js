import React from 'react';

function FileUploadForm({ onFileChange, onUpload, isLoading, error }) {
  const handleChange = (e) => {
    onFileChange(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".html"
        data-testid='textbox'
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-6 py-2 text-white font-semibold bg-blue-600 rounded-lg border-gray-300 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        {isLoading ? <img src="./spinner.svg" alt="Loading..." className="h-5 w-5" /> : 'Upload and Analyze'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default FileUploadForm;
