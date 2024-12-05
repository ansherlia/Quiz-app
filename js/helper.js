const dataFormatter = (questionData) => {
	//SP 3//
	console.log(questionData);
	const result = questionData.map((item) => {
		const questionObject = { question: item.question };
		const answers = [...item.incorrect_answers];
		const correctAnswerIndex = Math.floor(Math.random() * 4);
		answers.splice(correctAnswerIndex, 0, item.correct_answer);
		questionObject.answers = answers;
		questionObject.correctAnswer = correctAnswerIndex;
		questionObject.category = item.category;
		return questionObject;
	});
	return result;
};
export default dataFormatter;
