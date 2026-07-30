// Comprime una foto en el propio navegador antes de subirla a Supabase:
// - la redimensiona para que el lado más largo mida como máximo `maxDim` píxeles
// - la vuelve a guardar como JPEG con calidad `quality` (0 a 1)
// Una foto típica de móvil (3-6 MB) queda normalmente en 200-400 KB.
export function compressImage(file, { maxDim = 1280, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDim) {
        height = Math.round(height * (maxDim / width));
        width = maxDim;
      } else if (height >= width && height > maxDim) {
        width = Math.round(width * (maxDim / height));
        height = maxDim;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (blob) resolve(blob);
          else reject(new Error('No se pudo comprimir la imagen'));
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No se pudo leer la imagen'));
    };

    img.src = objectUrl;
  });
}
