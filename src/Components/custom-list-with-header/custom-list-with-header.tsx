import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import { UserModel } from '../../Model/UserModel';
import { setUserModelData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import CustomIcon from '../custom-icon/custom-icon';
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
            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                <Text style={style.textStyle}>{this.state.selectedCountry}</Text>
            </TouchableOpacity>
        );
    }

    closeToolTip = () => {
        this.setState({ visible: false });
    };

    getSelectedDataFromToolTip = (item: any) => {
        dbHelper.createUser(item);
        this.props.setUserModelData(item);
        this.setState({ selectedCountry: item.countryTitle });
        this.setState({ visible: false });
    };
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressItem}>
            <View style={style.mainContainer}>
                {this.props.headerText && (
                    <View style={style.headerTextContainer}>
                        <Text style={style.headerTextStyle}>{this.props.headerText}</Text>
                    </View>
                )}
                <View style={style.itemContainer}>
                    <View style={style.circleIconContainer}>
                        <CustomIcon name={this.props.iconName} size={20} />
                    </View>

                    <View style={style.textContainer}>
                        {this.props.labelText != 'Master' && this.state.visible == false ? (
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
                    <View style={style.iconContainer}>
                        <CustomIcon name={'chevron-right'} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomListWithHeader);
