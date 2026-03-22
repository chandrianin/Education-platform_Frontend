import api from "../../../api/client"


export const getCurrentGoal = async () => {
    console.log("getCurrentGoal");
    try {
        return await api.get("/main/current/");
    } catch (err) {
        if (err.response?.status === 404) return null;
        throw err;
    }
};

export const createOrUpdateGoal = async (text) => {
    console.log("createOrUpdateGoal");
    const formData = new FormData();
    formData.append("text", text);
    return await api.post("/main/current/", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
};

export const deleteGoal = async () => {
    console.log("deleteGoal");
    await api.delete("/main/current/");
};

export const getRandomQuote = async () => {
    console.log("getRandomQuote");
    return await api.get("/main/random-quote/");
};