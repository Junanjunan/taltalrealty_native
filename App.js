import { Provider } from 'react-redux';
import styled from "styled-components/native";
import Gate from './components/Gate';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const Container = styled.View`
  flex:1;
`;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Container>
          <Gate />
        </Container>
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });