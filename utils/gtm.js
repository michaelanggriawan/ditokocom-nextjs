import TagManager from 'react-gtm-module'

function gtm () {
    const tagManagerArgs = {
        gtmId: 'GTM-5HP6DD7',
        events: {
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        }
    }

    TagManager.initialize(tagManagerArgs)

}

export default gtm
 
