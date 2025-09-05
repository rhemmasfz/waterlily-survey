import { Survey } from "../types/Survey";

const BASE_URL = 'http://localhost:3000';

export const getSurvey = async (): Promise<Survey | null> => {
  const res = await fetch(`${BASE_URL}/survey/1`);
  if (!res.ok) {
    throw new Error(`Failed to load survey: ${res.status} ${res.statusText}`);
  }
  const data: any = await res.json();

  console.log(res, data);
  // Normalize: server may return a field named 'question' instead of 'questions'
  if (data && data.question) {
    let questions: string[] = [];
    try {
      questions = typeof data.question === 'string' ? JSON.parse(data.question) : data.question;
    } catch (_) {
      questions = [];
    }
    return {
      survey_id: data.survey_id ?? 1,
      title: data.title ?? '',
      subtitle: data.subtitle ?? '',
      questions: questions
    } as Survey;
  }

  return data as Survey;
};

export const submitSurvey = async (survey: Survey, user_id: string, form: any): Promise<Response> => {
  return fetch(`${BASE_URL}/survey/${survey?.survey_id ?? 1}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id,
      answers: form
    })
  });
};