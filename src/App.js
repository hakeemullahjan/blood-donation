import React from 'react';
import Navigation from './navigations/index'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import { Provider as StoreProvider } from 'react-redux';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#F50041',
        accent: '#fff',
    },
};

const App = () => {
    return (
        // <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <Navigation />
        </PaperProvider>
        // </StoreProvider>
    )
}

export default App