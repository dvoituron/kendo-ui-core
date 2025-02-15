---
title: Overview
page_title: ButtonGroup Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Telerik UI ButtonGroup HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/buttongroup
slug: htmlhelpers_buttongroup_aspnetcore
position: 1
---

# ButtonGroup HtmlHelper Overview

The Telerik UI ButtonGroup HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ButtonGroup widget.

The ButtonGroup groups a series of buttons together on a single line.

* [Demo page for the ButtonGroup](https://demos.telerik.com/aspnet-core/buttongroup/index)

## Initialization

The following example demonstrates how to initialize the ButtonGroup.

```
        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```

## Functionality and Features

* [Disabled ButtonGroup]({% slug disabled_buttongroup_aspnetcore %})
* [Icon ButtonGroup]({% slug icons_buttongroup_aspnetcore %})
* [Index]({% slug index_buttongroup_aspnetcore %})
* [Selection]({% slug selection_buttongroup_aspnetcore %})

## Events

For a complete example on basic ButtonGroup events, refer to the [demo on using the events of the ButtonGroup](https://demos.telerik.com/aspnet-core/buttongroup/events).

## See Also

* [Basic Usage of the ButtonGroup HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/buttongroup)
* [Using the API of the ButtonGroup HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/buttongroup/api)
* [API Reference of the ButtonGroup HtmlHelper for ASP.NET Core](/api/buttongroup)
