import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { subjectAPI } from '../services/api';

const SubjectDetail = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('roadmap');

  useEffect(() => {
    fetchSubject();
  }, [id]);

  const fetchSubject = async () => {
    try {
      const response = await subjectAPI.getById(id);
      setSubject(response.data.subject);
    } catch (error) {
      console.error('Failed to fetch subject:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{subject?.name}</h1>
          <p className="text-gray-600">{subject?.description}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <div className="flex gap-4 px-6">
              {['roadmap', 'videos', 'quizzes', 'assignments', 'careers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium capitalize transition ${
                    activeTab === tab
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'roadmap' && (
              <div className="space-y-4">
                {subject?.roadmap?.map((phase, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                    <h3 className="font-semibold text-lg text-gray-800">Phase {phase.phase}: {phase.title}</h3>
                    <p className="text-gray-600">{phase.description}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration: {phase.duration}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject?.videos?.map((video, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                    <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                {subject?.quizzes?.map((quiz) => (
                  <Link
                    key={quiz._id}
                    to={`/quiz/${subject._id}/${quiz._id}`}
                    className="block border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold mb-2">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">{quiz.questions?.length} Questions</p>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {subject?.assignments?.map((assignment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 mb-2">{assignment.description}</p>
                    <p className="text-sm text-gray-500">
                      Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'careers' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subject?.careerPaths?.map((career, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-lg">{career}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubjectDetail;
