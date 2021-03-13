import { createContext, useState, ReactNode, useEffect } from 'react';
// import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: Number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelModalUp: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);
 
export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    // useEffect(() => {
    //     Cookies.set('level', String(level));
    //     Cookies.set('currentExperience', String(currentExperience));
    //     Cookies.set('challengesCompleted', String(challengesCompleted));
    // }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    function closeLevelModalUp(){
        setIsLevelModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === "granted"){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} XP`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider value={{level, 
                                            currentExperience, 
                                            challengesCompleted, 
                                            levelUp, 
                                            startNewChallenge, 
                                            activeChallenge, 
                                            resetChallenge, 
                                            completeChallenge, 
                                            closeLevelModalUp,
                                            experienceToNextLevel}}>
            {children} 

            { isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}
