export interface  SwapProps  {
    active: boolean;
    setPreviewUrl: (val: string | null) => void;
    setPreviewTargetUrl: (val: string | null) => void;
}

export type SuggestedType = {
    "status": boolean,
    "videos": [
        {
            "idvideo": string,
            "video_url": string,
            "timecreate": string,
            "auto_del": string,
            "duration_seconds": number,
            "file_size": number,
            "use": number,
            "image_url": string,
            "status": string
        },
    ]
}