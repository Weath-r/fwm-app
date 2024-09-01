# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.6.0 (2024-09-01)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

### 1.5.2 (2024-07-17)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

### 1.5.1 (2024-07-16)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

## 1.5.0 (2024-07-15)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

### 1.4.2 (2024-06-26)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

### 1.4.1 (2024-06-26)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

## 1.4.0 (2024-06-17)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))

## 1.3.0 (2024-06-02)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))

## 1.2.0 (2024-06-02)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))

## 1.1.0 (2024-02-20)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **assetsHandling:** Remove local assets for weather conditions. Assets are now handled by the BE service. FWM-42 ([8f9a418](https://github.com/Virtuosofriend/fwm-app/commit/8f9a41897a04a7386e529bce5e01c7ce9dcc2145))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **providerCleanup:** Limit StationsProvider logic to handle only the stations by untroducing a new appStore. FWM-34 ([0c9bd5a](https://github.com/Virtuosofriend/fwm-app/commit/0c9bd5a2937a52c0aa5b62a6bedbdb51f51e6a90))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))

## 1.0.0 (2023-12-28)


### Features

* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))


### Bug Fixes

* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))


## 0.6.0 (2023-11-13)


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))


### Tasks

* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
