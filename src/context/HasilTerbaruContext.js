import {createContext, useState} from 'react';

export const HasilContext = createContext();

export const HasilProvider = ({children}) => {
    const [hasil, setHasil] = useState([]);
    const hapusHasilTerbaru = _ => {
        localStorage.removeItem('hasil_terbaru');
        setHasil([])
    }
    const contextData = {
        hasil,
        setHasil,
        hapusHasilTerbaru
    };

    return (
        <HasilContext.Provider value={contextData}> 
            {children}
        </HasilContext.Provider>
    )
}