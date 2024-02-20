import { useState, useMemo, useEffect, useCallback } from 'react';

export const useTagAndColor = (inputScore) => {
    const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], []);
    const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], []);
    const [tagColorPosition, setTagAndColorPosition] = useState([tags[0], colors[0], 0]);

    const setTagAndColorAndPosition = useCallback((score) => {
    
        let index;
        let position;
    
        if (score >= 0 && score < 2) {
            index = 0;
        } else if (score >= 2 && score < 4) {
            index = 1;
        } else if (score >= 4 && score < 6) {
            index = 2;
        } else if (score >= 6 && score < 8) {
            index = 3;
        } else {
            index = 4;
        }
    
        position = (score / 10) * 100 + index;
    
        return [tags[index], colors[index], position];
    }, [colors, tags])

    useEffect(() => {
        try {
            const [tag, color, position] = setTagAndColorAndPosition(inputScore);
            setTagAndColorPosition([tag, color, position]);
        }
        catch (e) {
            console.log("error : ", e);
            const position = 0;
            setTagAndColorPosition([tags[0], colors[0], position]);
        }
    }, [inputScore, colors, tags, setTagAndColorAndPosition])

    return tagColorPosition;
}
