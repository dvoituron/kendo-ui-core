---
title: Localization
page_title: Localization | Telerik UI DateTimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI DateTimePicker for ASP.NET Core and translate its messages for different culture locales."
slug: localization_datetimepicker_aspnetcore
position: 2
---

# Localization

The DateTimePicker provides options for localizing its user interface by utilizing its [`Culture`](/api//Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#culturesystemstring) property.

To enable the desired culture, add a reference to the script file before the DateTimePicker is initialized and include the desired culture in the settings of the helper.

```
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Culture("de-DE")
    )
```

## See Also

* [Globalization Support by the DateTimePicker (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/globalization)
* [API Reference of the DateTimePicker HtmlHelper for ASP.NET Core](/api/datetimepicker)
