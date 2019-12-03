#!/bin/sh
JEKYLL_ENV=production bundle exec jekyll build
#rsync -avr --rsh='ssh -p25000' --delete-after --delete-excluded _site/ matt@162.243.234.162:/var/www/offtherecord
rsync -avr --omit-dir-times --rsh='ssh' --delete-after --delete-excluded _site/ matt@206.189.186.174:/var/www/offtherecord
