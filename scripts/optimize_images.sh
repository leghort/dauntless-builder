#!/bin/bash

function optimize_path () {
    for file in $(find $1 -name '*.png')
    do
        # resize to 128px height
        convert -resize 128x128 -gravity center -extent 128x128 -background none "$file" "$file"

        # optmize images
        optipng -O2 "$file"
    done
}

optimize_path ./assets/icons/armours
optimize_path ./assets/icons/weapons
