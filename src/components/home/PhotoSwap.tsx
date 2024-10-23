import { useSwapImage } from "@/hooks/useSwap"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Switch } from "../ui/switch"
import { Image as ImageIcon } from "lucide-react"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { SwapProps } from "@/types/SwapProps"

const PhotoSwap: React.FC<SwapProps> = ({active, setPreviewUrl, setPreviewTargetUrl}) => {
    const sourceInputRef = useRef<HTMLInputElement>(null);
    const targetInputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sourceFile, setSourceFile] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [targetFile, setTargetFile] = useState<any>();


    const handleSourceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
        setSourceFile(file);
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        }
        //This should be removed in the final version
        console.log(sourceFile);
    }

    const handleTargetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
        setTargetFile(file)
        const url = URL.createObjectURL(file)
        setPreviewTargetUrl(url)
        }
        //This should be removed in the final version
        console.log(sourceFile);
    }

    const triggerSourceUpload = () => {
        sourceInputRef.current?.click()
    }

    const triggerTargetUpload = () => {
        targetInputRef.current?.click()
    }

    const swapImageQuery = useSwapImage();

    const handleSwap = () => {
        const form = new FormData();
        form.append('source_photo', sourceFile);
        form.append('target_photo', targetFile);

        swapImageQuery.mutate(form, {onSuccess: () => toast.success('Image has been swapped successfully'), onError: () => {toast.error('An error occured!')}})
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
                                <h3 className="font-medium text-gray-700"> Upload a photo with a face (Source image) </h3>
                            </div>
                            <input type="file" ref={sourceInputRef} className="hidden" onChange={handleSourceUpload} accept={"image/*"}/>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={triggerSourceUpload}>
                                    <> <ImageIcon className="w-4 h-4 mr-2" />Upload Source Photo</>
                            </Button>
                            <p className="text-xs text-gray-500"> Drag or upload your photo JPG, PNG, WEBP </p>
                        </div>
                        <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                                    <h3 className="font-medium text-gray-700">Upload a photo with a face (Target face image)</h3>
                                </div>
                                <input type="file" ref={targetInputRef} className="hidden" onChange={handleTargetUpload} accept={"image/*"}/>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={triggerTargetUpload}> <ImageIcon className="w-4 h-4 mr-2" />Upload Target Photo</Button>
                                <p className="text-xs text-gray-500"> Drag or upload your photo JPG, PNG, WEBP</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                                <h3 className="font-medium text-gray-700"> Click Swap Face Now to start </h3>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSwap}> Swap Face Now </Button>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">High quality</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded"> HD </span>
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

export default PhotoSwap