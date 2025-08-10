"use client";
import { WebcamIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Load react-webcam only on the client to avoid SSR build issues
const ClientWebcam = dynamic(() => import("react-webcam"), { ssr: false });

function WebCam() {
  const [webCamEnabled, setWebCamEnabled] = useState(true);

  return (
    <>
      <div>
        {webCamEnabled ? (
          <>
            <div>
              <ClientWebcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 800,
                }}
              />
            </div>
          </>
        ) : (
          <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
          </>
        )}
      </div>
    </>
  );
}

export default WebCam;
