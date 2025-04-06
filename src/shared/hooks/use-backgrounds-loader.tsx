import {useEffect, useState} from "react";
import {TvModels} from "../constants";

export const useBackgroundLoader = () => {
  const [loadedImages, setLoadedImages] = useState<TvModels[]>([]);

  useEffect( () => {
    const preloadImage = (model: TvModels) => {
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
  
    (Object.keys(TvModels) as TvModels[]).forEach(m => preloadImage(m));
  }, []);
      
  const isLoading = loadedImages.length !== Object.values(TvModels).length;

  return {
    isLoading,
    loadedCount: loadedImages.length,
  };
};