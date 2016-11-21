/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

const views = {
    get HomeView() { return require('../../views/HomeView'); },
    get EmptyView() { return require('../../views/EmptyView'); },
    get LoadingView() { return require('../../views/LoadingView'); },
    get CarouselView() { return require('../../views/CarouselView'); },
    get CategoryView() { return require('../../views/CategoryView'); },
    get CategoryChildView() { return require('../../views/CategoryChildView'); },
    get QRScannerView() { return require('../../views/QRScannerView'); },
    get EventListView() { return require('../../views/EventListView'); },
    get WelcomeView() { return require('../../views/WelcomeView'); },
    get SignupView() { return require('../../views/SignupView'); },
    get LoginView() { return require('../../views/LoginView'); },
    get SettingsView() { return require('../../views/SettingsView'); },
    get ProfileView() { return require('../../views/ProfileView'); },
    get LanguagesView() { return require('../../views/LanguagesView'); },
    get NewEventView() { return require('../../views/NewEventView'); },
    get LocationSelectorView() { return require('../../views/LocationSelectorView'); },
    get ChildLocationSelectorView() { return require('../../views/ChildLocationSelectorView'); },
    get CategorySelectorView() { return require('../../views/CategorySelectorView'); },
    get EventEditView() { return require('../../views/EventEditView'); },
    get DraftView() { return require('../../views/DraftView'); },
    get AddressSelectorView() { return require('../../views/AddressSelectorView'); },
    get MyEventListView() { return require('../../views/MyEventListView'); },
    get QRViewer() { return require('../../views/QRViewer'); },
    get UserSearchView() { return require('../../views/UserSearchView'); },
    get MessagesView() { return require('../../views/MessagesView'); },
    get PopupView() { return require('../../views/PopupView'); }
};

module.exports = views;
