---
layout: page
title: Statistics
permalink: /stats/
---

{% assign albums_with_scores = site.posts | where_exp: "album", "album.score > 0" %}
{% assign top_albums = albums_with_scores | sort:"score" | reverse %}
{% assign bottom_albums = top_albums | reverse %}

## All our albums, ranked by score
<table>
    <thead>
        <tr>
            <th>Artist and album</th>
            <th>Host</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
        {% for album in top_albums -%}
            <tr>
                <td>#{{ forloop.index }}. {% include record_title.html record=album %}</td>
                <td>{{ album.host }}</td>
                <td>{{ album.score }} / 100</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>

## All our hosts (and the number of times they hosted)
{% assign albums_by_host = albums_with_scores | group_by:"host" %}
<article class="post">
    <ul>
    {% for group in albums_by_host %}
        <li> {{ group.name }} - {{ group.items | size }} time(s)</li>
    {% endfor %}
    </ul>
</article>