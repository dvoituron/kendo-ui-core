---
title: Week Number Column
page_title: Week Number Column | Telerik UI DatePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core DatePicker and learn how to render a column for the number of weeks within the current month."
slug: htmlhelpers_datepicker_aspnetcore_weeknumbercolumn
position: 7
---

# Week Number Column

The DatePicker provides options for rendering a column which displays the number of the weeks within the current **Month** view.

To render the week number column, enable the [`WeekNumber`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#weeknumbersystemboolean) property.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .WeekNumber(true)
        .Value("10/10/2019")
    )
```

## See Also

* [Showing the Week Column in the DatePicker (Demo)](https://demos.telerik.com/aspnet-core/datepicker/week-column)
* [API Reference of the DatePicker](/api/datepicker)
