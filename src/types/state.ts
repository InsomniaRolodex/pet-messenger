import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store/index';

export type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector:TypedUseSelectorHook<State> = useSelector;
