import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import video1 from '../../videos/video1.mp4'
import video2 from '../../videos/video2.mp4'
import video3 from '../../videos/video3.mp4'
import video4 from '../../videos/video4.mp4'
import './player.css'

const Player = () => {
    const videos=[
        {
            url: video1,
            introDuration: 10, 
          },
          {
            url: video2,
            introDuration: 15,
          },
          {
            url: video3,
            introDuration: 10, // seconds
          },
          {
            url: video4,
            introDuration: 15,
          },
    ]

    const [currentVideo, setCurrentVideo] = useState(0);
    const [skipIntro, setSkipIntro] = useState(false);
    const [videoQuality, setVideoQuality] = useState('auto');
    const [showSkipIntro, setShowSkipIntro] = useState(true);
    // const [showHDOption, setShowHDOption] = useState(true);
    // const [isMouseActive, setIsMouseActive] = useState(false);
    // const [elapsedTime, setElapsedTime] = useState(0);

    const handleVideoEnd = () => {
        // Switch to the next video when the current one ends
        setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
        // Reset skipIntro and showSkipIntro on video end
        setSkipIntro(false);
        setShowSkipIntro(true);
    
        // setShowHDOption(true);
        // setElapsedTime(0);
      };

    const handleSkipIntroToggle = () => {
        setSkipIntro(!skipIntro);
        setShowSkipIntro(false);
      };
    
      const handleVideoQualityChange = (quality) => {
        setVideoQuality(quality);
      };
    
      const getCurrentVideoUrl = () => {
        const selectedVideo = videos[currentVideo];
        const introTime = skipIntro ? selectedVideo.introDuration : 0;
        return `${selectedVideo.url}#t=${introTime}`;
      };

      useEffect(() => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setCurrentVideo(randomIndex);
      }, []);

     
      useEffect(() => {
        setShowSkipIntro(true);
        if (skipIntro) {
          const timeoutId = setTimeout(() => {
            setShowSkipIntro(false);
          }, videos[currentVideo].introDuration * 1000);
          return () => clearTimeout(timeoutId);
        }
    
      }, [skipIntro, currentVideo, videos]);
  return (
    <div className='video-player-container'>
      <ReactPlayer
      
      
        url={getCurrentVideoUrl()}
        playing={true}
        controls={true}
        onEnded={handleVideoEnd}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // Disable download button
            },
            tracks: [],
          },
        }}
        width="100%"
        height="100vh"
      />
      <div className="control-btns">
      {showSkipIntro && (
        <div className={`skip-intro-checkbox ${skipIntro ? 'hidden' : ''}`}>
          <label>
            Skip Intro
            <input
              type="checkbox"
              checked={skipIntro}
              onChange={handleSkipIntroToggle}
            />
          </label>
        </div>
      )}
      <div  className='quality-btn'>
       
          <select
            value={videoQuality}
            onChange={(e) => handleVideoQualityChange(e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="hd">HD</option>
          </select>
       
      </div>
      </div>
      
    </div>
  )
}

export default Player
