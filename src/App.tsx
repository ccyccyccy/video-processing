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
    ffmpegArguments.push(outputFileName);
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
          <label> Extension:
            <select value={extension} onChange={event => setExtension(event.target.value)}>
              <option>mp4</option>
              <option>mov</option>
              <option>avi</option>
              <option>mpeg</option>
              <option>wmv</option>
              <option>gif</option>
            </select>
          </label>
        </div>
        <div>
          <input type="submit" value="Convert" onClick={event => {event.preventDefault(); handleConvert();}} />
        </div>
      </form>
    </div>
  );
}

export default App;
