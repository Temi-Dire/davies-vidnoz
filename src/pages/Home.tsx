import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Image as ImageIcon, Info, Video } from "lucide-react"
import Navbar from '@/components/home/Navbar'
import PhotoSwap from '@/components/home/PhotoSwap'
import VideoFaceSwap from '@/components/home/VideoFaceSwap'
import ChangeClothes from '@/components/home/ChangeClothes'
import Suggested from '@/components/home/Suggested'
import MyVideos from '@/components/home/MyVideos'

const Home = () => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video' | 'clothes' | 'suggested' | 'my-videos'>('photo');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTargetUrl, setPreviewTargetUrl] = useState<string | null>(null);
  const [showProcessedMedia, setShowProcessedMedia] = useState(false);

  const processedMedia = [
    { id: 1, type: 'video', name: 'Video 1', createdAt: '2023-06-01', expiresAt: '2023-07-01' },
    { id: 2, type: 'image', name: 'Image 1', createdAt: '2023-06-02', expiresAt: '2023-07-02' },
    // ... add more items as needed
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
    <Navbar showProcessedMedia={showProcessedMedia} setShowProcessedMedia={setShowProcessedMedia}/>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showProcessedMedia ? (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Processed Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {processedMedia.map((item) => (
                    <Card key={item.id}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md mb-2">
                        {item.type === 'video' ? ( <Video className="w-12 h-12 text-gray-400" /> ) : (<ImageIcon className="w-12 h-12 text-gray-400" /> )}
                        </div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">Created: {item.createdAt}</p>
                        <p className="text-sm text-gray-500">Expires: {item.expiresAt}</p>
                    </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        ) : (
            <>
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">AI Face Swap & Clothes Change</h1>
                <p className="text-center text-gray-600 mb-8">Upload your photos or videos to swap faces or change clothes. Be whoever you want to be!</p>

                <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-8">
                    <Button className={`${activeTab === 'photo' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('photo')}>Photo Face Swap</Button>
                    <Button className={`${activeTab === 'video' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('video')}>Video Face Swap</Button>
                    <Button className={`${activeTab === 'clothes' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('clothes')}>Change Clothes</Button>
                    <Button className={`${activeTab === 'suggested' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('suggested')}>Suggested</Button>
                    <Button className={`${activeTab === 'my-videos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('my-videos')}>My Videos</Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  {
                  (activeTab === 'video' || activeTab === 'photo' || activeTab === 'clothes') &&
                    <div className="md:w-1/2 flex-1 ">
                        {previewUrl && (
                        <>
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Source Photo</h1>
                        <div className="mb-4"> {activeTab === 'video' ? (<video src={previewUrl} controls className="w-full rounded-lg shadow-lg h-[500px] object-contain" />) : (<img src={previewUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" />)}</div>
                        </>
                        )
                        }
                        {previewTargetUrl && (
                        <>
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Target Photo</h1>
                        <div className="mb-4"> {activeTab === 'video' ? (<video src={previewTargetUrl} controls className="w-full rounded-lg shadow-lg" />) : (<img src={previewTargetUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" />)}</div>
                        </>
                        )
                        }
                        <p className="mt-4 text-sm text-gray-500 flex items-center "> <Info className="w-4 h-4 mr-1" /> Disclaimer: This AI service is for personal entertainment only. Please do not distribute or use the modified content for illegal purposes.</p>
                    </div>
                  }

                <div className={`${ activeTab === 'suggested' ? 'w-full' : "md:w-1/2"}`}>
                  <PhotoSwap active={activeTab === 'photo'} setPreviewUrl={setPreviewUrl} setPreviewTargetUrl={setPreviewTargetUrl} />
                  <VideoFaceSwap active={activeTab === 'video'} setPreviewUrl={setPreviewUrl} setPreviewTargetUrl={setPreviewTargetUrl} />
                  <ChangeClothes active={activeTab === 'clothes'} setPreviewUrl={setPreviewUrl} />
                  <Suggested active={activeTab === 'suggested'} goToVideo={() => setActiveTab('video')} setPreviewTargetUrl={setPreviewTargetUrl}/>
                  <MyVideos active={activeTab === 'my-videos'} />
                </div>
            </div>
        </>
        )}
    </main>
    </div>
  )
}

export default Home