'use client'

const DownloadPage = ({ params }: { params: { id: string } }) => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/magic-md.appspot.com/o/files"
  const file = decodeURIComponent(params.id);

  const url = `${baseUrl}${file}`;
  
  // console.log('file URL', file);

  return (
    <div>
      <h1>Download Page</h1>
      <a href={url} download>Download File</a>
    </div>
  );
};

export default DownloadPage;
