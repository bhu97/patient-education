import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View , Image} from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import { UserModel } from '../../Model/UserModel';
import { setSelectedLanguage } from '../../Redux/app-data/appDataSlice';
import { setIsCountrySelected, setUserModelData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { dispatchState } from '../../Redux/store';
import Images from '../../Theme/Images';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import { style } from './style';

interface CustomLanguageHeaderProps {
    languageList: any;
    iconName: string;
    labelText: string;
    headerText?: string;
    selectedLanguage: string;
    onPressItem:(text?:string)=>void;
    isToolTipEnable?:boolean;
    setIsCountrySelected: (boolean) => void;
}
interface CustomLanguageHeaderState {
    visible: boolean;
}
class CustomLanguageHeader extends PureComponent<CustomLanguageHeaderProps, CustomLanguageHeaderState> {
    constructor(props: CustomLanguageHeaderProps) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    componentDidMount(): void {
        // this.setState({ selectedLanguage: this.props.selectedLanguage });
    }
    insideToolTip() {        
        return (        
                <Text style={style.textStyle}>{this.props.selectedLanguage}</Text>
        );
    }

    closeToolTip = () => {
        this.setState({ visible: false });
    };

    getSelectedDataFromToolTip = (item: any) => {
        this.setState({ visible: false });
        dispatchState(setSelectedLanguage(item));        
        this.props.onPressItem(item)  
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
                        {this.props.languageList.indexOf(this.props.selectedLanguage)!=0 && this.state.visible == false ? (
                            <Text style={style.textStyle}>{this.props.labelText}</Text>
                        ) : (
                            <CustomToolTip
                                insideToolTip={this.insideToolTip()}
                                isVisible={this.state.visible}
                                model={this.props.languageList}
                                onPressOfToolTipItem={this.getSelectedDataFromToolTip}
                                closeToolTip={this.closeToolTip}
                                isLanguageList
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
   

});
const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CustomLanguageHeader);
