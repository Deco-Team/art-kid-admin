export function cloudinaryURLConvert(publicId: string) {
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`.trim()
}
