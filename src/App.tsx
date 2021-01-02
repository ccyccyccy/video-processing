import React, { useCallback, useState } from 'react';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useDropzone } from 'react-dropzone';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);


  async function handleConvert() {
    if (isProcessing) {
      console.error("Is already processing");
      return;
    }

    if (!file) {
      console.error("No files uploaded");
      return;
    }

    setIsProcessing(true);

    const ffmpeg = createFFmpeg({
      log: true,
      progress: ({ ratio }) => {
        setProgress(ratio);
      },
    });

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
    setIsProcessing(false);
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const style = {
    // width: "50vw",
    // height: "50vh",
    background: isDragActive ? "#FFFFFF" : "#C8DADF",
    outline: "2px dashed #92B0B3",
    outlineOffset: isDragActive ? "-20px" : "-10px",
    padding: "100px 20px",
    transition: "outline-offset .15s ease-in-out, background-color .15s linear"
  };

  return (
    <div className="container">
      <div className="uploaderContainer">
        {file === null ?
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} multiple={false} type="file" accept="video/*,image/gif" />
            <div>
              <svg className="boxIcon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
                <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
              </svg>
              <p>Choose a file or drag it here</p>
            </div>
          </div> :
          <div className="checkmarkContainer">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            <p>File <span className="tooltip">{file.name}</span> successfully uploaded!</p>
          </div>
        }
      </div>
      <form className="mainForm">
        <div className="messageAndProgress">{message} {progress !== 0 && <progress value={progress} />}</div>
        <div className="fieldLabel">FPS:</div>
        <div className="fields">
          <label className="option"> Same as source
            <input type="checkbox" checked={!isCustomFps} onChange={event => setIsCustomFps(!isCustomFps)} />
          </label>
          <input className="option" type="number" disabled={!isCustomFps} name="fps" value={fps} onChange={event => setFps(event.target.valueAsNumber)} />
        </div>
        <div className="fieldLabel">Size: </div>
        <div className="fields">
          <label className="option"> Same as source
            <input type="checkbox" checked={!isCustomSize} onChange={event => setIsCustomSize(!isCustomSize)} />
          </label>
          <label className="option">
            Width:
            <input type="number" disabled={!isCustomSize} name="width" value={width} onChange={event => setWidth(event.target.valueAsNumber)} />
          </label>
          <label className="option">
            Height:
            <input type="number" disabled={!isCustomSize} name="height" value={height} onChange={event => setHeight(event.target.valueAsNumber)} />
          </label>
          <span className="tooltip">Use -1 for aspect ratio preserving scaling</span>
        </div>
        <div className="fieldLabel">Extension: </div>
        <div className="fields">
          <select value={extension} onChange={event => setExtension(event.target.value)}>
            <option>mp4</option>
            <option>mov</option>
            <option>avi</option>
            <option>mpeg</option>
            <option>wmv</option>
            <option>gif</option>
          </select>
        </div>
        <div className="fieldLabel">Compression preset: </div>
        <div className="fields">
          <label className="option"><input type="radio" value="ultrafast" checked={preset === "ultrafast"} onChange={event => setPreset(event.target.value)} />Ultrafast</label>
          <label className="option"><input type="radio" value="superfast" checked={preset === "superfast"} onChange={event => setPreset(event.target.value)} />Superfast</label>
          <label className="option"><input type="radio" value="veryfast" checked={preset === "veryfast"} onChange={event => setPreset(event.target.value)} />Veryfast</label>
          <label className="option"><input type="radio" value="faster" checked={preset === "faster"} onChange={event => setPreset(event.target.value)} />Faster</label>
          <label className="option"><input type="radio" value="fast" checked={preset === "fast"} onChange={event => setPreset(event.target.value)} />Fast</label>
          <label className="option"><input type="radio" value="medium" checked={preset === "medium"} onChange={event => setPreset(event.target.value)} />Medium</label>
          <label className="option"><input type="radio" value="slow" checked={preset === "slow"} onChange={event => setPreset(event.target.value)} />Slow</label>
          <label className="option"><input type="radio" value="slower" checked={preset === "slower"} onChange={event => setPreset(event.target.value)} />Slower</label>
        </div>
        <div className="fieldLabel">CRF: </div>
        <div className="fields">
          <input type="range" name="CRF" min="0" max="51" value={crfValue} onChange={event => setCrfValue(event.target.valueAsNumber)}></input> {crfValue} <output className="tooltip">0 is loseless, 51 is worst</output>
        </div>
      </form>
      <div>
        <input id="convertButton" type="submit" value="Convert" disabled={isProcessing} onClick={event => { event.preventDefault(); handleConvert(); }} />
      </div>
    </div>
  );
}

export default App;
