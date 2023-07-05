'use client'

import * as React from 'react'
import camelCase from 'camelcase'
import { FileRejection, useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { DropzoneText, PageTitle, UploadButton } from './components'

function parsedName(name: string) {
  const parsed = camelCase(name.split('.')[0], { pascalCase: true })
  return parsed.endsWith('Icon') ? parsed : `${parsed}Icon`
}

export function UploadForm() {
  const { toast } = useToast()

  const [file, setFile] = React.useState<File>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function convert(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No SVG uploaded.',
        description: 'Please upload an SVG file to convert.',
      })
      return
    }

    setIsLoading(true)

    const name = parsedName(file.name)
    const svg = await file.text()

    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ svg, name }),
    })

    const blob = await response.blob()

    toast({
      title: '✅ Success!',
      description: 'Your SVG has been converted to a React component.',
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}.zip`
    a.click()

    setIsLoading(false)
  }

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((f) => {
      setFile(f)
    })
  }, [])

  const onDropRejected = React.useCallback(
    (fileRejections: FileRejection[]) => {
      fileRejections.forEach((f) => {
        toast({
          variant: 'destructive',
          title: `Invalid file type (${f.file.type}).`,
          description: `Please upload an SVG file to convert.`,
        })
      })
    },
    [toast]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg'],
    },
    maxSize: 4194304, // 4MB
    onDropRejected,
  })

  return (
    <form onSubmit={convert} className="gap-4 flex flex-col w-full relative">
      <PageTitle />

      <AspectRatio ratio={16 / 9}>
        <div
          {...getRootProps()}
          className={cn(
            'border border-gray-200 rounded-md p-8 w-full h-full flex items-center justify-center',
            isDragActive && 'ring-4 ring-gray-300/50'
          )}
        >
          <input type="file" name="file" id="file" accept="image/svg+xml" {...getInputProps()} />
          <DropzoneText
            file={file}
            isDragActive={isDragActive}
            onFileRemove={() => setFile(undefined)}
          />
        </div>
      </AspectRatio>

      <UploadButton isLoading={isLoading} />
    </form>
  )
}
