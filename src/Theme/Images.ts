/// ################################ Implementation ################################

/**
 * -----------------------------------------------------------------
 *    @file styles/images.ts
 *    @since 21.03.2021
 *    @summary Local image ressource accessor
 *    @description Provides access to all images that are included
 *    in the local applictation bundle.
 *    @author Sebastian Riga
 *    <p>
 *        @fileoverview Images are loaded from the asset folder
 *        through a js native require call.
 *    </p>
 *
 *    <p>
 *        Revision History:
 *        Name:           Date:        Description:
 *    </p>
 * -----------------------------------------------------------------
 */
const prefix = '../../assets/images/';
const Images = {
    /**
     * The Fresenius Netcare GmbH logo.
     * @type png
     */
    superSignLogoWhite: require(prefix + 'super_sign_logo.png'),
    topNavImageSettingScreen: require(prefix + 'setting_image.png'),
    illuHome: require(prefix + 'illu_home.png'),
    menuBlueDots: require(prefix + 'menu_blue_dots.png'),
    rightArrow: require(prefix + 'chevron_right.png'),
    emptyImg: require(prefix + 'empty.png'),
    favoritesHeaderImg: require(prefix + 'illu_favorites.png'),
    emptyThumbnail: require(prefix + 'empty_thumbnail.png'),
    favouritesListImage: require(prefix + 'circle_list.png'),
    favouritesListNavImage: require(prefix + 'chevron_right_deepblue.png'),
    backArrowImage: require(prefix + 'arrow_back.png'),
    detailImage: require(prefix + 'illu_content.png'),
    loaderImage: require(prefix + 'loader.png'),
    launchScreen: require(prefix + 'launch_screen.png'),
    circleDocument: require(prefix + 'circle_document.png'),
    circleEditCountry: require(prefix + 'circle_edit_country.png'),
    circleFolder: require(prefix + 'circle_folder.png'),
    circleMail: require(prefix + 'circle_mail.png'),
    circleUpdate: require(prefix + 'circle_update.png'),
    favoritesFilled: require(prefix + 'favorites_filled.png'),
    favorites: require(prefix + 'favorites.png'),
    homeFilled:  require(prefix + 'home_filled.png'),
    settingsFilled: require(prefix + 'settings_filled.png'),
    settings: require(prefix + 'settings.png'),
    squarePlus: require(prefix + 'square_plus.png'),
    deleteList: require(prefix + 'circle-x.png'),
    editList: require(prefix + 'edit.png'),
    download: require(prefix + 'download.png'),
    home: require(prefix + 'home.png'),
    logout: require(prefix + 'logout.png'),
    trash: require(prefix + 'trash.png'),
    file: require(prefix + 'file.png'),
    dots: require(prefix + 'dots.png'),
};

/// ################################ Export ################################

export default Images;

/// ################################ EOF ################################
