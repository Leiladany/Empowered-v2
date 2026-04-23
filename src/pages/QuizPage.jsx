import React, { useState } from "react";
import { Badge, Button, Checkbox, Group, Text } from "@mantine/core";

const quizQuestions = [
  {
    id: 1,
    question: "What is the difference between sexual orientation and gender identity?",
    options: [
      "Sexual orientation refers to a person's attraction to others, while gender identity refers to a person's sense of self.",
      "Sexual orientation and gender identity are the same thing.",
      "Sexual orientation refers to a person's gender identity.",
    ],
    answer:
      "Sexual orientation refers to a person's attraction to others, while gender identity refers to a person's sense of self.",
  },
  {
    id: 2,
    question: "Which of the following is an example of a barrier method of contraception?",
    options: ["Birth control pills", "IUDs", "Condoms"],
    answer: "Condoms",
  },
  {
    id: 3,
    question: "What is the difference between HIV and AIDS?",
    options: [
      "HIV is a virus that can lead to AIDS if left untreated.",
      "AIDS is a virus that can lead to HIV if left untreated.",
      "HIV and AIDS are the same thing.",
    ],
    answer: "HIV is a virus that can lead to AIDS if left untreated.",
  },
  {
    id: 4,
    question: "What is the term for a person who identifies as neither male nor female",
    options: ["Transgender", "Non-binary", "Cisgender"],
    answer: "Non-binary",
  },
  {
    id: 5,
    question: "Which of the following is a menstrual hygiene material?",
    options: ["Menstrual Cup", "Menstrual Mug", "Menstrual Glas"],
    answer: "Menstrual Cup",
  },
  {
    id: 6,
    question: "What is the difference between bacterial and viral sexually transmitted infections?",
    options: [
      "Bacterial STIs can be cured with antibiotics, while viral STIs cannot",
      "Viral STIs can be cured with antibiotics, while bacterial STIs cannot",
      "There is no difference between bacterial and viral STIs",
    ],
    answer: "Bacterial STIs can be cured with antibiotics, while viral STIs cannot",
  },
  {
    id: 7,
    question:
      "Which of the following is a medical condition that affects person with a uterus and can cause pain and discomfort during menstruation?",
    options: ["Endometriosis", "Prostate cancer", "Erectile dysfunction"],
    answer: "Endometriosis",
  },
  {
    id: 8,
    question: "How long can sperm live inside the uterus ?",
    options: ["up to 24 hours", "up to 10 min", "up to 5 days"],
    answer: "up to 5 days",
  },
  {
    id: 9,
    question: "What is a potential side effects of hormonal birth control?",
    options: ["Blinding", "Nausea", "Decreased sex drive"],
    answer: "Nausea",
  },
  {
    id: 10,
    question: 'What does the term "pansexual" mean in regards to sexual orientation',
    options: [
      "A person who is attracted to people of any gender identity",
      "A person who is attracted to people of the opposite gender",
      "A person who is attracted to people of the same gender",
    ],
    answer: "A person who is attracted to people of any gender identity",
  },
];

function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [answerDisabled, setAnswerDisabled] = useState(false);

  function handleAnswerOptionClick(answerOption) {
    setSelectedAnswer(answerOption);
    checkAnswer(answerOption);
    setAnswerDisabled(true);
  }

  function checkAnswer(answerOption) {
    if (answerOption === quizQuestions[currentQuestionIndex].answer) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  }

  function handleNextButtonClick() {
    setSelectedAnswer("");
    setIsAnswerCorrect(null);
    setAnswerDisabled(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  }

  function handleRestartButtonClick() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowScore(false);
    setIsAnswerCorrect(null);
    setAnswerDisabled(false);
  }

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        {showScore ? (
          <Group position="center" direction="column">
            <Text size="xl" weight={600} color="#5b64cf" align="center">
              scored {score} / {quizQuestions.length}
            </Text>

            <Button
              onClick={handleRestartButtonClick}
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
              mt={30}
            >
              restart
            </Button>
          </Group>
        ) : (
          <div>
            <Badge size="xl" color="pink">
              {currentQuestionIndex + 1} / {quizQuestions.length}
            </Badge>

            <Text size="xl" weight={700} mt={20} color="#5b64cf">
              {quizQuestions[currentQuestionIndex].question}
            </Text>

            <Group className="quiz-options" direction="column">
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <div key={option}>
                  <Checkbox
                    label={option}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerOptionClick(option)}
                    disabled={answerDisabled}
                    sx={{
                      ["& .mantine-Checkbox-label"]: {
                        color: "#5b64cf",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      },
                    }}
                  />
                </div>
              ))}
            </Group>

            {isAnswerCorrect === true ? (
              <Text weight="bold" className="quiz-feedback-correct">
                correct!
              </Text>
            ) : null}

            {isAnswerCorrect === false ? (
              <>
                <Text weight="bold" className="quiz-feedback-error">
                  incorrect
                </Text>

                <Text weight={500} className="quiz-feedback-answer">
                  correct answer - <b>{quizQuestions[currentQuestionIndex].answer}</b>
                </Text>
              </>
            ) : null}

            <Button
              onClick={handleNextButtonClick}
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
              disabled={!answerDisabled}
              mt={20}
            >
              next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
