import { z } from 'zod';

const SurveySchema  = z.object({
    survey_id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    questions: z.array(z.string())
});

const AnswerSchema = z.object({
    answer_id: z.number(),
    survey_id: z.number(),
    user_id: z.number(),
    answers: z.array(z.string())
});

const AnswerFormSchema = z.object({
    answers: z.array(z.string())
});

export type Survey = z.infer<typeof SurveySchema>;
export type Answer = z.infer<typeof AnswerSchema>;
export type AnswerForm = z.infer<typeof AnswerFormSchema>;