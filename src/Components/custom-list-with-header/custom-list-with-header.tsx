import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View , Image} from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import { UserModel } from '../../Model/UserModel';
import { setIsCountrySelected, setUserModelData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import { style } from './style';

interface CustomListWithHeaderProps {
    countryList: any;
    iconName: string;
    labelText: string;
    headerText?: string;
    selectedCountry: string;
    userData: UserModel[];
    setUserModelData: (data: UserModel[]) => void;
    onPressItem:()=>void;
    isToolTipEnable?:boolean;
    setIsCountrySelected: (boolean) => void;
}
interface CustomListWithHeaderState {
    visible: boolean;
    selectedCountry: string;
}
class CustomListWithHeader extends PureComponent<CustomListWithHeaderProps, CustomListWithHeaderState> {
    constructor(props: CustomListWithHeaderProps) {
        super(props);
        this.state = {
            visible: false,
            selectedCountry: '',
        };
    }
    componentDidMount(): void {
        this.setState({ selectedCountry: this.props.selectedCountry });
    }
    insideToolTip() {
        return (        
                <Text style={style.textStyle}>{this.state.selectedCountry}</Text>
        );
    }

    closeToolTip = () => {
        this.setState({ visible: false });
    };

    getSelectedDataFromToolTip = (item: any) => {
        dbHelper.createUser(item);
        this.props.setUserModelData(item);
        this.setState({ selectedCountry: item.countryTitle, visible: false });
        this.props.setIsCountrySelected(true);
    };
 
    onPressItem=()=>{
        if(this.props.isToolTipEnable){
            this.setState({visible:true})
        }else{
            this.props.onPressItem && this.props.onPressItem()  
        }
        
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPressItem}>
            <View style={style.mainContainer}>
                {this.props.headerText && (
                    <View style={style.headerTextContainer}>
                        <Text style={style.headerTextStyle}>{this.props.headerText}</Text>
                    </View>
                )}
                <View style={style.itemContainer}>
                    <View style={style.circleIconContainer}>
                        <Image style={{ height: 30, width: 30 }} source={this.props.iconName} />
                    </View>

                    <View style={style.textContainer}>
                        {this.props.countryList.indexOf(this.state.selectedCountry)!=0 && this.state.visible == false ? (
                            <Text style={style.textStyle}>{this.props.labelText}</Text>
                        ) : (
                            <CustomToolTip
                                insideToolTip={this.insideToolTip()}
                                isVisible={this.state.visible}
                                model={this.props.countryList}
                                onPressOfToolTipItem={this.getSelectedDataFromToolTip}
                                closeToolTip={this.closeToolTip}
                                isCountryList
                                position='right'
                            />
                        )}
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    countryList: state.categoryReducer.countryListData,
    userData: state.categoryReducer.userModelData,
    selectedCountry: state.categoryReducer.selectedCountry,
});
const mapDispatchToProps = (dispatch: any) => ({
    setUserModelData: (value: UserModel[]) => {
        dispatch(setUserModelData(value));
    },
    setIsCountrySelected: (value : boolean) => {
        dispatch(setIsCountrySelected(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomListWithHeader);
