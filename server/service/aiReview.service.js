import Issue from "../model/issue.model.js";


const saveAIResult = async (reviewId, aiData) => {
    const issues = aiData?.issues || [];

    if(issues.length === 0){
        return;
    }
    const issueData = issues.map((issue)=>({
        reviewId,
        type: issue.type || "Best Practice",
        severity: issue.severity || "Low",
        description: issue.description || "",
        lineNumber: issue.lineNumber || null,
        suggestion: issue.suggestion || ""
    }));

    await Issue.insertMany(issueData);
};

export default saveAIResult;