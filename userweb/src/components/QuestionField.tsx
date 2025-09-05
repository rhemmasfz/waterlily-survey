
import React from 'react';


type Props = {
    question: string;
    placeholder?: string;
    onChange: (value: string) => void;
    error?: string;
    type?: React.HTMLInputTypeAttribute;
};


export const QuestionField: React.FC<Props> =
    ({
        question,
        placeholder = 'Sample Input',
        onChange,
        error,
        type = 'text'
     }: Props) => {

    return (
        <div className="flex flex-col">
            <label className="label-modern">{question}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="input-modern"
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <div className="helper-error">{error}</div>}
        </div>
    );
};

export default QuestionField;