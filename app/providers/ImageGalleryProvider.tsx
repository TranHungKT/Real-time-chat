import { createContext } from 'react';

interface ImageGalleryType {
  onClickImage: (uri: string) => void;
}

export const ImageGalleryContext = createContext<ImageGalleryType>(null as any);
