import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { saveUser } = useAuthContext();

  const signIn = async (email, password) => {
    const data = { email, password };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/api/user/signin', data)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
          setIsLoading(false);
        } else {
          sessionStorage.setItem('accessToken', response.data);
          saveUser(response.data); // Save the user
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // You should handle errors for rejected requests
        setError(err.message || 'An error occurred');
        setIsLoading(false);
      });
  };

  return { signIn, isLoading, error };
};

