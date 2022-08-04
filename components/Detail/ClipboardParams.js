import * as Clipboard from 'expo-clipboard';
import { Share } from "react-native";
import api from '../../api';


export function getProfile(id){
    var profileData;
    profileData = api.profile(id);
    return profileData;
};

export async function onShare(share){
    try{
        await Share.share({message: share});
    } catch(e){
        console.warn(e);
    }
};

export async function copyToClipboard ({
    props, address, room, bath, price, deposit, month_fee, management_fee,
    birth, area_m2, total_area_m2, land_m2, parking, empty, elevator,
    loan, owner_phone, tenant_phone, description,
    floor_top, floor_bottom, land_type, land_m2_building, parking_number, 
    building_area_m2, total_floor_area_m2, total_floor_area_m2_for_ratio, building_coverage, floor_area_ratio,
}){
    getProfile(props.id).then(
        results => {
            var office = results.data.office;
            var tel = results.data.tel;
            const Params = `
                ${address ? `주소: ${props.route.params.address},\n` : ""}
                ${room ? `방: ${props.route.params.room},\n` : ""}
                ${bath ? `화장실: ${props.route.params.bath ? props.route.params.bath : 0},\n` : ""}
                ${price ? `매매가: ${props.route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원,\n` : ""}
                ${floor_top ? `지상층: ${props.route.params.floor_top ? props.route.params.floor_top : "" },\n` : ""}
                ${floor_bottom ? `지하층: ${props.route.params.floor_bottom ? props.route.params.floor_bottom : "" },\n` : ""}
                ${deposit ? `보증금: ${props.route.params.deposit ? props.route.params.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원,\n` : ""}
                ${month_fee ? `월세: ${props.route.params.month_fee ? props.route.params.month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원,\n` : ""}
                ${management_fee ? `관리비: ${props.route.params.management_fee ? props.route.params.management_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원,\n` : ""}
                ${birth ? `준공: ${props.route.params.birth},\n` : ""}
                ${area_m2 ? `전용면적: ${props.route.params.area_m2}㎡,\n` : ""}
                ${total_area_m2 ? `공급면적: ${props.route.params.total_area_m2 ? props.route.params.total_area_m2 : 0}㎡,\n` : ""}
                ${land_m2 ? `대지지분: ${props.route.params.land_m2 ? props.route.params.land_m2 : 0}㎡,\n` : ""}
                ${land_type ? `토지종류: ${props.route.params.land_type ? props.route.params.land_type : "" },\n` : ""}
                ${land_m2_building ? `토지면적: ${props.route.params.land_m2_building ? props.route.params.land_m2_building : "" }㎡,\n` : ""}
                ${building_area_m2 ? `건축면적: ${props.route.params.building_area_m2 ? props.route.params.building_area_m2 : "" }㎡,\n` : ""}
                ${total_floor_area_m2 ? `연면적: ${props.route.params.total_floor_area_m2 ? props.route.params.total_floor_area_m2 : "" }㎡,\n` : ""}
                ${total_floor_area_m2_for_ratio ? `연면적(용적률): ${props.route.params.total_floor_area_m2_for_ratio ? props.route.params.total_floor_area_m2_for_ratio : "" }㎡,\n` : ""}
                ${building_coverage ? `건폐율: ${props.route.params.building_coverage ? props.route.params.building_coverage : "" }%,\n` : ""}
                ${floor_area_ratio ? `용적률: ${props.route.params.floor_area_ratio ? props.route.params.floor_area_ratio : "" }%,\n` : ""}
                ${parking_number ? `주차대수: ${props.route.params.parking_number ? props.route.params.parking_number : "" },\n` : ""}
                ${parking ? `주차가능: ${props.route.params.parking ? "O" : "X"},\n` : ""}
                ${empty ? `공실: ${props.route.params.empty ? "O" : "X"},\n` : ""}
                ${elevator ? `승강기: ${props.route.params.elevator ? "O" : "X"},\n` : ""}
                ${loan ? `대출: ${props.route.params.loan ? "O" : "X"},\n` : ""}
                ${owner_phone ? `소유자: ${props.route.params.owner_phone ? props.route.params.owner_phone : ""},\n` : ""}
                ${tenant_phone ? `세입자: ${props.route.params.tenant_phone ? props.route.params.tenant_phone : ""},\n` : ""}
                ${description ? `상세설명: ${props.route.params.description ? props.route.params.description : "" },\n` : ""}
                ${office ? `\n${office}` : ""}
                ${tel ? `\n연락처: ${tel}` : ""}
            `;
            Clipboard.setStringAsync(Params);
            return Params;
        }
    ).then(
        results => onShare(results)
    )
};