import { useState } from "react";
import { OpenAI } from "openai";  // Ensure you have installed the openai package

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,  // Set to true for client-side usage
});

const useTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const handleAudioPlayback = async (text, voice = "alloy") => {
    if (!text.trim()) {
      setError("Text cannot be empty.");
      return;
    }
  
    setIsPlaying(true);
    setError(null);
  
    try {
      // Call OpenAI's TTS API
      const response = await openai.audio.speech.create({
        model: "tts-1",    // TTS model ID
        voice,             // Specify voice (e.g., "alloy")
        input: text,       // The text to convert to speech
      });
  
      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }
  
      // Get the response body as a Blob (binary data)
      const audioBlob = await response.blob();
  
      // Create a URL for the audio Blob
      const audioUrl = URL.createObjectURL(audioBlob);
  
      // Create an Audio object from the Blob URL
      const audio = new Audio(audioUrl);
  
      // Handle end of audio playback
      audio.onended = () => {
        setIsPlaying(false);
      };
  
      // Handle errors in audio playback
      audio.onerror = () => {
        setError("Failed to play audio.");
        setIsPlaying(false);
      };
  
      // Play the audio
      audio.play();
    } catch (err) {
      console.error("Error generating TTS audio:", err);
      setError("Failed to generate TTS audio.");
      setIsPlaying(false);
    }
  };
  

  const handleSourceAudioPlayback = (sourceText) => {
    handleAudioPlayback(sourceText); // Play source text audio
  };

  const handleTargetAudioPlayback = (targetText) => {
    handleAudioPlayback(targetText); // Play translated target text audio
  };

  return { handleSourceAudioPlayback, handleTargetAudioPlayback, isPlaying, error };
};

export default useTTS;
