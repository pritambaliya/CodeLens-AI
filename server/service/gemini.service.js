import model from "../config/gemini.config.js";

const reviewCode = async (code) => {

const prompt = `
You are a senior software engineer performing a professional code review.

Analyze the following code:

${code}


Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.


Response format:

{
  "issues":[
    {
      "type":"Bug | Security | Performance | Best Practice",
      "severity":"Low | Medium | High",
      "description":"Clear short explanation of the problem",
      "lineNumber":"Exact line number from provided code if applicable, otherwise null",
      "suggestion":"Practical solution or improvement"
    }
  ],


  "optimization":"Short performance or code improvement suggestions",


  "timeComplexity":{
    "bigO":"O(?)",
    "reason":"Short explanation"
  },


  "spaceComplexity":{
    "bigO":"O(?)",
    "reason":"Short explanation"
  },


  "betterApproach":"Short description of a better implementation approach",


  "rating":{
    "score":1,
    "reason":"Short professional evaluation"
  }

}


Review rules:

- Identify only real and meaningful issues.
- Do not create fake problems.
- Do not report the same issue multiple times.
- Merge issues that have the same root cause.
- Return maximum 5 most important issues.
- Prioritize:
  1. Security vulnerabilities
  2. Runtime bugs
  3. Performance problems
  4. Important best practices

Issue quality rules:

- Avoid reporting simple formatting or personal coding preferences.
- Do not mark normal working code as a bug.
- Suggestions should be practical for developers.
- Keep descriptions concise and professional.


Line number rules:

- The code contains line numbers in this format:

  1 | code line
  2 | code line
  3 | code line

- Use only these provided line numbers.
- Never guess line numbers.
- Never generate your own line numbers.
- If the issue affects the overall code/design and no exact line exists, use null.


Complexity rules:

- Calculate time complexity based on the actual algorithm.
- Calculate space complexity based on additional memory usage.
- Do not provide complexity for unrelated operations as a fake optimization.


Rating rules:

- Give a score from 1 to 5.
- Consider correctness, security, performance, and code quality.


Code:

${code}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
}

export default reviewCode;