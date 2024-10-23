import { useGetSuggested } from "@/hooks/useSwap";

interface SuggestedProps {
  active: boolean;
  goToVideo: () => void;
  setPreviewTargetUrl: (val: string | null) => void;
}

const Suggested: React.FC<SuggestedProps> = ({ active, goToVideo, setPreviewTargetUrl }) => {
  const { data } = useGetSuggested();

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      {active && (
        <section className="grid grid-cols-3 gap-4 w-full">
          {data && data.videos ? (
            data?.videos.map((video, index) => (
              <div className="w-full rounded-3xl overflow-hidden" key={index}>
                <div className="w-full bg-gray-500 h-[300px]">
                  <video className="w-full h-full object-cover" controls>
                    <source src={video.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div
                  className="w-full bg-blue-700 py-3 text-lg text-white text-center cursor-pointer"
                  onClick={() => {
                    goToVideo();
                    setPreviewTargetUrl(video.video_url);
                  }}
                >
                  Use Video ({formatDuration(video.duration_seconds)})
                </div>
              </div>
            ))
          ) : (
            <p>No videos found!</p>
          )}
          <div className="w-full rounded-3xl overflow-hidden">
            <div className="w-full bg-gray-500 h-[300px]">
              <video className="w-full h-full object-cover" controls>
                <source src={""} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div
              className="w-full bg-blue-700 py-3 text-lg text-white text-center cursor-pointer"
              onClick={() => {
                goToVideo();
                setPreviewTargetUrl("");
              }}
            >
              Use Video ({formatDuration(10)})
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Suggested;
