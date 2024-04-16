export function getScreenCounts(questionsArray){
    try{
        if(questionsArray){
            let maxScreenCount = 0;
            questionsArray.forEach(element => {
                if(element?.screen > maxScreenCount){
                    maxScreenCount = element?.screen;
                }
            });
            return maxScreenCount;
        }
        else return 1;
    }
    catch(err){
        console.log("error in getScreenCounts function : ", err);
    }
}