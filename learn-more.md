---
title: "Learn More"
---
{% raw %}
# Learn More

This page provides a little deeper dive into the topics discussed in [Getting Started](/).

## Sections

By default, Vapid places fields into the General section of your dashboard. After a while, though, this can become unwieldy.

Sections are an organizational unit of Vapid. They allow you to group tags together, and display them under a separate dashboard link, other than General.

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

Occasionally, you'll want to create a section that has repeating content. For example, let’s say you want to give the ability to edit company office locations:

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

#### Link to Repeating Content

Vapid provides a way for you to link to individual records of repeating sections. Continuing the example above, we might want to create individual page for each office. For this, we can use the `{{_permalink}}` template tag (note the underscore before "permalink").

```
<ul>
  {{#section offices multiple=true}}
    <li>
      <h5><a href="{{_permalink}}">{{name}}</a></h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

The `{{_permalink}}` tag tells Vapid to create a link for this individual office. It will look something like `/offices/1/office-name`, where "1" is the record ID of the office, and `office-name` is a slug of the Name field. (Vapid attempts to slug the Name or Title field, if available).

To render the individual detail page, just place a underscored file in the `www` with the same name as the section. In this case, we could create a file called `_offices.html` in the `www` directory.

```
{{#section offices}}
  <h1>{{name}}</h1>

  <ul class="info">
    <li>{{address_1}}</li>
    {{#if address_2}}
      <li>{{address_2}}</li>
    {{/if}}
    <li>{{city}}, {{state}} {{postal_code}}</li>
  </ul>

  {{description type=html}}
{{/section}}
```

You can see a few things here:

* The `{{#section offices}}{{/section}}` is required.
* Sections can contain different template tags on different pages. Vapid will sum them up in the dashboard.
* This introduces the `{{#if}}{{/if}}` tag, explained <a href="#conditionals">later</a>.

#### Order, Limit and Offset

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

In the example above, the offices will first be ordered by `state`, then by `name` in reverse order. Field prefixed with a `-` will be sorted in descending order.

Additionally, you can choose to limit the number of records shown, or offset the starting record.

```
<ul>
  {{#section offices order=name limit=5 offset=1}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

Here, the offices are ordered by name, and only the first 5 are shown, starting at the second record.

####  Drag n' drop sorting

On occassion, you may want to impose a more arbitrary ordering of records. By adding `sortable=true` to any repeating section, its index page will now allow drag n' drop record recording.

```
<ul>
  {{#section offices sortable=true}}
    <li>
      <h5>{{name}}</h5>
      {{city}}, {{state}}
    </li>
  {{/section}}
</ul>
```

Here, the offices will be ordered according to the order they appear on the dashboard index page (changeable via drag n' drop).

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

The form tag accepts the following options:

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody></tbody>
  </thead>
  <tbody>
    <tr>
      <td>subject</td>
      <td>New submission from example.com</td>
      <td>any text</td>
      <td>Set the subject line of the email.</td>
    </tr>
    <tr>
      <td>recipient</td>
      <td>admin@example.com</td>
      <td>any email address, or hash if you're a [Formspree Gold subscriber](https://formspree.io/#plans)</td>
      <td>Override the recipient email address. By default, it uses the email you used to create your dashboard login.</td>
    </tr>
    <tr>
      <td>next</td>
      <td>The URL of the page that hosts the form.</td>
      <td>any URL</td>
      <td>Override the page that Formspree redirects to after the form is submitted.</td>
    </tr>
    <tr>
      <td>action</td>
      <td>https://formspree.io/admin@example.com</td>
      <td>any URL</td>
      <td>Override the form action.</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>Submit</td>
      <td>any text</td>
      <td>Override the submit button text.</td>
    </tr>
  </tbody>
</table>

## If / Unless {#conditionals}

Vapid's templating system supports simple conditional logic with `#if` and `#unless` tags. The two allow you to show or hide content, if the variable in question has value.

For example, let's say you wanted to create a weather alert, but only wanted to show it if there was something interesting to say about the weather.

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

## Sass and JS {#assets}

By default, Vapid creates two assets for you: `site.pack.scss` and `site.pack.js`. If you're familiar with [Webpack](https://webpack.js.org/), you'll already know that any Sass or JS file with `pack` added to the extension will be automatically compiled.

If you're not familiar with Webpack, no problem. Use these two files to add [Sass](https://sass-lang.com/) (or even plain CSS), and JavaScript to your project. Vapid will combine any files that you've imported (see the respective file comments for details), and output single `site.css` and `site.js` files.

If you're not interested in using Webpack, that's fine. Just use CSS and JS files (without the `pack` extension).

## Image Resizing {#images}

Never worry about a client uploading a 10MB, 4000px-wide image again. By passing a `width` or `height` attribute into Vapid's image directive, you can resize any JPG, PNG, or WEBP photo:

```
{{example_1 type=photo width=800 alt="Example 1"}}
```

Specify both width and height attributes to automatically crop photos:

```
{{example_2 type=photo width=100 height=100 alt="Cropped thumbnail"}}
```

Great for responsive images:

```
<picture>
  <source srcset="{{photo type=image width=1000 tag=false}}" media="(min-width: 480px)">
  <img src="{{photo type=image width=480 tag=false alt="Responsive"}}">
</picture>
```

Note: Using a Vapid image directive is not required. You can resize _any_ image in your site by appending `w` and/or `h` query string parameters:

```
<img src="/images/myphoto.jpg?w=800&h=600" alt="My photo">
```

## Partials

Partial templates (or "partials" for short) are a way for you to share pieces of code between templates. Partials use the following syntax:

```
{{> partialName}}
```

In this case, the `partialName` corresponds a file named `_partialName.html` in your `www` directory.

For example, let's say you want to include a common navigation menu on every page. You could create a file named `_menu.html` in the `www` directory, then include it as `{{> menu}}` in every template.

If you'd like to organize your partials, feel free to store them in a subdirectory:

```
# some/directory/_menu.html
{{> some/directory/menu}}
```

_Note: Partials may include Vapid template tags._

## Custom Error Page {#errors}

Vapid allows you to customize the error page for Page Not Found (404) errors. Just add a template named `_error.html` to your `www` folder.

_Note: Custom error pages may not include any template tags._

## Timestamps

Every record has two special fields: `{{_created_at}}` and `{{_updated_at}}`. They are datetime stamps of when the record was created, and when the record was last updated, respectively. They function very similarily to the `date` content type, in that you can pass in a `format` parameter to change the way they are displayed.

```
{{#section posts label="Blog Posts"}}
  <article class="post">
    <header>{{title}}</header>
    <div class="summary">{{summary long=true}}</div>
    <div class="meta">Posted on {{_created_at format="%m/%d/%Y"}}</div>
  </article>
{{/section}}
```

## Reorder Tabs/Fields {#priority}

By default, the dashboard renders fields in the order they appear in the HTML, and sections in alphabetical order. By specifying the `priority` option, you can change their order to your liking. Sections/fields that don't specify a priority will appear last.

```
{{#section offices priority=1}}
  {{location}}
{{/section}}

{{#section about}}
  <article class="post">
    {{photo type=image}}
    <header>{{title priority=1}}</header>
    <div class="summary">{{summary long=true priority=2}}</div>
  </article>
{{/section}}
```

{% endraw %}
