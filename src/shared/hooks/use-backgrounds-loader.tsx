import {useEffect, useState} from "react";
import {TvModels} from "../constants";
import {TTvModelKey} from "../types";

export const useBackgroundsLoader = () => {
  const [loadedImages, setLoadedImages] = useState<TTvModelKey[]>([]);

  useEffect( () => {
    const preloadImage = (model: TTvModelKey) => {
      const img = new Image();
      img.src = `/assets/${model}/background.png`;
      img.onload = () => {
        setLoadedImages((prev) => {
          if (prev.includes(model)) return prev;
          return [...prev, model];
        });
      };
      img.onerror = () => {
        console.error(`Failed to load image for model: ${model}`);
        setLoadedImages((prev) => {
          if (prev.includes(model)) return prev;
          return [...prev, model];
        });
      };
    };
  
    (Object.keys(TvModels) as TTvModelKey[]).forEach(m => preloadImage(m));
  }, []);
      
  const isLoading = loadedImages.length !== Object.values(TvModels).length;

  return {
    isLoading,
    loadedImages,
    loadedCount: loadedImages.length,
  };
};