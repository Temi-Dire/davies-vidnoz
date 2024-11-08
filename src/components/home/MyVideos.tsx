import { useGetMyVideos } from "@/hooks/useSwap";

interface MyVideosProps {
    active: boolean;
}

const MyVideos: React.FC<MyVideosProps> = ({active}) => {
    const { data } = useGetMyVideos();
    return (
        <>
        {
            active && 
                <section>
                   {data?.videos.map(() =>  <div className="w-[500px] rounded-3xl overflow-hidden">
                        <div className="w-full bg-gray-500 h-[300px]"/>
                        <div className="px-2 py-4 flex gap-x-4 bg-white">
                            <div className="size-[50px] bg-gray-500 rounded-md"/>
                            <span>
                                <p>Suggested Video Three</p>
                                <p>06:00</p>
                            </span>
                        </div>
                        <div className="w-full bg-blue-700 py-3 text-lg text-white text-center">Use Video</div>
                    </div> )}
                </section>
        }
        </>
    )
}

export default MyVideos