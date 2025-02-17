export interface AnalyzerInputControl {
  _audioCtx: AudioContext;
  connectInput: (source: AudioNode) => void;
  disconnectInputs: () => void;
  volume: number;
}

export function useMediaStreamLink(
  audio: HTMLAudioElement,
  analyzer: AnalyzerInputControl
) {
  return {
    onDisabled: () => {
      analyzer.disconnectInputs();
    },
    onStreamCreated: (stream: MediaStream) => {
      // Disable any audio
      audio.pause();
      // create stream using audio context
      const streamSrc = analyzer._audioCtx.createMediaStreamSource(stream);
      // connect microphone stream to analyzer
      analyzer.connectInput(streamSrc);
      // mute output to prevent feedback loops from the speakers
      analyzer.volume = 0.0;
    },
  };
}
