import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('Accessibility Analyzer App', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  it('renders the app with input and button', () => {
    render(<App />);

    // Check for input field
    const fileInput = screen.getByTestId('textbox', { hidden: true });
    expect(fileInput).toBeInTheDocument();

    // Check for button
    const button = screen.getByRole('button', { name: /upload and analyze/i });
    expect(button).toBeInTheDocument();

    // Check for headings
    expect(screen.getByText(/Accessibility Analyzer/i)).toBeInTheDocument();
    expect(screen.getByText(/.html files only./i)).toBeInTheDocument();
  });

  it('displays error if no file is selected on upload', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /upload and analyze/i });

    fireEvent.click(button);

    expect(await screen.findByText(/Please select an HTML file to upload./i)).toBeInTheDocument();

  });

  it('calls the API and displays results on successful upload', async () => {
    const mockResponse = {
      complianceScore: 85,
      issues: [
        { type: 'Missing alt attribute', element: '<img src="example.jpg">', suggestion: 'Add an alt attribute' },
        { type: 'Skipped heading level', element: '<h4>', suggestion: 'Use a proper heading order' },
      ],
    };

    axios.post.mockResolvedValueOnce({ status: 200, data: mockResponse });

    render(<App />);

    const fileInput = screen.getByTestId('textbox', { hidden: true });
    const button = screen.getByRole('button', { name: /upload and analyze/i });

    // Simulate file selection
    const file = new File(['<html></html>'], 'test.html', { type: 'text/html' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simulate form submission
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Compliance Score: 85%/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Missing alt attribute/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Skipped heading level/i)).toBeInTheDocument();
    });
  });

  it('displays error on failed API call', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Failed to analyze file.' } } });

    render(<App />);

    const fileInput = screen.getByTestId('textbox', { hidden: true });
    const button = screen.getByRole('button', { name: /upload and analyze/i });

    // Simulate file selection
    const file = new File(['<html></html>'], 'test.html', { type: 'text/html' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simulate form submission
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Failed to analyze file./i)).toBeInTheDocument();
    });
  });
});
