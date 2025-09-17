# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.11.3 (2025-09-17)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **i18n:** Add Greek language to the app. FWM-94 ([2469f6b](https://github.com/Virtuosofriend/fwm-app/commit/2469f6bd4b25d79c269b32bad10eec78e1e5c775))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **fthiotidaMeteogroup:** Fix wind icon. FWM-101 ([539aa91](https://github.com/Virtuosofriend/fwm-app/commit/539aa9111d360b99c1f8f9a533ad81c1c1c19f18))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **individualStationPage:** Add loading status for individual station page. FWM-104 ([569b1d8](https://github.com/Virtuosofriend/fwm-app/commit/569b1d852b7714b98774095b0acfdb4e977edd8e))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **seo:** Sitemaps support for greek language. FWM-103 ([6791f6a](https://github.com/Virtuosofriend/fwm-app/commit/6791f6a7575df1ab5a48a9d66a4d256ae16f2a39))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dialog:** Improvements to dialog ([76940a8](https://github.com/Virtuosofriend/fwm-app/commit/76940a82e34acc2ad91c994ee4d5d617f2609df5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **fthiotidaforecasts:** Enhancements for Fthiotida forecasts page. FWM-101 ([0dfef79](https://github.com/Virtuosofriend/fwm-app/commit/0dfef79b612d800470f180582dbfdd728ebd709c))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.11.2 (2025-09-12)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **i18n:** Add Greek language to the app. FWM-94 ([2469f6b](https://github.com/Virtuosofriend/fwm-app/commit/2469f6bd4b25d79c269b32bad10eec78e1e5c775))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **fthiotidaMeteogroup:** Fix wind icon. FWM-101 ([539aa91](https://github.com/Virtuosofriend/fwm-app/commit/539aa9111d360b99c1f8f9a533ad81c1c1c19f18))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **individualStationPage:** Add loading status for individual station page. FWM-104 ([569b1d8](https://github.com/Virtuosofriend/fwm-app/commit/569b1d852b7714b98774095b0acfdb4e977edd8e))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **seo:** Sitemaps support for greek language. FWM-103 ([6791f6a](https://github.com/Virtuosofriend/fwm-app/commit/6791f6a7575df1ab5a48a9d66a4d256ae16f2a39))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **fthiotidaforecasts:** Enhancements for Fthiotida forecasts page. FWM-101 ([0dfef79](https://github.com/Virtuosofriend/fwm-app/commit/0dfef79b612d800470f180582dbfdd728ebd709c))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.11.1 (2025-09-12)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **i18n:** Add Greek language to the app. FWM-94 ([2469f6b](https://github.com/Virtuosofriend/fwm-app/commit/2469f6bd4b25d79c269b32bad10eec78e1e5c775))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **fthiotidaMeteogroup:** Fix wind icon. FWM-101 ([539aa91](https://github.com/Virtuosofriend/fwm-app/commit/539aa9111d360b99c1f8f9a533ad81c1c1c19f18))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **seo:** Sitemaps support for greek language. FWM-103 ([6791f6a](https://github.com/Virtuosofriend/fwm-app/commit/6791f6a7575df1ab5a48a9d66a4d256ae16f2a39))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **fthiotidaforecasts:** Enhancements for Fthiotida forecasts page. FWM-101 ([0dfef79](https://github.com/Virtuosofriend/fwm-app/commit/0dfef79b612d800470f180582dbfdd728ebd709c))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

## 1.11.0 (2025-09-11)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **i18n:** Add Greek language to the app. FWM-94 ([2469f6b](https://github.com/Virtuosofriend/fwm-app/commit/2469f6bd4b25d79c269b32bad10eec78e1e5c775))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **fthiotidaMeteogroup:** Fix wind icon. FWM-101 ([539aa91](https://github.com/Virtuosofriend/fwm-app/commit/539aa9111d360b99c1f8f9a533ad81c1c1c19f18))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **fthiotidaforecasts:** Enhancements for Fthiotida forecasts page. FWM-101 ([0dfef79](https://github.com/Virtuosofriend/fwm-app/commit/0dfef79b612d800470f180582dbfdd728ebd709c))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.10.2 (2025-09-03)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **fthiotidaMeteogroup:** Fix wind icon. FWM-101 ([539aa91](https://github.com/Virtuosofriend/fwm-app/commit/539aa9111d360b99c1f8f9a533ad81c1c1c19f18))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **fthiotidaforecasts:** Enhancements for Fthiotida forecasts page. FWM-101 ([0dfef79](https://github.com/Virtuosofriend/fwm-app/commit/0dfef79b612d800470f180582dbfdd728ebd709c))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.10.1 (2025-08-27)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

## 1.10.0 (2025-08-25)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **forecast:** Add Fthiotida meteogroup forecast to a new page. FWM-100 ([b408ecf](https://github.com/Virtuosofriend/fwm-app/commit/b408ecf05f8ea3f9235af440b95b832fb4f7d4cb))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([9541107](https://github.com/Virtuosofriend/fwm-app/commit/9541107e5ec89d1662a8ae64340750e79d769999))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.9.3 (2025-07-31)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))
* **warnings:** Fix wrong user on warning panels ([973f739](https://github.com/Virtuosofriend/fwm-app/commit/973f73904a13fab469a59bf5e1fed13eba2a2f0f))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.9.2 (2025-05-15)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **packages:** Remove headlessUI and refactor the relevant components. FWM-99 ([26993e4](https://github.com/Virtuosofriend/fwm-app/commit/26993e4253c6022e22c13c0271829085d456a70a))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.9.1 (2025-04-27)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assets:** Fix header logo ([17010e8](https://github.com/Virtuosofriend/fwm-app/commit/17010e83f094a7da8044615f7f0cf7a9aea88d88))
* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

## 1.9.0 (2025-04-27)


### Features

* **app:** Remove multiple modals and introduce radix dialog. FWM-98 ([6a8f849](https://github.com/Virtuosofriend/fwm-app/commit/6a8f849976f65c4910408e3b9a90a1cda399c2d3))
* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.8.11 (2025-04-05)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **assetsHandling:** Change Next configuration for assets ([da01089](https://github.com/Virtuosofriend/fwm-app/commit/da01089b2cd799f5c512817a41f6246d4195c419))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))
* **weatherModal:** Prevent redirection when no url is provided. FWM-97 ([b829b58](https://github.com/Virtuosofriend/fwm-app/commit/b829b58318fcdc08b4fcfdce373d1ac04bfc8a8a))

### 1.8.10 (2025-04-04)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **forecastModal:** Respect configuration switch for forecast. Change schema. FWM-96 ([edf5406](https://github.com/Virtuosofriend/fwm-app/commit/edf540661d6e4cf0087e378914a8542868f9f2f2))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.9 (2025-03-23)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.8 (2025-03-16)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.7 (2025-03-16)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **aboutUs:** Create about us page. FWM-93 ([029c5df](https://github.com/Virtuosofriend/fwm-app/commit/029c5df8ec8c09492079f68acbc9f674e0180a2e))
* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.6 (2025-03-15)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **seo:** Improve SEO for individual station page. ([04ee949](https://github.com/Virtuosofriend/fwm-app/commit/04ee949f5e729b5658d280262d0a52d78486d75d))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.5 (2025-03-10)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **stationModal:** Fix modal not opening when no forecast was available. FWM-90 ([15c18fb](https://github.com/Virtuosofriend/fwm-app/commit/15c18fbf07653d1f5053f17b5cc030eeaec96c2c))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **stationPage:** Add back button in station page. FWM-92 ([3b58182](https://github.com/Virtuosofriend/fwm-app/commit/3b581824eb5211c1de3987c72596746fc5dc0420))
* **stations:** Add navigation option from weather stations to individual station page. FWM-91 ([45ed86c](https://github.com/Virtuosofriend/fwm-app/commit/45ed86cf5b59b8f0e1df0fad1b3b455bef445bd9))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.4 (2025-02-02)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **forecast:** Change to IconEu model. FWM-87 ([988ecdc](https://github.com/Virtuosofriend/fwm-app/commit/988ecdc5a2e38697036b9c771fe94fba6d1b27b9))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.3 (2024-12-27)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))
* **warnings:** Change z-index of layer menu. FWM-86 ([eb14289](https://github.com/Virtuosofriend/fwm-app/commit/eb142890ab9ba5bc09a5b4466b49d049c9822a8e))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.2 (2024-12-23)


### Features

* **favouriteStations:** Enable users select their favourite stations and filter them ([36a5d22](https://github.com/Virtuosofriend/fwm-app/commit/36a5d224d6d457b5f38871dfe5883188c7d87b42))
* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))
* **search-form:** Clear search form when closing station modal [#80](https://github.com/Weath-r/fwm-app/issues/80) ([e3aa579](https://github.com/Virtuosofriend/fwm-app/commit/e3aa579cde3d0400e2734b1d3529b0657db80fb1))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))
* **warnings:** Revamp UI for warnings. Add Layers menu for all map options. FWM-82 ([93e628d](https://github.com/Virtuosofriend/fwm-app/commit/93e628d5a0794e4a53b2c7b0595f389bdb168eea))

### 1.8.1 (2024-10-21)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **homepageMap:** Add legend for temperature layer. Adjust colors for the layer. FWM-79 ([e852ece](https://github.com/Virtuosofriend/fwm-app/commit/e852ece7b9b7e1c9b3c6d388540cab88f84451e4))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

## 1.8.0 (2024-10-18)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **homepageMap:** Add Temperature forecast layer. FWM-78 ([a9b93dd](https://github.com/Virtuosofriend/fwm-app/commit/a9b93ddaf28ba39d2415085e1b6c9f169c4467f5))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

### 1.7.1 (2024-10-12)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


### Bug Fixes

* **baseModal:** Fix modal's behavior on closing. FWM-10 ([c8530ca](https://github.com/Virtuosofriend/fwm-app/commit/c8530cad6618a56756d8336b84171146343a4a8d))
* **baseModal:** Fix modal's behavior on closing. FWM-10 ([342e87b](https://github.com/Virtuosofriend/fwm-app/commit/342e87b197f2529c315c763ff7d62f90ed871bd9))
* **forecast:** Handle last forecast entry for today tab. FWM-61 ([ec818ee](https://github.com/Virtuosofriend/fwm-app/commit/ec818eeb7dfe6be7c23b1621dd7f48581907d3d1))
* **forecast:** Modal fixes for mobile use. ([466f432](https://github.com/Virtuosofriend/fwm-app/commit/466f43205601ff652421c0a3c3c4d08e332c98c7))
* **homepageMap:** Wind forecast controls where hiding in mobile view. FWM-55 ([549b9ca](https://github.com/Virtuosofriend/fwm-app/commit/549b9ca88e62618eb1312a66fb6ba47bec640ec6))
* **housekeeping:** Cleared some logic from baseMap component to be more generic ([e42e5ba](https://github.com/Virtuosofriend/fwm-app/commit/e42e5bad7b8bf8ddd25233afc4d3d78329b29994))


### Tasks

* **addingTypes:** Introduce new types and clean up existing ones. FWM-22 ([ac0dfc8](https://github.com/Virtuosofriend/fwm-app/commit/ac0dfc80d19587f2f142a58570d142cab33be125))
* **analytics:** Integrate PostHog in the project. FWM-62 ([7808c98](https://github.com/Virtuosofriend/fwm-app/commit/7808c98734a2244670ae954e556ce56652e318b0))
* **changelog:** Add changelog module. FWM-20 ([a745516](https://github.com/Virtuosofriend/fwm-app/commit/a7455168f52d939f2d816a8204ef338459bcdec5))
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **homepage:** Moved map controls to page to resolve event propagation. Slider component replaced with radix-ui slider. FWM-77 ([35fd8e6](https://github.com/Virtuosofriend/fwm-app/commit/35fd8e62c6e900551119e9dbbf6192b46344d493))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

## 1.7.0 (2024-10-06)


### Features

* **forecast:** Add forecast to station modal. FWM-59 ([1d59d50](https://github.com/Virtuosofriend/fwm-app/commit/1d59d508505258c9b096ad09e62f2086af7d4fa3))
* **markersClustering:** Add clustering for markers on the map. FMW-18 ([2bee7d0](https://github.com/Virtuosofriend/fwm-app/commit/2bee7d08bb5474999a20e1a07a4555cff46cb09b))
* **Search:** Create Search stations component for Homepage map. FWM-65 ([f03d18f](https://github.com/Virtuosofriend/fwm-app/commit/f03d18fe1c739108e1940bab4a855ac897a0d283))
* **standAloneStationPage:** Create individual station page with more details. FWM-68 ([f63d562](https://github.com/Virtuosofriend/fwm-app/commit/f63d562eabb6b8c2dcd8c120fd6ae2650e8c4205))
* **stationModal:** Add loading state. Create loading common spinner. FWM-40 ([942160f](https://github.com/Virtuosofriend/fwm-app/commit/942160f3608a3ec02d796c91a94d337cc5237935))
* **stationsTable:** Create stations table with sorting capabilities. FWM-44 ([#37](https://github.com/Weath-r/fwm-app/issues/37)) ([08b5125](https://github.com/Virtuosofriend/fwm-app/commit/08b51250b66f5623f10354adfbdb54b4a95bf368))
* **warnings:** Add warnings in the application. FWM-55 ([e94c5df](https://github.com/Virtuosofriend/fwm-app/commit/e94c5df0f7cad808035e7a33befae02ef112ea52))
* **warningsPage:** Create dedicated warnings page. Move all the time&date functions to a new utils file for clarity. Update all the previous instances. FWM-58 ([0cf0db3](https://github.com/Virtuosofriend/fwm-app/commit/0cf0db3a6338bbc711663807aa1757f743538d95))
* **windForecastLayer:** Wind forecast layer using velocity added on the homepage map. FWM-74 ([3c7ff36](https://github.com/Virtuosofriend/fwm-app/commit/3c7ff360ff723e96c32b6b56826e92285151ca22))


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
* **dx:** Add Zod for endpoint responses validation. FWM-71 ([1dfe039](https://github.com/Virtuosofriend/fwm-app/commit/1dfe03907d5ecc3dc74d92dc425c2f676447245a))
* **EsLint:** Linter, Prettier and husky added to the project. ([6b8ad1f](https://github.com/Virtuosofriend/fwm-app/commit/6b8ad1ffe4e7258e526b7eef31a77abcfcc0701a))
* **livemap:** Create store for map instance. Add fitbounds functionality for Homepage map. FWM-66 ([01019bf](https://github.com/Virtuosofriend/fwm-app/commit/01019bf27f7f528961a6502b5703de15c681c228))
* **modal:** Removed reactjs popup library and introduced headlessUI modal. Add tailwind configuration. Changes to Btn component. FWM-17 ([307911e](https://github.com/Virtuosofriend/fwm-app/commit/307911ec8412d7ac970d21f6bbe64e9937d151b8))
* **project:** Replace tailwind default colors with theme colors. Create Btn component for all custom buttons. FWM-16 ([3bab0bc](https://github.com/Virtuosofriend/fwm-app/commit/3bab0bc9ff7eabbcc30b8e1f4f96351f7e84114f))
* **refactor:** create component props types. FWM-21 ([c47ee97](https://github.com/Virtuosofriend/fwm-app/commit/c47ee9764aab9581ae308e4baab99cfeb8def542))
* **refactor:** swap axios client to a DataService, move + rename types, providers, props, fix map rendering issue. FWM-19 ([d025d73](https://github.com/Virtuosofriend/fwm-app/commit/d025d739523bfbf09ce4c2e8da235a28166a98da))
* **seo:** Create dynamic sitemap. FWM-70 ([d57cbd2](https://github.com/Virtuosofriend/fwm-app/commit/d57cbd23ecd37069787a3c2008711b4772555c79))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([f61cb85](https://github.com/Virtuosofriend/fwm-app/commit/f61cb85829529f8cd91e72911b5b36147b4dfca1))
* **stationModal:** Removed the literals for old weather description. Openweather API provides better literals. FWM-48 ([#35](https://github.com/Weath-r/fwm-app/issues/35)) ([#36](https://github.com/Weath-r/fwm-app/issues/36)) ([0e0ea58](https://github.com/Virtuosofriend/fwm-app/commit/0e0ea584a9d3df40fa111b99b54c5de7350ff64f))
* **stationModal:** Station modal design updated. FWM-33 ([3ae4d9b](https://github.com/Virtuosofriend/fwm-app/commit/3ae4d9b64140acd192093b6e53d5e3d15610948d))
* **warnings:** Add GeoJSON background for warning areas. FWM-54 ([0536cbf](https://github.com/Virtuosofriend/fwm-app/commit/0536cbf1d020a9a024c1f15136b4503c901ef120))
* **warnings:** Redesign warnings panel. Support for mobile view. Global settings provider added. FWM-57 ([ad31bf0](https://github.com/Virtuosofriend/fwm-app/commit/ad31bf07cab74c38e91402adb3fc71145b97a6dc))

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
