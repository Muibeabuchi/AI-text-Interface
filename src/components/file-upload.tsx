import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onFileContent: (content: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => toast.error("File reading was aborted");
        reader.onerror = () => toast.error("File reading has failed");
        reader.onload = () => {
          const fileContent = reader.result as string;
          onFileContent(fileContent);
          toast.success(`File "${file.name}" uploaded successfully`);
        };

        if (file.type === "application/pdf") {
          toast.error("PDF parsing is not implemented in this example");
        } else {
          reader.readAsText(file);
        }
      });
    },
    [onFileContent]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "text/plain": [".txt"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

  return (
    <div
      {...getRootProps()}
      className="p-4 text-center transition-colors duration-200 border-2 border-dashed rounded-md cursor-pointer border-primary hover:bg-accent/10"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-primary">Drop the file here ...</p>
      ) : (
        <p className="text-primary">
          Drag 'n' drop a file here, or click to select a file
        </p>
      )}
      <Upload className="w-8 h-8 mx-auto mt-2 text-primary" />
      {acceptedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Selected file:</p>
          <p className="flex items-center justify-center gap-2 text-sm font-medium">
            <File className="w-4 h-4" />
            {acceptedFiles[0].name}
          </p>
        </div>
      )}
    </div>
  );
}
