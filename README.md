<p align="center">
  <a href=https://github.com/leghort/dauntless-builder-french/releases>
    <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/leghort/dauntless-builder-french?include_prereleases">
</p>

<p align="center">
  <a href="https://www.dauntless-builder.fr/">
    <img alt="Github top language" src="https://i.ibb.co/YNNL2CH/image.png">
  </a>
</p>

### Table des matières
**[Prérequis](https://github.com/leghort/dauntless-builder-french#prérequis)**</br>
**[Installation](https://github.com/leghort/dauntless-builder-french#installation)**</br>
**[Contact](https://github.com/leghort/dauntless-builder-french#contact)**</br>
**[Wiki](https://github.com/leghort/dauntless-builder-french/wiki)**</br>

## Prérequis

* [Nodejs 8.17.0+](https://nodejs.org/fr/)

## Installation
```shell
# First we need to install yarn via:
npm install -g yarn

# Install/update all dependencies via
yarn

# If it's a clean install or there were changes to data in the last pull you'll need to do a full build once
yarn build

# Then rebuilding assets can be done with
yarn build-dev

# Optional: you can also watch/build data...
# yarn build-dev --watch

# Next run your webserver via
yarn dev

# Powershell build and open chrome in a private tab
yarn
yarn build ; [System.Diagnostics.Process]::Start("chrome.exe","--incognito http://localhost:4000/") ; yarn dev
```

## Contact
<a href=https://discordapp.com/users/184411677469573121><img src="https://img.icons8.com/color/50/000000/discord-logo.png"></a>
<a href=mailto:medaey@hotmail.com><img src="https://i.ibb.co/Pr1Mtf9/mail.png"></a>
