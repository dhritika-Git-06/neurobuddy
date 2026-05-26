import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { subjectAPI, videoAPI } from '../services/api';
import { toast } from 'react-toastify';

const Videos = () => {
  const [subjects, setSubjects] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsRes, progressRes] = await Promise.all([
        subjectAPI.getAll(),
        videoAPI.getProgress(),
      ]);
      setSubjects(subjectsRes.data.subjects);
      setProgress(progressRes.data.progress);
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const getVideoProgress = (videoId) => {
    const videoProgress = progress.find((p) => p.videoId === videoId);
    return videoProgress?.percentage || 0;
  };

  const handleWatchVideo = (subjectId, videoIndex) => {
    navigate(`/video/${subjectId}/${videoIndex}`);
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Video Lectures</h1>
        </div>
        {subjects.map((subject) => (
          <div key={subject._id} className="bg-dark-card p-6 rounded-xl border border-dark-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">{subject.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.videos?.map((video, index) => {
                const videoId = `${subject._id}-${index}`;
                const videoProgress = getVideoProgress(videoId);
                return (
                  <div key={index} className="border border-dark-border rounded-lg p-4 hover:shadow-lg hover:border-purple-400 transition-all duration-200 bg-dark-bg">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-200 flex-1">{video.title}</h3>
                      {videoProgress === 100 && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{video.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{video.duration}</span>
                    </div>
                    <div className="mb-3">
                      <div className="w-full bg-dark-border rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full transition-all"
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{videoProgress}% Complete</p>
                    </div>
                    <button
                      onClick={() => handleWatchVideo(subject._id, index)}
                      className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {videoProgress === 100 ? 'Rewatch' : 'Watch Video'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Videos;
