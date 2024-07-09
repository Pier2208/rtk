import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const handleError = (err: FetchBaseQueryError | SerializedError | undefined): React.ReactNode => {
  if (err) {
    if ('status' in err && err.status === 0) {
      return 'Network error: Please check your connection';
    } else if ('status' in err && err.data) {
      return `Error ${err.status}: ${err.data}`;
    } else if ('message' in err) {
      return `An unexpected error occurred: ${err.message}`;
    } else {
      return 'An unknown error occurred';
    }
  }
  return null;
};