---
layout: "../../layouts/Markdown.astro"
title: "Example Page"
author: "admin"
date: "2024.11.18."
---
Here is a _great_ example of a content page. If you do not like this you can go back to the [home page](/).

This is the **content page** version!

Try visit [another page](/page/other)!

## Subsection

Content for said subsection

Your local Markdown files can be kept anywhere within your `src/` directory. Local Markdown can be imported into `.astro` components using an import statement for a single file and Vite’s `import.meta.glob()` to query multiple files at once.

If you have groups of related Markdown files, consider defining them as collections. This gives you several advantages, including the ability to store Markdown files anywhere on your filesystem or remotely.

Collections also allow you to use content-specfic, optimized API for querying and rendering your content. Collections are intended for sets of data that share the same structure, such as blog posts or product items. When you define that shape in a schema, you additionally get validation, type safety, and Intellisense in your editor

## Code Example
```astro
<style is:global>
    code {
        box-sizing: border-box;
        border: 1px solid rgb(206, 157, 24);
        padding: 0.1rem 0.2rem;
        background: linear-gradient(55deg, yellow 0%, yellow 30%, lightyellow 60%, gold 62%, yellow 100%);
        background-position: 0%;
        background-size: 150%;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        transition: background-position 500ms;
    }
    code:hover {
        background-position: 100%;
    }
</style>
```

As you can see the code block shows up at 
the top of the page and changes color when hovered over.

## Another Example

Here is another example of how you can use Markdown in your Astro site. You can include images, links, and other media to make your content more engaging.

[Hop back to the subsection](#subsection)


By using Markdown, you can easily create rich content for your site without needing to write HTML.

## Table

Below is a table showcasing various programming languages and their respective points. This can help you compare the popularity or proficiency levels of different languages at a glance.

| Language   | Points | Popularity |
|------------|--------|------------|
| JavaScript | 90     | High       |
| Python     | 85     | High       |
| Java       | 80     | Bad        |
| C#         | 75     | Medium     |
| C++        | 70     | Medium     |
| Ruby       | 65     | Low        |
| Go         | 60     | Low        |
| Swift      | 55     | Medium     |

Some tables might have problems on not-so-wide devices such as mobile phones. Here's an example of one. As am example below is a table showcasing various foods and their six most common ingredients. This can help you understand the composition of these foods at a glance.

| Food           | Ingredient 1 | Ingredient 2 | Ingredient 3 | Ingredient 4 | Ingredient 5 | Ingredient 6 |
|----------------|--------------|--------------|--------------|--------------|--------------|--------------|
| Chocolate Cake | Flour        | Sugar        | Cocoa        | Eggs         | Butter       | Baking Powder|
| Ice Cream      | Milk         | Sugar        | Cream        | Vanilla      | Eggs         | Stabilizers  |
| Cookies        | Flour        | Sugar        | Butter       | Eggs         | Baking Soda  | Chocolate Chips|
| Soda           | Water        | Sugar        | Carbon Dioxide| Flavorings  | Colorings    | Preservatives|
| Candy          | Sugar        | Corn Syrup   | Flavorings   | Colorings    | Gelatin      | Citric Acid  |
| Doughnuts      | Flour        | Sugar        | Milk         | Eggs         | Butter       | Yeast        |

As you can see, sugar is a very common ingredient in many of these foods. It is often used to enhance flavor and provide sweetness. However, consuming too much sugar can have negative health effects, such as increasing the risk of obesity, diabetes, and heart disease. It is important to be mindful of your sugar intake and try to balance it with other nutrients in your diet.

Everything works for a itsy-bitsy tiny table too!

| a | b | c |
|---|---|---|
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |

## Images

Here's how images look like. First a big one...

![Example Image](https://picsum.photos/id/139/1200/300)

...and then a smaller one.

![Example Image](https://picsum.photos/id/167/400/300)

Although the perceived size of the images might be the opposite on a smaller device. Staying within the golden and purple theme so the randomly generated images fit the page better.

---

## The bottom

It looks like you found the bottom 🥺

[Let's go back to the top](#top)!
