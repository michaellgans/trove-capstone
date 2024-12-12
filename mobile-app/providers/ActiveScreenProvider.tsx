// // Active Screen Provdier

// // Imports
// import { createContext, useState, useContext } from "react";

// const ActiveScreenContext = createContext({activeScreen: '', setActiveScreen: (screen: string) => {} });

// export const useActiveScreen = () => useContext(ActiveScreenContext);

// export const ActiveScreenProvider = ({ children }: { children: React.ReactNode }) => {
//     const [activeScreen, setActiveScreen] = useState('');

//     return (
//         <ActiveScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
//             {children}
//         </ActiveScreenContext.Provider>
//     );
// };
