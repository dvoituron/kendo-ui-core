---
title: Selected Dates
page_title: Selected Dates | Telerik UI DatePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core DatePicker and learn how to set selected dates and date ranges in the widget."
slug: htmlhelpers_datepicker_aspnetcore_selecteddates
position: 3
---

# Selected Dates

The DatePicker allows you to render a pre-selected date and also define the minimum and maximum dates it displays.

For a complete example on how to select ranges using DatePicker, refer to the [demo on range selection](https://demos.telerik.com/aspnet-core/datepicker/rangeselection).

> Telerik UI for ASP.NET Core includes the [DateRangePicker]({% slug htmlhelpers_daterangepicker_aspnetcore %}) component that can be used for selecting date ranges.

The following example demonstrates how to render a DatePicker with an initially selected date and defined min and max dates. The DatePicker sets the value only if the entered date is within the defined range and is valid.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .Value(new DateTime(2019, 5, 15))
        .Min(new DateTime(2019, 5, 10))
        .Min(new DateTime(2019, 6, 18))
    )
```

## See Also

* [Selecting Date Ranges by Using the DatePicker (Demo)](https://demos.telerik.com/aspnet-core/datepicker/rangeselection)
* [Selecting Date Ranges by Using the DateRangePicker (Demo)](https://demos.telerik.com/aspnet-core/daterangepicker/date-range)
* [API Reference of the DatePicker](/api/datepicker)
