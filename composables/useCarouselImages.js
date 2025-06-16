// This composable looks strange because the wildcard causes a linter error where the code is greyed out
export const useCarouselImages = async () => {
  const images = import.meta.glob("/assets/carousel_images/*.{jpg,jpeg,png,gif}", { eager: true });

  // Convert to array of objects with URL and placeholder width/height
  const imageEntries = Object.values(images).map((img) => ({
    url: img.default,
    width: 0,  // placeholder
    height: 0, // placeholder
  }));

  // Create an array of promises to load each image and get dimensions
  const promises = imageEntries.map((entry) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = entry.url;
      img.onload = () => {
        resolve({
          largeURL: entry.url,
          thumbnailURL: entry.url, // you can swap this if you have separate thumbs
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    });
  });

  return Promise.all(promises);
};