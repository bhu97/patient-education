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
const images = {
    /**
     * The Fresenius Netcare GmbH logo.
     * @type png
     */
    superSignLogoWhite: require('../Assets/Supersign_Logo_white.png'),
};

/// ################################ Export ################################

export default images;

/// ################################ EOF ################################
