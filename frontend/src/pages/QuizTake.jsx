import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { quizAPI } from '../services/api';
import { toast } from 'react-toastify';

const QuizTake = () => {
  const { subjectId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [subjectId, quizId]);

  const fetchQuiz = async () => {
    try {
      const response = await quizAPI.getQuiz(subjectId, quizId);
      setQuiz(response.data.quiz);
    } catch (error) {
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const answerArray = quiz.questions.map((_, index) => answers[index] ?? -1);
    
    if (answerArray.includes(-1)) {
      toast.warning('Please answer all questions');
      return;
    }

    setSubmitting(true);
    try {
      const response = await quizAPI.submit({
        subjectId,
        quizId,
        answers: answerArray,
      });
      
      const result = response.data.result;
      toast.success(`Quiz completed! Score: ${result.score}/${result.totalQuestions}`);
      navigate('/quizzes');
    } catch (error) {
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
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
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">{quiz?.title}</h1>
          <p className="text-gray-600 mt-2">{quiz?.questions?.length} Questions</p>
        </div>

        {quiz?.questions?.map((question, qIndex) => (
          <div key={qIndex} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              {qIndex + 1}. {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <label
                  key={oIndex}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                    answers[qIndex] === oIndex
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => setAnswers({ ...answers, [qIndex]: oIndex })}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-violet-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit Quiz
            </>
          )}
        </button>
      </div>
    </Layout>
  );
};

export default QuizTake;
