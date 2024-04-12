export function getScreenCounts(questionsArray){
    try{
        if(questionsArray){
            let maxScreenCount = 0;
            let maxRankCount = 0;
            questionsArray.forEach(element => {
                if(element?.screen > maxScreenCount){
                    maxScreenCount = element?.screen;
                }
            });
            const maxScreenArray = questionsArray.filter(ques => ques?.screen === maxScreenCount);
            maxScreenArray.forEach(element => {
                if(element?.rank >= maxRankCount){
                    maxRankCount = element?.rank;
                }
            })
            return [maxScreenCount, maxRankCount];
        }
        else return [0,0];
    }
    catch(err){
        console.log("error in getScreenCounts function : ", err);
    }
}