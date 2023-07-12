"use client"

import { useEffect, useState } from "react";

const apiUrl = "/api"

export default function Recorder() {
    const [recording, setRecording] = useState<boolean>(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)


    // domというかブラウザの要素へのアクセス？
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const newMediaRecorder = new MediaRecorder(stream)
                setMediaRecorder(newMediaRecorder)
            })
            .catch((err) => {
                console.log("An error occurred: " + err)
            })
    }, [])


    const startRecording = () => {
        if(mediaRecorder) {
            mediaRecorder.start()
            setRecording(true)
        }
    }

    const stopRecording = () => {
        if(mediaRecorder) {
            mediaRecorder.stop()
            setRecording(false)

            mediaRecorder.ondataavailable = async (e: BlobEvent) => {
                const audioData = e.data
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: audioData
                })
                console.log(response.status)
            }
        }
    }

    return (
        <div>
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? "Stop Recording" : "Start Recording"}
            </button>

        </div>
    )
}
