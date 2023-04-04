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
{% assign albums_by_host_average_score = "" | split: "," %}
{% for group in albums_by_host %}
    {% assign num_albums = group.items | size %}
    {% assign score_total = 0 %}
    {% for album in group.items %}
        {% assign score_total = score_total | plus:album.score %}
    {% endfor %}
    {% assign avg_score = score_total | divided_by:num_albums %}

    {% assign object = '{"host": "' | append:group.name | append:'",' %}
    {% assign object = object | append:'"num_times": ' | append:num_albums | append:',' %}
    {% assign object = object | append:'"avg_score": ' | append:avg_score %}
    {% assign object = object | append:'},' | parse_json %}
    {% assign albums_by_host_average_score = albums_by_host_average_score | push:object %}
{% endfor %}

<article class="post">
    <div id="js-stats-avg"></div>
</article>

<script>
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

const host_data = [{{albums_by_host_average_score | json}}]

let html = `
<table>
    <thead>
        <tr>
            <th>Host</th>
            <th>Number of times hosted</th>
            <th>Average score</th>
        </tr>
    </thead>
    <tbody>`;


const sorted_list = host_data.sort(dynamicSort('avg_score')).reverse();
for (const host in sorted_list) {
    const x = host_data[host];
    html += `
            <tr>
                <td>${parseInt(host) + 1}. ${x.host}</td>
                <td>${x.num_times}</td>
                <td>${x.avg_score}</td>
            </tr>`
        }
html += `
    </tbody>
</table>`;
document.getElementById('js-stats-avg').innerHTML = html;
</script>