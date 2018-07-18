
    export const updateState = (state,changeInState) => {
        const newState = { ...state, ...changeInState };
        return newState;
    }