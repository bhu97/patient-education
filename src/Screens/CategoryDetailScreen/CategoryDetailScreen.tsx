import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import ThumbnailGridView from '../../Components/thumbnail-grid-view/thumbnail-grid-view';
import NavigationManager from '../../Helper/NavigationManager';
import { GridViewModel } from '../../Model/GridViewModel';
import Images from '../../Theme/Images';
import { style } from './style';


interface CategoryDetailScreenProps { }

interface CategoryDetailScreenState {
    dummyData: GridViewModel[],
}

class CategoryDetailScreen extends PureComponent<CategoryDetailScreenProps, CategoryDetailScreenState> {
    constructor(props: CategoryDetailScreenProps) {
        super(props);


        this.state = {
            dummyData: [],
        };

    }

    componentDidMount() {
        let dummyImages = [];
        const labelText = ['GDP Fluids', 'Balance Overview1 Balance Overview2 Balance Overview3', 'ABD dffsdf sdfdf dsf', 'DEF asf asjfh  ', 'GHI asd asd', 'Jkl', 'AB', 'AB']
        const fileSize = ['64 KB', '12 KB', '16KB', '24KB', '8KB', '20KB', '2 KB', '14 KB']

        for (let i = 0; i < 8; i++) {
            dummyImages.push({ source: Images.illuHome, labelText: labelText[i], fileSize: fileSize[i] });
        }
        this.setState({ dummyData: dummyImages });
    }

    onClickBredcrum1 = () => {
        Alert.alert('on Click Bredcrum 1');
    };

    goBack = () => {
        NavigationManager.goBack();
    };

    render() {
        return (
            <MainContainer>

                <CustomTopNav back subTitle={'category detail screen'} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.mainContainer}>
                        <View style={style.fileConatiner}>
                            <ThumbnailGridView
                                gridViewData={this.state.dummyData}
                            />
                        </View>
                        <View style={style.moreInfoConatiner}>

                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <CustomBottomContainer>
                        <View style={style.botomView}>
                            <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onClickBredcrum1} />
                        </View>
                    </CustomBottomContainer>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

export default CategoryDetailScreen;

