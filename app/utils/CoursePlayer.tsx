import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string; // Use lowercase 'string'
  title: string; // Use lowercase 'string'
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({ otp: "", playbackInfo: "" });

  useEffect(() => {
    // Ensure that videoUrl is not empty
    if (videoUrl) {
      axios
        .post(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL ||
            "http://localhost:8000/api/v1/"
          }getVdoCipherOTP`,
          {
            videoId: videoUrl,
          }
        )
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Q8A2D7CPJKTBQD40`}
          style={{
            border: "0",
            maxWidth: "100%", // Use camelCase
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
