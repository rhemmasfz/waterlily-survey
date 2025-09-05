import React, {useEffect, useState} from 'react';
import {QuestionField} from "../components/QuestionField";
import {Survey} from "../types/Survey";
import {getSurvey, submitSurvey} from "../services/SurveyService";

type SurveyProps = {
    userId: number
};

export const SurveyPage: React.FC<SurveyProps> = ({userId})  =>
{

    const [survey, setSurvey] = useState<Survey>({} as Survey);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const questionFields = survey.questions || [];


    useEffect(() => {
        (async () => {
            try {
                const response = await  getSurvey();
                if (!response) {
                    throw new Error(`Failed to load survey`);
                }

                console.log(response);
                setSurvey(survey);
            } catch (error) {
                console.error('Error fetching survey:', error);
            }
        })();
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submitSurvey(survey, userId.toString(), answers);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError('Failed to submit survey');
        } finally {
            console.log('done');
        }
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="card w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">{survey.title || 'SURVEY TITLE'}</h2>
                <form onSubmit={submit} className="flex flex-col gap-y-5">
                    {
                        questionFields.map((question, index) => (
                            <QuestionField key={index} question={question} onChange={(value) => setAnswers({...answers, [index]: value})} />
                        ))
                    }
                    <div className="flex items-center gap-3">
                        <button type="submit" className="btn-primary">Submit</button>
                        {success && <div className="text-green-600">Survey submitted successfully!</div>}
                        {error && <div className="helper-error">{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyPage;