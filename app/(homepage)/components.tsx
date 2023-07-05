import { File, X } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

interface DropzoneTextProps {
  file?: File
  isDragActive: boolean
  onFileRemove: () => void
}

export function DropzoneText({ file, isDragActive, onFileRemove }: DropzoneTextProps) {
  return (
    <>
      {file ? (
        <div className="flex items-center gap-x-2 text-gray-700 relative bg-gray-50 border-gray-200 rounded-md px-2 py-1 border">
          <File size={12} />
          <span className="font-mono text-sm">{file.name}</span>

          <button
            className="rounded-full bg-gray-100 border border-gray-300 p-1 hover:bg-gray-200 ml-2"
            aria-label="Remove SVG"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onFileRemove()
            }}
          >
            <X size={10} />
          </button>

          <p className="absolute top-[calc(100%+24px)] text-gray-400 text-xs inset-x-0 w-full text-center">
            Please click &quot;Upload&quot; to continue.
          </p>
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center">
          {isDragActive
            ? 'Drop your SVG file here ...'
            : "Drag 'n' drop some files here, or click to select files."}
        </p>
      )}
    </>
  )
}

interface UploadButtonProps {
  isLoading: boolean
}

export function UploadButton({ isLoading }: UploadButtonProps) {
  return (
    <Button type="submit" className="py-6 disabled:opacity-80" disabled={isLoading}>
      {isLoading ? (
        <>
          <LoadingIndicator />
          Processing ...
        </>
      ) : (
        'Upload'
      )}
    </Button>
  )
}

function LoadingIndicator() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export function SocialIcons() {
  return (
    <div className="fixed top-4 right-4 z-10">
      <a
        href="https://github.com/haikhalfakhreez/svg-jsx"
        target="_blank"
        rel="noreferrer"
        className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 block"
      >
        <span className="sr-only">Github</span>
        <Github className="h-5 w-5" />
      </a>
    </div>
  )
}

export function PageTitle() {
  return (
    <h1 className="font-semibold text-2xl absolute bottom-[calc(100%+24px)] inset-x-0 text-center">
      Convert SVG to React Component
    </h1>
  )
}
