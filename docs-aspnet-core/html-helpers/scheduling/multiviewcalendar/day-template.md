---
title: Day Template
page_title: Day Template | Telerik UI MultiViewCalendar HtmlHelper for ASP.NET Core
description: "Customize the content of each cell by using cell templates when working with the Telerik UI MultiViewCalendar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: day_template_multiviewcalendar_htmlhelper_aspnetcore
position: 5
---

# Day Template

The MultiViewCalendar enables you to customize the rendered day for the `month` view.

The following example demonstrates how to create a MultiViewCalendar by using a custom template.

```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .MonthTemplate("<div class='custom'><#=data.value#></div>")
        )
```

The template wraps the `value` in a `<div>` HTML element. The structure of the data object that is passed to the template function:

    data = {
        date: date, // Date object corresponding to the current cell
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // formatted date using yyyy/MM/dd format and month is zero-based
    };

## See Also

* [API Reference of the MultiViewCalendar HtmlHelper for ASP.NET Core](/api/multiviewcalendar)
