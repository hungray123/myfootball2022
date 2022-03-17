import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fetches key and passes the result to callback, along with an Error if there is any.
 */
export const getItem = (key: string, callback?: (error?: Error, result?: string) => void): Promise<string | null> => {
  return AsyncStorage.getItem(key, callback);
};

/**
 * Sets value for key and calls callback on completion, along with an Error if there is any
 */
export const setItem = (key: string, value: string, callback?: (error?: Error) => void): Promise<void> => {
  return AsyncStorage.setItem(key, value, callback);
};

export const removeItem = (key: string, callback?: (error?: Error) => void): Promise<void> => {
  return AsyncStorage.removeItem(key, callback);
};

/**
 * Gets all keys known to the app, for all callers, libraries, etc
 */
export const getAllKeys = (callback?: (error?: Error, keys?: string[]) => void): Promise<string[]> => {
  return AsyncStorage.getAllKeys(callback);
};

//Fetches multiple key-value pairs for given array of keys in a batch. Once completed, invokes callback with errors (if any) and results.
export const multiGet = (
  keys: string[],
  callback?: (errors?: Error[], result?: [string, string | null][]) => void,
): Promise<[string, string | null][]> => {
  return AsyncStorage.multiGet(keys, callback);
};

//Stores multiple key-value pairs in a batch. Once completed, callback with any errors will be called.
export const multiSet = (keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<void> => {
  return AsyncStorage.multiSet(keyValuePairs, callback);
};

//Clears multiple key-value entries for given array of keys in a batch. Once completed, invokes a callback with errors (if any).
export const multiRemove = (keys: string[], callback?: (errors?: Error[]) => void): Promise<void> => {
  return AsyncStorage.multiRemove(keys, callback);
};

//Removes whole AsyncStorage data, for all clients, libraries, etc. You probably want to use removeItem or multiRemove to clear only your App's keys.
export const clear = (callback?: () => void): Promise<void> => {
  return AsyncStorage.clear(callback);
};
