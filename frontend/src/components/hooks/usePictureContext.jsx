import { PictureContext } from '../context/PictureContext';
import { useContext } from 'react';

export function usePictureContext() {
  const context = useContext(PictureContext);

  if (!context) {
    throw Error('usePictureContext must be used inside');
  }

  return context;
}
