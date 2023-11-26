import { create } from "zustand";
import initialPatients, { Patient } from "@/store/patients.ts";

interface PatientsStore {
  patients: Patient[];
  isLogged: boolean;
  addPatient: (patient: Patient) => void;
  removePatient: (patient: Patient) => void;
  changePatient: (patient: Patient) => void;
  clearPatients: () => void;
  getPatients: () => void;
  getLogged: () => void;
  setLogged: (isLogged: boolean) => void;
}

const usePatientsStore = create<PatientsStore>((set) => ({
  patients: initialPatients,
  isLogged: false,
  addPatient: (patient: Patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  removePatient: (patient: Patient) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.tajNumber !== patient.tajNumber),
    })),
  changePatient: (patient: Patient) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.tajNumber === patient.tajNumber ? patient : p,
      ),
    })),
  clearPatients: () => set({ patients: [] }),
  getPatients: () => set((state) => ({ patients: state.patients })),
  getLogged: () => set((state) => ({ isLogged: state.isLogged })),
  setLogged: (isLogged: boolean) => set({ isLogged: isLogged }),
}));

export default usePatientsStore;
