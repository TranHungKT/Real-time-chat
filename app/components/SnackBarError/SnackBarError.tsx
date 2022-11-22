import { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';

interface SnackBarErrorProps {
  isError: boolean;
}

export const SnackBarError = ({ isError }: SnackBarErrorProps) => {
  const [isVisibleError, setIsVisibleError] = useState(true);

  const onDismissSnackBar = () => setIsVisibleError(false);

  useEffect(() => {
    if (isError) {
      setIsVisibleError(true);
    }
  }, [isError]);

  return (
    <Snackbar
      visible={isVisibleError}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Undo',
        onPress: onDismissSnackBar,
      }}
    >
      Something went wrong
    </Snackbar>
  );
};
