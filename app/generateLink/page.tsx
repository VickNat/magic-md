'use client'

import { ChangeEvent, useState } from "react";
import { storage } from '@/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";

const UploadPage = () => {
  const [file, setFile] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (event: any) => {
    setFile(event?.target?.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const firebaseUrlPrefix = 'https://firebasestorage.googleapis.com/v0/b/magic-md.appspot.com/o/files';
          const file = downloadURL.slice(firebaseUrlPrefix.length) as string;
          const encodedUrl = encodeURIComponent(file);
          const shareableLink = `${window.location.origin}/download/${encodedUrl}`;
          setDownloadUrl(shareableLink);
        });
      });
  }
  // console.log('file', file)

  console.log('downloadUrl', downloadUrl);

  return (
    <div>
      <input required type="file" onChange={(event) => handleFileChange(event)} />
      <button onClick={handleUpload}>Upload</button>
      {downloadUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <p>Download Link: <Link href={downloadUrl}>{downloadUrl}</Link></p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
