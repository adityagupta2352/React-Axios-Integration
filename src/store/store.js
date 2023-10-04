import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../Slices/mainSlice";

const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // To allow using non-serializable values
  //   }),
});

export default store;
