import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';

const NavigationManager = {
    navigator: null as NavigationContainerRef<{}> | null,

    /**
     * Set To navigation when app starts
     * @param navigatorRef : refere from starting point of App
     */
    setTopLevelNavigator(navigatorRef: NavigationContainerRef<{}> | null) {
        this.navigator = navigatorRef;
    },

    /**
     * Navigate to next screen
     * @param routeName : screen name to navigate
     * @param params : if any params required for that screen
     */
    navigate(routeName: any, params?: any) {
        this.navigator!.dispatch(
            CommonActions.navigate({
                name: routeName,
                params: params,
            }),
        );
    },

    /**
     * Navigate to specific screen by clearing stack
     * @param routeName : screen name to navigate
     * @param params : if any params required for that screen
     */
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

    /**
     * Navigate back to previous screen
     */
    goBack() {
        this.navigator!.dispatch(CommonActions.goBack());
    },

    /**
     * Remove the screen using index and move to next screen
     * @param routeName
     * @param removeScreenIndex
     */
    navigatePop(routeName: any, removeScreenIndex: number) {
        this.navigator!.dispatch(StackActions.pop(removeScreenIndex));
        this.navigate(routeName);
    },

    /**
     * To replace current screen form the next screen, after using this previous screen will not be present in stack
     * @param routeName Screen name
     */
    navigateAndReplace(routeName: any, params?: any) {
        this.navigator!.dispatch(StackActions.replace(routeName, params));
    },

    /**
     * To pop to the screen
     * @param count
     */
    pop(count: number) {
        this.navigator!.dispatch(StackActions.pop(count));
    },
};

export default NavigationManager;
