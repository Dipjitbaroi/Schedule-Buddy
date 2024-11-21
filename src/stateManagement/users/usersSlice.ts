import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Auth/firebaseConfig";
import { IUserData } from "../../utils/interface";
interface IInitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allUsers: IUserData[];
  searchedUsers: IUserData[];
}
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const docRef = collection(db, "users");
      const querySnapshot = await getDocs(docRef);

      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return data as IUserData[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState: IInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  allUsers: [],
  searchedUsers: [],
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    searchUser: (state, action: PayloadAction<string>) => {
      const searchedUsers = state?.allUsers?.filter(
        (user) =>
          user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.searchedUsers = searchedUsers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { searchUser } = userSlice.actions;

export default userSlice.reducer;
