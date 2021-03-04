import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
