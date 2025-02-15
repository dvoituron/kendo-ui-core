---
title: Using iframe
page_title: Using iframe | Telerik UI Window HtmlHelper for ASP.NET Core
description: "Learn how to use the Telerik UI Window HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) with an iframe element."
slug: htmlhelpers_window_iframe_aspnetcore
position: 6
---

# Using iframe

You can force the Window to display its content in an `<iframe>` element by using the `Iframe(true)` configuration method.

> * Loading HTML fragments (partial content) inside an `iframe` is not correct. iframe pages have to include a `DOCTYPE`, `html`, `head`, and `body` tags, just like a standard web page does.
> * Avoid using iframes on iOS devices because they are not scrollable and always expand to match the content.

The following example demonstrates how to access the `window` and `document` objects inside the `iframe`. To achieve this, the nested page has to belong to the same domain as the main page. The `iframe` is accessed through the `element` of the Window.

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Iframe Window")
        .Iframe(true)
        .LoadContentFrom("Content", "Home")
    )

    <script>
        $(function() {
            var windowElement = $("#window");
            var iframeDomElement = windowElement.children("iframe")[0];
            var iframeWindowObject = iframeDomElement.contentWindow;

            var iframeDocumentObject = iframeDomElement.contentDocument;
            // which is equivalent to
            // var iframeDocumentObject = iframeWindowObject.document;

            var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course
        });
    </script>

## See Also

* [API Reference of the Window HtmlHelper for ASP.NET Core](/api/window)
