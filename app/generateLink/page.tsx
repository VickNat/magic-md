'use client'

import { ChangeEvent, useState } from "react";
import { storage } from '@/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosLink } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog";
import { MdContentCopy } from "react-icons/md";

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
    <div className="min-h-[650px] flex flex-col justify-start items-center gap-y-8">
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Generate Link</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input required type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => handleFileChange(event)} accept=".md" />
        </label>
        <Button  className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={handleUpload}><IoIosLink /> <span> Generate Link</span></Button>
      </div>

      {downloadUrl && (
        <div>
          {/* <p>File uploaded successfully!</p>
          <p>Download Link: <Link href={downloadUrl}>{downloadUrl}</Link></p> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={downloadUrl}
                    readOnly
                    className=""
                  />
                </div>
                <Button type="submit" size="sm" className="px-3 border-none" variant={'ghost'} onClick={() => navigator.clipboard.writeText(downloadUrl)} >
                  <MdContentCopy className='h-6 w-auto text-indigo-600' />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
