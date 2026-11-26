import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  defaultSimulatorProfile,
  initialContents,
  initialOpportunities,
  metrics,
  type Content,
  type Interest,
  type Opportunity,
  type SimulatorProfile,
} from "./data";
export interface PumiState {
  contents: Content[];
  interests: Interest[];
  opportunities: Opportunity[];
  answers: string[];
  selected: string[];
  checklist: string[];
  metrics: typeof metrics;
  simulatorProfile: SimulatorProfile;
}
const initial: PumiState = {
  contents: initialContents,
  interests: [],
  opportunities: initialOpportunities,
  answers: [],
  selected: [],
  checklist: [],
  metrics,
  simulatorProfile: defaultSimulatorProfile,
};
const Store = createContext<{
  state: PumiState;
  update: (fn: (s: PumiState) => PumiState) => void;
  ready: boolean;
}>({ state: initial, update: () => {}, ready: false });
export function PumiProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PumiState>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pumi-demo-v1");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PumiState>;
        if (Array.isArray(parsed.contents) && Array.isArray(parsed.interests)) {
          setState({
            ...initial,
            ...parsed,
            opportunities: Array.isArray(parsed.opportunities)
              ? parsed.opportunities
              : initialOpportunities,
            checklist: Array.isArray(parsed.checklist) ? parsed.checklist : [],
            simulatorProfile:
              parsed.simulatorProfile && typeof parsed.simulatorProfile === "object"
                ? { ...defaultSimulatorProfile, ...parsed.simulatorProfile }
                : defaultSimulatorProfile,
          });
        }
      }
    } catch {
      localStorage.removeItem("pumi-demo-v1");
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("pumi-demo-v1", JSON.stringify(state));
      } catch {
        /* Keep session state when browser storage is unavailable. */
      }
    }
  }, [state, ready]);
  return (
    <Store.Provider value={{ state, update: (fn) => setState((s) => fn(s)), ready }}>
      {children}
    </Store.Provider>
  );
}
export function usePumi() {
  return useContext(Store);
}
