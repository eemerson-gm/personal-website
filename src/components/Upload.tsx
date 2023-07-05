import { ChangeEvent } from 'react';

interface UploadProps {
  accept: string;
  onUpload: (data: string) => void;
}

export default function Upload({ accept, onUpload }: UploadProps) {
  const onInputUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        onUpload(text);
      };
      reader.readAsText(file);
    }
  };
  return <input type='file' accept={accept} onChange={onInputUpload} />;
}
