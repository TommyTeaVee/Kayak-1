import * as Constants from '../constants/constants'

export function signIn(action) {

    return {
        type: Constants.SIGN_IN,
        payload: action
    }
}


export function flightSearch(flights) {

    return {
        type : Constants.SEARCH_FLIGHT,
        flightSearchResults : flights
    }
};


export function hotelSearch(hotels) {

    return {
        type : Constants.SEARCH_HOTEL,
        hotelSearchResults : hotels
    }
};


export function carSearch(cars) {

    return {
        type : Constants.SEARCH_CAR,
        carSearchResults : cars
    }
};

export function getVendors(vendors) {

    return {
        type : Constants.GET_VENDORS,
        vendors : vendors
    }
};

export function addVendor(vendor) {

    return {
        type : Constants.ADD_VENDOR,
        vendor : vendor
    }
};

export function deleteVendor(index) {

    return {
        type : Constants.DELETE_VENDOR,
        index : index
    }
};

export function bookFlight(index) {

    return {
        type : Constants.BOOK_FLIGHT,
        index : index
    }
};

export function bookHotel(index) {

    return {
        type : Constants.BOOK_HOTEL,
        index : index
    }
};

export function bookCar(index) {

    return {
        type : Constants.BOOK_CAR,
        index : index
    }
};
