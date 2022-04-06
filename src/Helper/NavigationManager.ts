import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

const NavigationManager = {
    navigator: null as NavigationContainerRef | null,

    setTopLevelNavigator(navigatorRef: NavigationContainerRef | null) {
        this.navigator = navigatorRef;
    },

    navigate(routeName: any, params?: any) {
        this.navigator!.dispatch(
            CommonActions.navigate({
                name: routeName,
                params: params,
            }),
        );
    },

    navigateAndClear(routeName: any, params?: any) {
        this.navigator!.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: routeName,
                        params: params,
                    },
                ],
            }),
        );
    },

    goBack() {
        this.navigator!.dispatch(CommonActions.goBack());
    },
};

export default NavigationManager;
