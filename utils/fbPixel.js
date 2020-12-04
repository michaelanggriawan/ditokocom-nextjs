import ReactPixel from 'react-facebook-pixel';

function fbpixel() {
    ReactPixel.init('632671113572547');

    ReactPixel.pageView();
}

export default fbpixel