---
layout: page
title: Statistics
permalink: /stats/
---

{% assign albums_with_scores = site.posts | where_exp: "album", "album.score > 0" %}
{% assign top_albums = albums_with_scores | sort:"score" | reverse %}
{% assign bottom_albums = top_albums | reverse %}

## Our top-rated albums of all time
{% include stat_list.html albums=top_albums %}

## Our slightly less appreciated albums...
{% include stat_list.html albums=bottom_albums %}

