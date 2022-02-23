import React from 'react';
import { IAppPreferenceContext } from './type';

export const PreferencesContext = React.createContext<IAppPreferenceContext>({} as IAppPreferenceContext);
