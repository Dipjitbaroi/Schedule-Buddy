import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Auth/firebaseConfig";
import {
  
  IAppointments,
  IUserData,
} from "../../utils/interface";
interface IInitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allAppointments: IAppointments[];
  filteredAppointments: IAppointments[];
}
export const getMyAppointments = createAsyncThunk(
  "appointments/getMyAppointments",
  async (id: string, thunkAPI) => {
    try {
      const docRef = collection(db, "appointments");
      const q = query(docRef, where("from", "==", id));
      const appointmentSnapshot = await getDocs(q);
      const appointmentsWithUserData: IAppointments[] = [];

      const data = appointmentSnapshot.docs.map((data) => ({
        id: data.id,
        title: data.data().title,
        description: data.data().description,
        date: data.data().date,
        status: data.data().status,
        from: data.data().from,
        to: data.data().to,
      }));

      for (const appointmentData of data) {
        const userId = appointmentData.to;
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const combinedData: IAppointments = {
            ...appointmentData,
            user: userDocSnap.data() as IUserData,
          };

          appointmentsWithUserData.push(combinedData);
        } else {
          console.log("not found");
          return thunkAPI.rejectWithValue("Not found");
        }
      }
      return appointmentsWithUserData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getRequestedAppointments = createAsyncThunk(
  "appointments/requestedAppointment",
  async (id: string, thunkAPI) => {
    try {
      const docRef = collection(db, "appointments");
      const q = query(docRef, where("to", "==", id));
      const appointmentSnapshot = await getDocs(q);
      const appointmentsWithUserData: IAppointments[] = [];

      const data = appointmentSnapshot.docs.map((data) => ({
        id: data.id,
        title: data.data().title,
        description: data.data().description,
        date: data.data().date,
        status: data.data().status,
        from: data.data().from,
        to: data.data().to,
      }));
      for (const appointmentData of data) {
        const userId = appointmentData.from;
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const combinedData: IAppointments = {
            ...appointmentData,
            user: userDocSnap.data() as IUserData,
          };

          appointmentsWithUserData.push(combinedData);
        } else {
          console.log("not found");
          return thunkAPI.rejectWithValue("Not found");
        }
      }
      return appointmentsWithUserData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async (
    { id, data, uid }: { id: string; data: any; uid: string },
    thunkAPI
  ) => {
    try {
      const appointmentRef = doc(db, "appointments", id);
      await updateDoc(appointmentRef, data);
      thunkAPI.dispatch(getMyAppointments(uid));
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState: IInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  allAppointments: [],
  filteredAppointments: [],
};
const appointmentsSlice = createSlice({
  name: "appointmentsSlice",
  initialState,
  reducers: {
    filterData: (
      state,
      action: PayloadAction<{
        search: string;
        status: string;
        filter: string;
      }>
    ) => {
      const { search, status, filter } = action.payload;

      // Get the current date
      const currentDate = new Date();

      // Filter by search term and status
      let filteredAppointments = state.allAppointments.filter((appointment) => {
        const matchesSearch =
          appointment.user.name.toLowerCase().includes(search.toLowerCase()) ||
          appointment.user.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status === "all" || appointment.status === status;

        return matchesSearch && matchesStatus;
      });

      // Sort by filter if specified
      if (filter === "upcoming" || filter === "past") {
        filteredAppointments = filteredAppointments
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (filter === "upcoming") {
              // Sort by upcoming dates
              return dateA.getTime() - dateB.getTime();
            } else if (filter === "past") {
              // Sort by past dates
              return dateB.getTime() - dateA.getTime();
            }
            return 0;
          })
          .filter((appointment) => {
            const appointmentDate = new Date(appointment.date);

            if (filter === "upcoming") {
              return appointmentDate >= currentDate;
            } else if (filter === "past") {
              return appointmentDate < currentDate;
            }
            return true;
          });
      }

      state.filteredAppointments = filteredAppointments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyAppointments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getMyAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allAppointments = action.payload;
      })
      .addCase(getMyAppointments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getRequestedAppointments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getRequestedAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allAppointments = action.payload;
      })
      .addCase(getRequestedAppointments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const {filterData} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
