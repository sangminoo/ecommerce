import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) return null;

  return (
    <div>
      {/* <input type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs" /> */}
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-xl overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2 ">
              <button
                className="btn btn-xs btn-warning hover:btn-ghost"
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>

            <Image fill src={url} className="object-cover" alt="" />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="sqzyzv5d">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <button
              type="button"
              className="btn btn-sm btn-neutral "
              onClick={onClick}
              disabled={disabled}
            >
              <ImagePlus className="w-4 h-4 " /> Upload an image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
