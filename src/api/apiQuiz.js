import axios from 'axios';


const VITE_API_KEY_QUIZ = import.meta.env.VITE_API_KEY_QUIZgi;

const defaultOptions = {
  headers: {
    'X-Api-Key': VITE_API_KEY_QUIZ,
  },
};


async function getQuiz(headers = {}) {
  console.log(VITE_API_KEY_QUIZ)
  
  const options = {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      ...headers,
    },
  };

  try {
    const response = await axios.get('https://quizapi.io/api/v1/questions', options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default getQuiz;