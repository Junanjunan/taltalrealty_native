import { View, TitleText } from "./Table"

export const BookTitle = ({props}) => {
    function checkTitle(){
        if(props.route.name.includes("Villa")){
            return "빌라(주택)"
        } else if(props.route.name.includes("Apartment")){
            return "아파트"
        } else if(props.route.name.includes("Officetel")){
            return "오피스텔"
        } else if(props.route.name.includes("Store")){
            return "상가"
        } else if(props.route.name.includes("Building")){
            return "건물"
        }
    };

    function checkType(){
        if(props.route.name.includes("Deal")){
            return "매매"
        } else if(props.route.name.includes("Lease")){
            return "임대"
        }
    }
    return(
        <View>
            <TitleText>
                {checkTitle()}
                [{checkType()}]
            </TitleText>
        </View>
    );
}