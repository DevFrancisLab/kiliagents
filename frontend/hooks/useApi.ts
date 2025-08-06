import { useCallback } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export function useApi() {
  const apiFetch = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    // Ensure the endpoint ALWAYS has a trailing slash if it's an API call
    const formattedEndpoint = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
    const url = `${API_BASE_URL}${formattedEndpoint}`;
    console.log('[API] Fetching URL:', url);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: `Request failed with status ${response.status}` }));
        throw new Error(errorData.detail || 'An unknown error occurred.');
      }

      if (response.status === 204) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(`API Error at ${url}:`, error);
      throw error;
    }
  }, []);

  const fetchIssues = useCallback(() => {
    return apiFetch('/issues/');
  }, [apiFetch]);

  const submitIssue = useCallback((issueData: { description: string; category: string; latitude: number; longitude: number; place_name: string; }) => {
    return apiFetch('/issues/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
    });
  }, [apiFetch]);

  return { fetchIssues, submitIssue };
}
