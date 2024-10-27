import { SwapProps } from "@/types/SwapProps"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Switch } from "../ui/switch"
import { Image as ImageIcon, Video } from "lucide-react"
import { useRef, useState } from "react"
import { useSwapVideo } from "@/hooks/useSwap"
import toast from "react-hot-toast"

const VideoFaceSwap: React.FC<SwapProps & {targetId: string | null, targetVideoUrl: string | null, videoUrl: string | null, setTargetId: (val: string | null) => void}> = ({active, setPreviewUrl, setPreviewTargetUrl, targetId = null, targetVideoUrl, videoUrl, setTargetId}) => {
    const sourceInputRef = useRef<HTMLInputElement>(null);
    const targetInputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sourceFile, setSourceFile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [targetFile, setTargetFile] = useState<any>(null);


    const handleSourceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
        setSourceFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        }
    }

    const handleTargetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
        setTargetFile(file)
        const url = URL.createObjectURL(file)
        setPreviewTargetUrl(url)
        console.log(url);
        }
        //This should be removed in the final version
    }

    const triggerSourceUpload = () => {
        sourceInputRef.current?.click()
    }

    const triggerTargetUpload = () => {
        targetInputRef.current?.click()
    }

    const swapVideoQuery = useSwapVideo();

    const handleSwap = () => {
        const form = new FormData();
        form.append('photo', sourceFile);
        if (targetId as string) {
            form.append('video_id', targetId as string);
        } else {
            form.append('video', targetFile);
        }

        if (targetId || targetFile) {
            swapVideoQuery.mutate(form, {onSuccess: () => {toast.success('Image has been swapped successfully'); setTargetFile(null); setTargetId(null);}, onError: () => {toast.error('An error occured!')}})
        } else {
            return ;
        }
        
    }


    return (
        <>
            { active &&
            <Card className="w-full">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold"> 1</div>
                                <h3 className="font-medium text-gray-700">Upload an image with a face (Target face image)</h3>
                            </div>
                            <input type="file" ref={sourceInputRef} className="hidden" onChange={handleSourceUpload} accept={"image/*"}/>
                            {!videoUrl ? 
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={triggerSourceUpload}><> <ImageIcon className="w-4 h-4 mr-2" /> Upload Source Photo </></Button> : 
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setPreviewUrl('')}><> <ImageIcon className="w-4 h-4 mr-2" /> Remove Source Photo </></Button>
                            }
                            <p className="text-xs text-gray-500"> Drag or upload your photo JPG, PNG, WEBP</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                                <h3 className="font-medium text-gray-700">Upload a video with a face (Source video)</h3>
                            </div>
                            <input type="file" ref={targetInputRef} className="hidden" onChange={handleTargetUpload} accept={"video/*"}/>
                            {!targetVideoUrl ? 
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={triggerTargetUpload}> <Video className="w-4 h-4 mr-2" />Upload Target Video</Button> : 
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => {setTargetFile(null); setPreviewTargetUrl(null); setTargetId(null) }}> <Video className="w-4 h-4 mr-2" />Remove Source Video</Button>
                            }
                            <p className="text-xs text-gray-500">Video: Max 100 MB (Upgrade to 500 MB). Drag or upload your GIF or video M4V, MP4, MOV, WEBM</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                                <h3 className="font-medium text-gray-700">Click Swap Face Now to start</h3>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSwap}>Swap Face Now</Button>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">High quality</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">1080P</span>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card> 
            }
        </>
    )
}

export default VideoFaceSwap;