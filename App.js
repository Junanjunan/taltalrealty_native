import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import styled from "styled-components/native";
import Gate from './components/Gate';
import store from './redux/store';


const Container = styled.View`
  flex:1;
`;

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <Gate />
      </Container>
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