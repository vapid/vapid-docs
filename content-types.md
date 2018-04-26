---
title: "Content Types"
---
{% raw %}
# Content Types

By default, Vapid assumes that all template tags are text, and will generate text field inputs in the dashboard. You can easily change the type of dashboard input by specifying one of the types below.

```
{{intro type=html}}
```

Additionally, template tags accept any number of parameters, which can tell Vapid how to render the content, or how to further configure the dashboard input. Each content type below has a corresponding table which describes its parameters.

```
{{intro type=html editor=markdown required=false}}
```

All content types have the following parameters unless specified differently below.

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
      <td>help</td>
      <td></td>
      <td>any text</td>
      <td>Adds helper text below the dashboard input field.</td>
    </tr>
    <tr>
      <td>label</td>
      <td></td>
      <td>any text</td>
      <td>Changes the dashboard form label.</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td></td>
      <td>any text</td>
      <td>Adds placeholders text to the dashboard input field.</td>
    </tr>
    <tr>
      <td>required</td>
      <td>true</td>
      <td>true | false</td>
      <td>All dashboard input fields are required by default.</td>
    </tr>
  </tbody>
</table>

## Text

Plain text.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>long</td>
        <td>false</td>
        <td>true | false</td>
        <td>Renders a <code>textarea</code> input, for longer entries.</td>
      </tr>
      <tr>
        <td>maxlength</td>
        <td></td>
        <td>any number</td>
        <td>The maximum number of characters that the input field will accept.</td>
      </tr>
    </tbody>
  </thead>
</table>

## HTML

HTML content, entered through a WYSIWYG editor, Markdown, or raw.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>editor</td>
        <td>wysiwyg</td>
        <td>wysiwyg | markdown | false</td>
        <td>Depending on the option, it will render a different HTML editor.</td>
      </tr>
    </tbody>
  </thead>
</table>

## Choice

Presents the user with a choice, from zero to multiple options. This would typically be used if you were asking for Yes/No answer, to choose one from many options, or in some case multiple-choice.

The choice directive tries its best to determine what type of input (checkbox, radio, dropdown, etc) would suit the options best. You can often override its logic, as long as it makes sense to do so.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>options</td>
        <td></td>
        <td>a comma-separated string</td>
        <td>The choices you'd like to present to the user. Can be left blank if yes/no.</td>
      </tr>
      <tr>
        <td>input</td>
        <td></td>
        <td>checkbox | toggle | radio | dropdown</td>
        <td>The type of input used to present the options.</td>
      </tr>
      <tr>
        <td>multiple</td>
        <td></td>
        <td>false</td>
        <td>For multiple-choice questions. Always renders a dropdown menu. Must have at least two options.</td>
      </tr>
    </tbody>
  </thead>
</table>

## Date

Date or DateTime input.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>format</td>
        <td>%B %e, %Y</td>
        <td>anything supported by <a href="https://github.com/samsonjs/strftime#supported-specifiers">strftime</a>.</td>
        <td>Formats the date.</td>
      </tr>
      <tr>
        <td>time</td>
        <td>false</td>
        <td>true | false</td>
        <td>Presents the user with a datetime prompt. By default, the date directive only asks for a date.</td>
      </tr>
    </tbody>
  </thead>
</table>

## Image

The ability to upload images.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>alt</td>
        <td></td>
        <td>any string</td>
        <td>Adds an <code>alt</code> attribute to the image.</td>
      </tr>
      <tr>
        <td>class</td>
        <td></td>
        <td>any string</td>
        <td>Adds an <code>class</code> attribute to the image.</td>
      </tr>
      <tr>
        <td>tag</td>
        <td>true</td>
        <td>true | false</td>
        <td>Renders an <code>img</code> tag, or the src URL.</td>
      </tr>
    </tbody>
  </thead>
</table>

## Link

URLs and/or the ability to render embeds (e.g. YouTube videos).

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>unfurl</td>
        <td>false</td>
        <td>true | false</td>
        <td>If true, it will attempt to render the <a href="https://oembed.com/">oEmbed</a> representation. e.g. It will render a YouTube video for a YouTube link.</td>
      </tr>
    </tbody>
  </thead>
</table>

## Number

Number inputs.

<table class="ui striped table">
  <thead>
    <tr>
      <th>Parameter name</th>
      <th>Default value</th>
      <th>Possible values</th>
      <th>Description</th>
    </tr>
    <tbody>
      <tr>
        <td>min</td>
        <td></td>
        <td>any decimal or integer</td>
        <td>The minimum value that the input will accept.</td>
      </tr>
      <tr>
        <td>max</td>
        <td></td>
        <td>any decimal or integer</td>
        <td>The maximum value that the input will accept.</td>
      </tr>
      <tr>
        <td>step</td>
        <td></td>
        <td>any decimal or integer</td>
        <td>The number increased or descreased when the UI (arrows or slider) is changed.</td>
      </tr>
      <tr>
        <td>range</td>
        <td></td>
        <td>false</td>
        <td>If true, renders an <code>type="range"</code> input. If false, <code>type="number"</code>.</td>
      </tr>
    </tbody>
  </thead>
</table>

{% endraw %}