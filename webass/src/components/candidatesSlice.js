import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    candidates: [], 
    status: 'idle',
    error: null
};

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        addCandidate: (state, action) => {
            state.candidates.push(action.payload);
        },
        removeCandidate: (state, action) => {
            state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload);
        },
    },
});

export const { addCandidate, removeCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;
