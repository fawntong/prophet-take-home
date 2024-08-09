import axios from 'axios';

const PORT = 3000;

export const fetchInvestigations = async () => {
    try {
        await axios.get("/investigations").then((data) => {
            console.log("DATA", data);
        })
    } catch (e) {
        console.error("ERROR", e);
    }
}