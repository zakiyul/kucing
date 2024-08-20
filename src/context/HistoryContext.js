import {useState,useEffect,createContext} from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = props => {
    const [history, setHistory] = useState([]);
    
}