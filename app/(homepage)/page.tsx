import { UploadForm } from './form'
import { SocialIcons } from './components'

export default function Home() {
  return (
    <div className="max-w-xl mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-12">
      <SocialIcons />
      <UploadForm />
    </div>
  )
}
