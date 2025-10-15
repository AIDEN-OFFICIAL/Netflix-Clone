import { createContext, useContext, useState, useEffect } from 'react';

const NetflixContext = createContext();

const STORAGE_KEYS = {
  USER: 'netflix_user',
  MY_LIST: 'netflix_my_list',
};

export const NetflixProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem(STORAGE_KEYS.MY_LIST);
    return savedList ? JSON.parse(savedList) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist user data
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  // Persist my list
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(myList));
  }, [myList]);

  const addToMyList = async (movie) => {
    try {
      setIsLoading(true);
      if (myList.some(m => m.id === movie.id)) {
        throw new Error('Movie already in your list');
      }
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setMyList((prev) => [...prev, movie]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to add to list');
      setIsLoading(false);
    }
  };

  const removeFromMyList = async (movieId) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setMyList((prev) => prev.filter((movie) => movie.id !== movieId));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to remove from list');
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const logout = () => {
    setUser(null);
    setCurrentMovie(null);
    setSearchQuery('');
    setMyList([]);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.MY_LIST);
  };

  const contextValue = {
    user,
    setUser,
    currentMovie,
    setCurrentMovie,
    searchQuery,
    setSearchQuery,
    myList,
    addToMyList,
    removeFromMyList,
    isLoading,
    error,
    clearError,
    logout
  };

  return (
    <NetflixContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </NetflixContext.Provider>
  );
};

export const useNetflix = () => {
  const context = useContext(NetflixContext);
  if (!context) {
    throw new Error('useNetflix must be used within a NetflixProvider');
  }
  return context;
};