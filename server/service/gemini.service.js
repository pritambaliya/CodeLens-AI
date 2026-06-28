import model from "../config/gemini.config.js";

const reviewCode = async (code) => {

const prompt = `
You are a senior software engineer and code reviewer.

Analyze the following code:

${code}


Give a concise professional code review.

Rules:
- Keep answers short and clear.
- Use bullet points.
- Avoid unnecessary explanations.
- Explain only important issues.
- Make suggestions practical for developers.


Format response exactly:


1. Bugs:
- List only real bugs or potential issues.
- If no bugs, write "No bugs found."


2. Security Issues:
- Mention security risks.
- If none, write "No security issues."


3. Optimization:
- Give performance improvement suggestions.


4. Time Complexity:
- Give Big-O complexity with one short reason.


5. Space Complexity:
- Give Big-O complexity with one short reason.


6. Better Approach:
- Give a better solution idea in short.


7. Code Quality Rating:
- Give rating between 1-5.
- Give one sentence reason.


Code:
${code}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
}

export default reviewCode;