import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { subjectAPI, videoAPI } from '../services/api';
import { toast } from 'react-toastify';

const VideoPlayer = () => {
  const { subjectId, videoIndex } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchSubjectAndVideo();
  }, [subjectId, videoIndex]);

  const fetchSubjectAndVideo = async () => {
    try {
      const response = await subjectAPI.getById(subjectId);
      const subjectData = response.data.subject;
      setSubject(subjectData);
      
      const index = parseInt(videoIndex);
      if (subjectData.videos && subjectData.videos[index]) {
        setCurrentVideo({ ...subjectData.videos[index], index });
      }
    } catch (error) {
      console.error('Failed to fetch video:', error);
      toast.error('Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoComplete = async () => {
    try {
      const videoId = `${subjectId}-${videoIndex}`;
      await videoAPI.updateProgress({
        videoId,
        subjectId,
        percentage: 100,
      });
      toast.success('Video marked as complete!');
      setProgress(100);
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const handleNextVideo = () => {
    const nextIndex = parseInt(videoIndex) + 1;
    if (subject?.videos && nextIndex < subject.videos.length) {
      navigate(`/video/${subjectId}/${nextIndex}`);
    } else {
      toast.info('You have completed all videos in this subject!');
      navigate('/videos');
    }
  };

  const handlePreviousVideo = () => {
    const prevIndex = parseInt(videoIndex) - 1;
    if (prevIndex >= 0) {
      navigate(`/video/${subjectId}/${prevIndex}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (!currentVideo) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">Video not found</p>
          <button
            onClick={() => navigate('/videos')}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition"
          >
            Back to Videos
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/videos')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Videos
        </button>

        {/* Video Player */}
        <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
          {/* Video Container */}
          <div className="relative bg-black aspect-video">
            {currentVideo.url ? (
              <iframe
                src={currentVideo.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentVideo.title}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-400">Video player placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">Add video URL to play actual content</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h1>
                <p className="text-gray-400">{currentVideo.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400">{currentVideo.duration}</span>
              </div>
            </div>

            {/* Subject Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-dark-border">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Subject</p>
                <p className="text-white font-semibold">{subject?.name}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePreviousVideo}
                disabled={parseInt(videoIndex) === 0}
                className="flex items-center gap-2 px-6 py-3 bg-dark-bg border border-dark-border text-white rounded-lg hover:bg-dark-border transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={handleVideoComplete}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark as Complete
              </button>

              <button
                onClick={handleNextVideo}
                disabled={!subject?.videos || parseInt(videoIndex) >= subject.videos.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
          <h3 className="text-xl font-bold text-white mb-4">Course Videos</h3>
          <div className="space-y-2">
            {subject?.videos?.map((video, index) => (
              <button
                key={index}
                onClick={() => navigate(`/video/${subjectId}/${index}`)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition ${
                  index === parseInt(videoIndex)
                    ? 'bg-purple-900/30 border border-purple-500'
                    : 'bg-dark-bg border border-dark-border hover:border-purple-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  index === parseInt(videoIndex)
                    ? 'bg-purple-500'
                    : 'bg-dark-border'
                }`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold ${
                    index === parseInt(videoIndex) ? 'text-purple-400' : 'text-gray-200'
                  }`}>
                    {video.title}
                  </p>
                  <p className="text-sm text-gray-400">{video.duration}</p>
                </div>
                {index === parseInt(videoIndex) && (
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPlayer;
