import React, { useRef, useState } from 'react';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function App() {
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [isCustomFps, setIsCustomFps] = useState(false);
  const [fps, setFps] = useState(0);
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(-1);
  const [extension, setExtension] = useState("mp4");
  const [preset, setPreset] = useState("medium");
  const [crfValue, setCrfValue] = useState(23);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const uploaderEl = useRef<HTMLInputElement>(null);

  async function handleConvert() {
    if (!uploaderEl.current) {
      console.error("Upload file element is null");
      return;
    }

    if (!uploaderEl.current.files || !uploaderEl.current.files[0]) {
      console.error("No files uploaded");
      return;
    }

    const ffmpeg = createFFmpeg({
      log: true,
      progress: ({ ratio }) => {
        setProgress(ratio);
      },
    });

    const file = uploaderEl.current.files[0];
    setMessage('Loading...');
    await ffmpeg.load();

    setMessage('Transcoding...');
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));

    const ffmpegArguments = ['-i', file.name];
    if (isCustomFps) {
      ffmpegArguments.push('-r', fps.toString());
    }
    if (isCustomSize) {
      ffmpegArguments.push('-vf', `scale=${width}:${height}`);
    }
    const outputFileName = `output.${extension}`;
    ffmpegArguments.push('-crf', crfValue.toString(), '-preset', preset, outputFileName);
    console.log(ffmpegArguments);
    await ffmpeg.run(...ffmpegArguments);

    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', outputFileName);
    const a = document.createElement("a");
    const url = URL.createObjectURL(new Blob([data.buffer]));
    a.href = url;
    a.download = outputFileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  return (
    <div className="App">
      <form>
        <div>
          <label> Choose a video file:
            <input type="file" accept="video/*,image/gif" ref={uploaderEl} />
          </label>
        </div>
        {message && <div>{message}</div>}
        {progress !== 0 && <progress value={progress} />}
        <div>
          FPS:
          <label> Same as source
            <input type="checkbox" checked={!isCustomFps} onChange={event => setIsCustomFps(!isCustomFps)} />
          </label>
          <input type="number" disabled={!isCustomFps} name="fps" value={fps} onChange={event => setFps(event.target.valueAsNumber)} />
        </div>
        <div>
          Size:
          <label> Same as source
            <input type="checkbox" checked={!isCustomSize} onChange={event => setIsCustomSize(!isCustomSize)} />
          </label>
          <label>
            Width:
            <input type="number" disabled={!isCustomSize} name="width" value={width} onChange={event => setWidth(event.target.valueAsNumber)} />
          </label>
          <label>
            Height:
            <input type="number" disabled={!isCustomSize} name="height" value={height} onChange={event => setHeight(event.target.valueAsNumber)} />
          </label>
          <span className="tooltip">Use -1 for aspect ratio preserving scaling</span>
        </div>
        <div>
          Extension:
          <select value={extension} onChange={event => setExtension(event.target.value)}>
            <option>mp4</option>
            <option>mov</option>
            <option>avi</option>
            <option>mpeg</option>
            <option>wmv</option>
            <option>gif</option>
          </select>
        </div>
        <div>
          Compression preset: 
          <label><input type="radio" value="ultrafast" checked={preset === "ultrafast"} onChange={event => setPreset(event.target.value)} />Ultrafast</label>
          <label><input type="radio" value="superfast" checked={preset === "superfast"} onChange={event => setPreset(event.target.value)} />Superfast</label>
          <label><input type="radio" value="veryfast" checked={preset === "veryfast"} onChange={event => setPreset(event.target.value)} />Veryfast</label>
          <label><input type="radio" value="faster" checked={preset === "faster"} onChange={event => setPreset(event.target.value)} />Faster</label>
          <label><input type="radio" value="fast" checked={preset === "fast"} onChange={event => setPreset(event.target.value)} />Fast</label>
          <label><input type="radio" value="medium" checked={preset === "medium"} onChange={event => setPreset(event.target.value)} />Medium</label>
          <label><input type="radio" value="slow" checked={preset === "slow"} onChange={event => setPreset(event.target.value)} />Slow</label>
          <label><input type="radio" value="slower" checked={preset === "slower"} onChange={event => setPreset(event.target.value)} />Slower</label>
        </div>
        <div>
          CRF: <input type="range" name="CRF" min="0" max="51" value={crfValue} onChange={event => setCrfValue(event.target.valueAsNumber)}></input> {crfValue} <span className="tooltip">0 is loseless, 51 is worst</span>
        </div>
        <div>
          <input type="submit" value="Convert" onClick={event => {event.preventDefault(); handleConvert();}} />
        </div>
      </form>
    </div>
  );
}

export default App;
