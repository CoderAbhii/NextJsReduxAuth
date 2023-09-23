import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "@/apiConfig/apiCall";

export const getAllUsersDataFnc = createAsyncThunk('getUsers', async () => {
    const response = await getAllUsers();
    return response.data;
});

const usersSlice = createSlice({
    name: "usersAll",
    initialState: {
        isLoading: true,
        isError: false,
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsersDataFnc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUsersDataFnc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(getAllUsersDataFnc.rejected, (state) => {
            state.isError = true
        })
    }
})

export default usersSlice.reducer;