import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import MoreInfoList from '../../Components/more-info-list/more-info-list';
import ThumbnailGridView from '../../Components/thumbnail-grid-view/thumbnail-grid-view';
import { BaseLocalization } from '../../Helper/Localization/BaseLocalization';
import NavigationManager from '../../Helper/NavigationManager';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { setGridViewData } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface CategoryDetailScreenProps {
    detailsTitle: string;
    mainTitle: string;
    categoryTitle: string;
    subCategoryTitle: string;
    setGridViewList: () => void;
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
}

interface CategoryDetailScreenState {}

class CategoryDetailScreen extends PureComponent<CategoryDetailScreenProps, CategoryDetailScreenState> {
    constructor(props: CategoryDetailScreenProps) {
        super(props);
    }

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    gotoCategoryScreen = () => {
        NavigationManager.navigateAndClear('CategoryScreen');
    };

    goBack = () => {
        NavigationManager.goBack();
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.detailsTitle} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.mainContainer}>
                        <View style={style.fileContainer}>
                            <ThumbnailGridView gridViewList={this.props.gridViewData} />
                        </View>
                        <View style={style.moreInfoContainer}>
                            <MoreInfoList
                                title={BaseLocalization.moreInfoTitle}
                                moreInfoList={this.props.moreInfoData}
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <CustomBottomContainer>
                        <View style={style.botomView}>
                            <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.goToHomeScreen} />
                            <CustomBredcrum title={this.props.mainTitle} onPress={this.gotoCategoryScreen} />
                            <CustomBredcrum title={this.props.categoryTitle} onPress={this.goBack} />
                            <CustomBredcrum title={this.props.detailsTitle} />
                        </View>
                    </CustomBottomContainer>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    detailsTitle: state.catagoryReducer.categoryDetailTitle,
    categoryTitle: state.catagoryReducer.subCategoryTitle,
    mainTitle: state.catagoryReducer.categoryTitle,
    gridViewData: state.catagoryReducer.gridViewData,
    moreInfoData: state.catagoryReducer.moreInfoData,
});

const mapDispatchToProps = (dispatch: any) => ({
    setGridViewList: () => {
        dispatch(setGridViewData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreen);
