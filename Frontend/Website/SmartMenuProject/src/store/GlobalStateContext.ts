// import React, { createContext, useState, ReactNode } from "react";
// import { UserData } from "../payloads/responses/UserData.model";

// interface GlobalStateContextProps {
//   data: UserData[];
//   setData: React.Dispatch<React.SetStateAction<UserData[]>>;
//   currentPage: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   rowsPerPage: number;
//   setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
//   rowsPerPageOption: number[];
//   setRowsPerPageOption: React.Dispatch<React.SetStateAction<number[]>>;
//   totalPages: number;
//   setTotalPages: React.Dispatch<React.SetStateAction<number>>;
// }

// const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
//   undefined
// );

// const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [data, setData] = useState<UserData[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(5);
//   const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
//   const [totalPages, setTotalPages] = useState<number>(10);

//   return (
//     <GlobalStateContext.Provider
//       value={{
//         data,
//         setData,
//         currentPage,
//         setCurrentPage,
//         rowsPerPage,
//         setRowsPerPage,
//         rowsPerPageOption,
//         setRowsPerPageOption,
//         totalPages,
//         setTotalPages,
//       }}
//     >
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// export { GlobalStateContext, GlobalStateProvider };
