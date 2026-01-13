const REQUIRED_FIELDS = [
  { key: "ownerName", question: "What is the pet owner's name?" },
  { key: "petName", question: "What is your pet's name?" },
  { key: "phone", question: "Please provide your phone number." },
  { key: "preferredDateTime", question: "Preferred date and time for the visit?" }
];

function getNextQuestion(data) {
  const next = REQUIRED_FIELDS.find(f => !data[f.key]);
  return next ? next.question : null;
}

function saveAnswer(data, answer) {
  const next = REQUIRED_FIELDS.find(f => !data[f.key]);
  if (!next) return data;

  return {
    ...data,
    [next.key]: answer
  };
}

function isComplete(data) {
  return REQUIRED_FIELDS.every(f => data[f.key]);
}

module.exports = { getNextQuestion, saveAnswer, isComplete };
