import YouTube from 'react-youtube';

function VideoPlayer({ videoUrl }) {
  const videoId = videoUrl.split('v=')[1]; // Extract the video ID from the URL
  const opts = {
    width: '100%',
    height: '100%',
  };
  return <YouTube videoId={videoId} opts={opts} style={{ width: '100%' }} />;
}

export default VideoPlayer;
