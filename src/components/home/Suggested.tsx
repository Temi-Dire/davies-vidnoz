interface SuggestedProps {
  active: boolean;
  goToVideo: () => void;
  setPreviewTargetUrl: (val: string | null) => void;
  setTargetId: (val: string | null) => void;
}
const data = {
  videos: [
    {
      _id: {
        $oid: "66f047d431ee250db1f12c27",
      },
      idvideo: "47256116",
      video_url: "https://rr3---sn-5hnednss.googlevideo.com/videoplayback?expire=1729969400&ei=mOgcZ6eVLa-3mLAPp4vwyAc&ip=103.111.39.25&id=o-ABNY3rdqho0bhPAjVypiLfxinkJk8iCfpTKRRhIkf3O2&itag=135&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQn3pFQFVXRKe4X9OkwlH27kcBiO8OptgR84C8j__jfKaWcyIHTdvFF2wfLR6GqBc7RK3-2eaQAWS4vO&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=3770666&dur=119.400&lmt=1712321446278562&keepalive=yes&fexp=24350590,24350655,24350675,24350705,24350729,24350737,24350740,51312688,51326931&c=MEDIA_CONNECT_FRONTEND&txp=5309224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALdp_N04LBDmdvb6xeW3hZz7T9Bugv0UylEUL9OU7yd1AiEAwY1ZSAZlzhOEypF9lHBKbuH91Xsi3D00kW9wBSY1WQA%3D&rm=sn-oxu2vpou-pnce7e,sn-hjuk76&rrc=79,104,80&req_id=fd21d3f280b0a3ee&ipbypass=yes&redirect_counter=3&cm2rm=sn-avnz7z&cms_redirect=yes&cmsv=e&met=1729947815,&mh=2R&mip=102.164.33.62&mm=34&mn=sn-5hnednss&ms=ltu&mt=1729947405&mv=m&mvi=3&pl=24&rms=ltu,au&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRQIhANYKYrK-psup128a__awR_VVl8CDpugE16GaRaUyGNbuAiAUdhLzAI6n7iv_2z67OOwsvtiQecH-Ft3nJmFjFvkTAg%3D%3D",
      timecreate: {
        $date: "2024-09-22T16:37:40.923Z",
      },
      auto_del: "web",
      duration_seconds: 9,
      file_size: 1315825,
      use: 125,
      status: "ok",
    },
  ],
};

const Suggested: React.FC<SuggestedProps> = ({ active, goToVideo, setPreviewTargetUrl, setTargetId }) => {
  // const { data } = useGetSuggested();

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      {active && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
                    setTargetId(video.idvideo);
                    console.log(video.video_url);
                  }}
                >
                  Use Video ({formatDuration(10)})
                </div>
              </div>
            ))
          ) : (
            <p>No videos found!</p>
          )}
          {/* <div className="w-full rounded-3xl overflow-hidden">
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
                setPreviewTargetUrl("http://localhost:5174/7236d2eb-1ebc-4058-8197-1797e2f6bfb9");
                console.log('http://localhost:5174/7236d2eb-1ebc-4058-8197-1797e2f6bfb9')
                setTargetId("");
              }}
            >
              Use Video ({formatDuration(10)})
            </div>
          </div> */}
        </section>
      )}
    </>
  );
};

export default Suggested;