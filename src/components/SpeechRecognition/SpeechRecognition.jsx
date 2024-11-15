import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { IconMicrophone, IconPlayerStopFilled } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [previousTranscript, setPreviousTranscript] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false); // Declare the audioPlaying state

  // Only update the sourceText when the transcript has changed
  useEffect(() => {
    if (transcript && transcript !== previousTranscript) {
      setSourceText(transcript);
      setPreviousTranscript(transcript);
      console.log("Source Text Updated:", transcript);
    } else if (transcript === previousTranscript) {
      console.log("No change in transcript:", transcript);
    }
  }, [transcript, previousTranscript, setSourceText]);

  const handleVoiceRecording = () => {
    const audio = new Audio("https://ssl.gstatic.com/dictionary/static/pronunciation/20191105/rec.m4a");
    audio.play();
    setAudioPlaying(true);

    audio.onended = () => setAudioPlaying(false); // Reset state when audio finishes

    if (listening) {
      SpeechRecognition.stopListening();

      // Delay resetting the source text
      setTimeout(() => {
        setSourceText(""); // Clear the source text
        setPreviousTranscript(""); // Reset previous transcript
        resetTranscript(); // Reset the transcript
        console.log("Source Text Cleared after delay");
      }, 1000); // Adjust the delay time (in milliseconds) as needed
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div>
      {audioPlaying ? (
        <IconPlayerStopFilled size={22} color="#1d4378" className="text-gray-400" />
      ) : (
        <IconMicrophone
          size={22}
          color="#1d4378"
          className="text-gray-400"
          onClick={handleVoiceRecording}
        />
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;
