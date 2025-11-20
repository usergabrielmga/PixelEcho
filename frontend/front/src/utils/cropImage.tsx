export async function getCroppedImg(imageSrc: string, cropArea: any) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = cropArea.width;
  canvas.height = cropArea.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob as Blob], "cropped.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  });
}
