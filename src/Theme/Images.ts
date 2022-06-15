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
    favouritesListImage:require(prefix + 'circle_list.png'),
    favouritesListNavImage:require(prefix + 'chevron_right_deepblue.png'),
    backArrowImage:require(prefix + 'arrow_back.png'),
    detailImage:require(prefix + 'illu_content.png'),
    loaderImage:require(prefix + 'loader.png'),
};

/// ################################ Export ################################

export default Images;

/// ################################ EOF ################################
