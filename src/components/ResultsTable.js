import React from 'react';

function ResultsTable({ results }) {
  const { complianceScore, issues } = results;

  return (
    <>
      <h2 className="text-lg font-bold mt-4">Compliance Score: {complianceScore}%</h2>
      {issues?.length >= 1 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Types</th>
                <th className="px-4 py-2 border border-gray-300">Elements</th>
                <th className="px-4 py-2 border border-gray-300">Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{issue.type}</td>
                  <td className="px-4 py-2 border border-gray-300">{issue.element}</td>
                  <td className="px-4 py-2 border border-gray-300">{issue.suggestion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ResultsTable;
