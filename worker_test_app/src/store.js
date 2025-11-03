import { create } from "zustand";


export const useTasksStore=create((set)=>({
    tasks:[],
    setTasks:(tasks)=>set({
        tasks:[...tasks]
    }),
    addTask:(newTasks)=>set((state)=>({
        tasks:[...state.tasks,...newTasks]
    })),
    clearTasks:()=>set({tasks:[]})

}))