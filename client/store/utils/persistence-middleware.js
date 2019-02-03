const doNotPersist = (key, value) => {
  return value;
};

export const createPersistenceMiddleware = () => {
  const savedState = JSON.parse(sessionStorage.getItem('redux-store-key')) || {};

  let prevState;
  let count = 0;

  const persistenceMiddleware = store => {
    const persist = () => {
      const nextState = store.getState();

      if (nextState !== prevState) {
        prevState = nextState;

        self.requestIdleCallback(() => {
          sessionStorage.setItem('redux-store-key', JSON.stringify(nextState, doNotPersist));
        });

        console.log('Storage Write Count:', ++count);
      }
    };

    return next => action => {
      const result = next(action);

      // Persist state after action is dispacthed.
      persist();

      return result;
    };
  };

  // Put saved state onto middleware so the Store can be initialized with the saved state.
  persistenceMiddleware.savedState = savedState;

  return persistenceMiddleware;
};
