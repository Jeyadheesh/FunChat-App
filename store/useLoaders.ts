import { create } from "zustand";

interface useLoaderType {
  imgLoading: boolean;
  setImgLoading: (val: boolean) => void;
}

const useLoader = create<useLoaderType>()((set) => ({
  imgLoading: false,
  setImgLoading: (val: boolean) => set({ imgLoading: val }),
}));

export default useLoader;
