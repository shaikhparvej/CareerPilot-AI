import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

function WebCam() {
  const [webCamEnabled, setWebCamEnabled] = useState(true);

  return (
    <>
      <div>
        {webCamEnabled ? (
          <>
            <div>
              <Webcam
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
