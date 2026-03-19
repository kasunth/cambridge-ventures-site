import { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { uploadService } from '../../services/api';

interface ImageUploadProps {
  value: string;
  onChange: (path: string) => void;
  category: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, category, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { path } = await uploadService.upload(file, category);
      onChange(path);
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="" className="h-32 w-auto rounded border object-cover" />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
          >
            <FiX />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center hover:border-gold-400 transition-colors"
        >
          <FiUpload className="mx-auto text-2xl text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </p>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
