---
title: "Learn More"
---
{% raw %}
# Learn More

This page provides a little deeper dive into the topics discussed in [Getting Started](/).

## Sections

By default, Vapid places fields into the General section of your dashboard. After a while, though, this can become unwieldy.

Sections are an organizational unit of Vapid. They allow you to group tags together, and display them under a separate dashboard link, other than Genral.

To create a section, just enclose template tags within a section block:

```
{{#section about}}
<div>
  <h2>{{title}}</h2>
  {{body type=html}}
</div>
{{/section}}
```

Similar to template tags, you can pass additional parameters to a section block. For example, you can change the label that appears in the dashboard sidebar.

```
{{#section about label="About Me"}}
  <div>
  <h2>{{title}}</h2>
  {{body type=html}}
</div>
{{/section}}
```

#### Repeating Content

Occassionally, you'll want to create a section that has repeating content. For example, let’s say you want to give the ability to edit company office locations:

```
<ul>
  {{#section offices multiple=true}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

In this case, passing the `multiple=true` parameter will give the user the ability to enter multiple office locations, and the front-end will render them as a list.

_Note: This example could have been written as {{#section offices}} without the multiple=true parameter. Vapid assumes that pluralized words are multiple by default._

#### Ordering and Limiting

For repeating sections, you may want to order the records in a specific way. To do so, you can use the `order` parameter.

```
<ul>
  {{#section offices order=name}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

In the example above, the offices that you create in the dashboard will be ordered by name. You can even do complex ordering, my multiple fields.

```
<ul>
  {{#section offices order=state,-name}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

In the example above, the offices will first be ordered by `state`, then then by `name` in reverse order. Field prefixed with a `-` will be sorted in descending order.

Additionally, you can choose to limit the number of records shown.

```
<ul>
  {{#section offices order=name limit=5}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

Here, the offices are ordered by name, and only the first 5 are shown.


## Forms

Want to create an email contact form? No problem, just use the `#form` tag. It's nearly identical to `#section`, except that it automatically creates an emailable form for you. **Zero configuration required**. Vapid will email the contents of the form to the email address supplied by your dashboard login using [Formspree](https://formspree.io/).

```
{{#form contact}}
  {{name}}
  {{how label="How did you hear about us?"}}
  {{message long=true}}
{{/form}}
```

_Note: Only certain tag content types are available for forms (e.g. text, choice, date, link, and number). Unsupported content types will automatically fallback to text._

## If / Unless {#conditionals}

Vapid's templating system supports simple conditional logic with `#if` and `#unless` tags. The two allow you to show or hide content, if the variable in question has value.

For example, let's say you wanted to create an weather alert, but only wanted to show it if there was something interesting to say about the weather.

```
{{#if weather}}
  <div class="ui alert message">
    <strong>Weather alert</strong>: {{weather required=false}}
  </div>
{{/if}}
```

The weather alert would only display if the user had entered text into the Weather dashboard field. If there were no value, or if the user removed the Weather text, the alert would disappear.

Another example would be to show a message if a section had no records.

```
<ul>
  {{#section offices}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
  {{#unless offices}}
    <p>Sorry, we don't have any offices.</p>
  {{/unless}}
</ul>
``` 
{% endraw %}

## Sass and JS {#assets}

By default, Vapid creates two assets for you: `site.pack.scss` and `site.pack.js`. If you're familiar with [Webpack](https://webpack.js.org/), then know that any Sass or JS file with `pack` added to the extension will be automatically compiled.

If you're not familiar with Webpack, no problem. Use these two files to add [Sass](https://sass-lang.com/) (or even plain CSS), and JavaScript to your project. Vapid will combine any files that you've imported (see the respective file comments for details), and output single `site.css` and `site.js` files.

If you're not interested in using Webpack, that's fine. Just use CSS and JS files (without the `pack` extension).
