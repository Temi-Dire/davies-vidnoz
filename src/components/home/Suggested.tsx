import { useGetSuggested } from "@/hooks/useSwap";

interface SuggestedProps {
    active: boolean;
    goToVideo: () => void;
    setPreviewTargetUrl: (val: string | null) => void;
    setTargetId: (val: string | null) => void;
}

const Suggested: React.FC<SuggestedProps> = ({active, goToVideo, setPreviewTargetUrl, setTargetId}) => {

    const { data } = useGetSuggested();
    
    return (
        <>
        {
            active && 
                <section className="grid grid-cols-3 gap-4 w-full">
                    { data && data.videos ? data?.videos.map((video, index) =>  
                    <div className="w-full rounded-3xl overflow-hidden" key={index}>
                        <div className="w-full bg-gray-500 h-[300px]">
                            <video className="w-full h-full object-cover" controls>
                                <source src={video.video_url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="px-2 py-4 flex gap-x-4 bg-white">
                            <img src={video.image_url} className="size-[50px] bg-gray-500 rounded-md" alt="image_url"/>
                            <span>
                                <p>Suggested Video One</p>
                                <p>06:00</p>
                            </span>
                        </div>
                        <div className="w-full bg-blue-700 py-3 text-lg text-white text-center cursor-pointer" onClick={() => {goToVideo(); setPreviewTargetUrl(video.video_url); setTargetId(video.idvideo)}}>Use Video</div>
                    </div>) : 
                    <p>No videos found!</p>
                    }
                    {/* <div className="w-[500px] rounded-3xl overflow-hidden">
                        <div className="w-full bg-gray-500 h-[300px]"/>
                        <div className="px-2 py-4 flex gap-x-4 bg-white">
                            <div className="size-[50px] bg-gray-500 rounded-md"/>
                            <span>
                                <p>Suggested Video One</p>
                                <p>06:00</p>
                            </span>
                        </div>
                        <div className="w-full bg-blue-700 py-3 text-lg text-white text-center cursor-pointer" onClick={() => {goToVideo(); setPreviewTargetUrl('')}}>Use Video</div>
                    </div> */}
                </section>
        }
        </>
    )
}

export default Suggested