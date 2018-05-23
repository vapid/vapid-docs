---
title: Getting Started
---
{% raw %}
# Getting Started

Vapid is software that helps you build simple websites. It's akin to other content management systems (CMS), like [WordPress](https://wordpress.org/) and [Squarespace](https://www.squarespace.com/), in that it has two components: a public-facing website, and a private dashboard for editing content.

The gist of Vapid is:

1. It does _most_ of what you need, but probably not everything.
2. You only need to know HTML (plus CSS and JS to the extent that your design calls for it).
3. You should be able to learn the basics in a few minutes.
4. Content and files that you've created here should be portable to your next platform.

## How to Install {#install}

Currently, Vapid is available through [npm](https://www.npmjs.com/).

```
npm install -g vapid-cli
```

_Note: A desktop GUI application is coming soon—please add yourself to [the mailing list](https://www.vapid.com) if you'd like to be notified when that is available._

Once you've installed Vapid, you can create a new website project by using the following terminal command:

```
vapid new path/to/project/folder
```

Then, you'll be able to start the development web server:

```
cd path/to/project/folder
vapid start .
```

Now, you can start developing. Open `path/to/project/folder` in your favorite text editor (see below for what file/folders are important). And preview your website: the public-facing site at `http://localhost:4567`; and the private dashboard at `http://localhost:4567/dashboard`.

## 3 Things You Should Know {#basics}

#### Files and Folders

If you've installed Vapid, and issued the `vapid new path/to/project/folder` command, you'll notice that a new folder was created, containing the following:

```
data/
www/
.env
.gitignore
package.json
```

The `data`, `.env`, `.gitignore`, and `package.json` items are largely ignorable for now. But the `www` folder is where the magic happens.

**Anything you place in "www" folder can be served as your website, with two exceptions: files that start with an underscore (_) or period (.) are private, and not viewable by visitors.**

This means that you can put _whatever_ you like in the `www` folder. You can start with the example Vapid template, and build your own custom website, or download a free template from the internet, and drop it in there.

#### Content Fields

To make your website dynamic (i.e. to create a custom dashboard), you add special template tags in your HTML. For example:

```
<html>
  <body>
    <h1>Hello, {{name}}!</h1>
  </body>
<html>
```

The `{{name}}` tag here has special meaning. It tells Vapid that you'd like place dynamic content there, and that you'd like the dashboard to have a text input field called "Name." You can have as many of these as you like. Just enclose any word with two curly braces.

If you've ever used Mustache.js or Handlebars.js, this will be very familiar to you. And like Handlebars.js, Vapid also allows you to pass parameters into template tags. For example, you could set a placeholder on the dashboard input field by writing:

```
{{name placeholder="e.g. Tom Waits"}}
```

Or specify that the input is not required (inputs are required by default).

```
{{name placeholder="e.g. Tom Waits" required=false}}
```

One of the more useful parameters you can pass in is called `type`, which lets you change the type of input field you present to the dashboard user. For example, let's say you wanted to give the ability to add HTML. `{{intro type=html}}` would display an HTML editor.

There's no need to get bogged down in the details of all field possibilities right now. You can reference them later in the [Content Types](/content-types) section. For now, just understand that they help you: 1) render content on the front-end; and 2) specify what inputs the user will see in the dashboard.

#### Organizing Content into Sections

As you start adding tags to your website, you'll probably want to organize how inputs are grouped in the dashboard. For example, you may want to separate fields for the About Us page from welcome message. To do this, you can use `#section` tags.

```
<h1>Hello, {{name}}</h1>

{{#section about}}
<div>
  <h2>{{title}}</h2>
  {{body type=html}}
</div>
{{/section}}
```

The `{{#section}}{{/section}}` tags that surround `{{title}}` and `{{body}}` tell Vapid that they should be place into their own group, and have their own page on the dashboard.

Now, there's one other thing you should know about sections: they can have repeating content. For example, let's say you want to give the ability to edit company office locations:

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

In this case, the dashboard will give the user the ability to enter _multiple_ office locations, and the front-end will render them as a list.

_Note: This example could have been written as `{{#section offices}}` without the `multiple=true` parameter. Vapid assumes that pluralized words are multiple by default._

## Hosting Your Website {#hosting}

Vapid can be deployed to any hosting service that supports Node.js. Here are a few to consider:

<table class="ui striped table">
  <thead>
    <tr>
      <th>Service</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.vapid.com">Vapid</a></td>
      <td>Zero-config service that can be accessed via the <code>vapid deploy</code> command. Note: it is currently in private beta.</td>
    </tr>
    <tr>
      <td><a href="https://heroku.com">Heroku</a></td>
      <td>Free or paid tiers. One thing to note is that Heroku's file system is ephemeral, so Vapid's <code>type=image</code> directives won't work here.</td>
    </tr>
    <tr>
      <td><a href="https://glitch.com">Glitch</a></td>
      <td>The easiest way to <a href="https://glitch.com/edit/#!/remix/vapid?SECRET_KEY=change-me">take Vapid for a test-drive</a>.</td>
    </tr>
  </tbody>
</table>
{% endraw %}