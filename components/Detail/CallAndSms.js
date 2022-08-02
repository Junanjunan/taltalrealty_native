import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { IconDiv } from './Detail';


function goTel(phone){
    Linking.openURL(`tel:${phone}`);
}

function goSms(sms){
    Linking.openURL(`sms:${sms}`);
}

const CallAndSms = (props) => {
    return(
        <>
        <IconDiv onPress={() => goTel(props.href)}><Ionicons name="call" size={24} color="rgb(0,170,0)" /></IconDiv>
        <IconDiv onPress={() => goSms(props.href)}><Ionicons name="mail" size={24} color="rgb(0,140,255)"/></IconDiv>
        </>
    )
};


export default CallAndSms;