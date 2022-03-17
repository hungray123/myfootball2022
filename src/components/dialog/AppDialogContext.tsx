import {IDialog} from 'app/type';
import {AppDialog} from 'components';
import React, {useMemo, useState} from 'react';

export interface IDialogContext {
  showDialog: (dialog: IDialog) => void;
  hideDialog: () => void;
}

const AppDialogContext = React.createContext<IDialogContext>(
  {} as IDialogContext,
);

const AppDialogProvider: React.FC = props => {
  const [mDialog, setMDialog] = useState<IDialog | undefined>(undefined);
  const _showDialog = (dialog: IDialog) => {
    setMDialog(dialog);
  };
  const _hideDialog = () => {
    setMDialog(undefined);
  };

  const dialogContext = useMemo<IDialogContext>(() => {
    return {
      showDialog: _showDialog,
      hideDialog: _hideDialog,
    };
  }, []);

  return (
    <AppDialogContext.Provider value={dialogContext} {...props}>
      {props.children}
      {mDialog ? <AppDialog dialog={mDialog} /> : null}
    </AppDialogContext.Provider>
  );
};

const useDialog = (): IDialogContext => {
  const context = React.useContext<IDialogContext>(AppDialogContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }

  return context;
};

export {AppDialogProvider, useDialog};
