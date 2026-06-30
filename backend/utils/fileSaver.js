const fs = require('fs');
const path = require('path');

/**
 * Saves a base64 Data URL to a file in the uploads directory.
 * @param {string} base64String - The base64 Data URL string
 * @param {string} fileNamePrefix - Prefix for the generated file name
 * @returns {string} The relative path to the saved file (e.g. /uploads/profile_12345.png) or the original string if not a base64 URL
 */
const saveBase64File = (base64String, fileNamePrefix) => {
  if (!base64String || !base64String.startsWith('data:')) {
    return base64String;
  }

  try {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64String;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Resolve extension
    let extension = 'bin';
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') extension = 'jpg';
    else if (mimeType === 'image/png') extension = 'png';
    else if (mimeType === 'image/gif') extension = 'gif';
    else if (mimeType === 'image/webp') extension = 'webp';
    else if (mimeType === 'image/svg+xml') extension = 'svg';
    else if (mimeType === 'application/pdf') extension = 'pdf';

    const fileName = `${fileNamePrefix}_${Date.now()}.${extension}`;
    const uploadsDir = path.join(__dirname, '..', 'uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error saving base64 file:', error);
    return base64String;
  }
};

module.exports = { saveBase64File };
