


------------

### Features

- Support with bootstrap 5
- Scss component based design
- Fully Responsive
- Clean Code
- Demo Pages
- Color Mode
- Direction Mode
- Layout Setting
- 30+ Menu Styles


# Table of Contents

  - [Quick Start](#quick-start)
    - [Method 1: Direct Download](#method-1-direct-download)
    - [Method 2: Using NPM](#method-2-using-npm)
  - [Documentation](#documentation)
  - [Version](#version)
  - [Public RoadMap](#public-roadmap)
  - [File Structure](#file-structure)
  - [Browser Support](#browser-support)
  - [Don't Buy a Coffee for Us Instead Support Us](#dont-buy-a-coffee-for-us-instead-support-us)
  - [More from Iqonic Design](#more-from-iqonic-design)
  - [Reporting Issues](#reporting-issues)
  - [Special Thanks](#special-thanks)
  - [Change Log](#change-log)
  - [Follow Us](#follow-us)
  - [Licensing](#licensing)

## Quick Start

You can use following method to get started with CSS and JS files of the design system.

### Method 1: Direct Download
[Dowload from Github](https://github.com/iqonicdesignofficial/hope-ui-react-dashboard/archive/refs/heads/main.zip)

[Download from Iqonic Design](https://iqonic.design/product/admin-templates/hope-ui-admin-free-open-source-bootstrap-admin-template/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)
### Method 2: Using NPM
Start working with the design system
1. Install Dependency
```
npm install
```

2. Run on development 
```
npm start
```
3. Build for production
```
npm run build
```
[More Details...](https://templates.iqonic.design/hope-ui/documentation/html/dist/main/gulp.html)
## Documentation
You can find our documentation [here](https://templates.iqonic.design/hope-ui/documentation/html/dist/main/).

## Version
- [Figma](https://www.figma.com/community/file/1009728454881721702)
- [HTML Admin Dashboard](https://iqonic.design/product/admin-templates/hope-ui-admin-free-open-source-bootstrap-admin-template/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)
- [Vue JS Dashobard](https://iqonic.design/product/admin-templates/hope-ui-open-source-vue-js-admin-template/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)
- [React JS Dashobard](https://iqonic.design/product/admin-templates/hope-ui-free-open-source-react-admin-template/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)
- [Laravel Dashobard](https://iqonic.design/product/admin-templates/hope-ui-free-open-source-laravel-admin-panel/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)

## Public RoadMap

## File Structure
Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:
```
github/hope-ui-admin-dashboard/

src
  ├── assets
  │    ├── images
  │    │    ├── icon.png
  │    │    ├── favicon.ico
  │    │    └── loader.gif
  │    |── scss
  │    |    ├── bootstrap/
  │    |    │     ├── forms/
  │    |    │     ├── helper/
  │    |    │     ├── mixins/
  │    |    │     ├── utilites/
  │    |    │     └── vendor/
  │    |    ├── custom
  │    |    │     ├── auth/
  │    |    │     ├── kanban/
  │    |    │     ├── pricing/
  │    |    │     └── ui-kit/
  |    |    ├──customizer
  │    |    │     ├── components/
  │    |    │     ├── layouts/
  │    |    │     ├── menu-style/
  │    |    │     ├── utilities/
  │    |    │     ├── components.scss
  │    |    │     ├── dark.scss
  │    |    │     ├── layout.scss
  │    |    │     └── variables.scss   
  │    |    ├── hope-ui-design-system
  │    |    │     ├── components/
  │    |    │     ├── helper/
  │    |    │     ├── layout-style/
  │    |    │     ├── pages/
  │    |    │     ├── plugins/
  │    |    │     ├── variables/
  │    |    │     └── variables.scss
  │    |    ├── dark
  │    |    │     ├── components/
  │    |    │     ├── helper/
  │    |    │     ├── layout-style/
  │    |    │     ├── pages/
  │    |    │     ├── plugins/
  │    |    │     ├── reboot/
  │    |    │     ├── _dark.scss
  │    |    │     └── _index.scss
  │    |    ├── rtl
  │    |    │     ├── components/
  │    |    │     ├── pages/
  │    |    │     ├── reboot/
  │    |    │     ├── utilities/
  │    |    │     └── _index.scss
  │    |    ├── rtl.scss
  │    |    ├── dark.scss
  │    |    ├── customizer.scss
  │    |    ├── custom.scss
  │    |    └── hope-ui.scss
  |    |
  |    └──sortable/
  │         └── Plugins Files
  │  
  │ 
  ├── components
  |    ├── partials
  |    |    ├──components
  │    |    |   ├── header-breadcrumb
  │    |    |   ├── logo
  │    |    |   ├── mobile-offcanvas
  │    |    |   ├── settingoffcanvas
  │    |    |   └── shareoffcanvas
  │    |    └──dashboard
  │    |        ├── FooterStyle/
  │    |        ├── HeaderStyle/
  │    |        └── SidebarStyle/
  │    ├── Card
  │    ├── circularprogressbar
  │    ├── counterup
  │    ├── datepicker
  │    ├── dropdown
  │    ├── leaflet
  │    ├── loader
  │    └── progress
  ├── layouts/dashboard
  |    ├── boxed-fancy
  |    ├── boxed
  |    ├── default
  |    ├── dual-Compact
  |    ├── dual-horizontally
  |    ├── horizontal
  |    └── simple 
  ├── plugins
  |    └──slider-tabs
  ├── router
  |    ├── boxed-fancy-router
  |    ├── boxed-router
  |    ├── defult-router 
  |    ├── horizontal-multi-2
  |    ├── horizontal-router
  |    ├── simple-router 
  |    └── index
  ├── store
  |    ├── setting
  |    |    └── setting
  |    └──index
  ├── views
  |    ├── dashboard/
  |    └── uikit/
  ├── App.js
  ├── App.test.js
  ├── index.js
  ├── reportWebVitals.js
  ├── setupTests.js
  ├── .env.development.local
  ├── .env.production.local
  ├── .gitignore
  ├── .htaccess
  ├── package-lock.json
  ├── package.json
  └── README.md
```
## Browser Support
![chrome](https://assets.iqonic.design/hope-ui/github/chrome.png)
![Firefox](https://assets.iqonic.design/hope-ui/github/Firefox.png)
![Safari](https://assets.iqonic.design/hope-ui/github/Safari.png)
![Microsoft](https://assets.iqonic.design/hope-ui/github/Microsoft%20edge.png)
![Operamini](https://assets.iqonic.design/hope-ui/github/Operamini.png)

## Don't Buy a Coffee for Us Instead Support Us
- Star our GitHub repo ⭐
- [Tweet about it](https://twitter.com/intent/tweet?text=Checkout%20%23HopeUI%20%E2%80%93%20Amazing%20open-source%20Bootstrap%205%20Admin%20Dashboard%20%26%20Design%20system.%20%23BuildwithHopeUI&url=https%3A%2F%2Fbit.ly%2F3ANB7gT).
- Submit bugs, or suggest new features and documentation updates 🔧
- Follow [@iqonicdesign](https://twitter.com/iqonicdesign) on Twitter.
- Follow Us on [Instagram](https://www.instagram.com/iqonicdesign/)
- Subscribe to Iqonic newsletter at [iqonic.design](https://iqonic.design)

## More from Iqonic Design
- [Free Products Every Week](https://iqonic.design/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github)
- [Premium Themes, templates, dashbaords, Apps, and more](https://iqonic.design/shop/?iqonic=1&orderby=sales&paged=1&product_for=premium)
- [Subscribe on Youtube](https://www.youtube.com/c/IqonicDesign)
- [Reach US](https://iqonic.design/contact-us/)
## Reporting Issues
Have a bug or a feature request? Raise a new issue at our [github](https://github.com/iqonicdesignofficial/hope-ui-design-system/issues) support

## Special Thanks
- [Bootstrap](https://getbootstrap.com/)
- [Google Fonts](https://www.google.com/fonts)
- [Jquery](https://jquery.com/)
- [Apex Charts](https://apexcharts.com/)
[Checkout complete list](https://templates.iqonic.design/hope-ui/documentation/html/dist/main/sourceAndCredit.html)

## Change Log
[Click Here](https://templates.iqonic.design/hope-ui/documentation/html/dist/main/change-log.html) to check our full change log.
## Follow Us
- [Twitter](https://twitter.com/iqonicdesign)
- [Facebook](https://www.facebook.com/iqonicdesign/)
- [Dribbble](https://dribbble.com/IqonicDesign)
- [Instagram](https://www.instagram.com/iqonicdesign/)
- [Product Hunt](https://www.producthunt.com/posts/iqonic-design)
## Licensing
- Code and Documentation Copyright 2021 All Rights Reserved by [IQONIC](https://iqonic.design/?utm_source=github&utm_medium=github-description&utm_campaign=open_source_github) Design. Code released under the [MIT](https://iqonic.design/licenses/) License.