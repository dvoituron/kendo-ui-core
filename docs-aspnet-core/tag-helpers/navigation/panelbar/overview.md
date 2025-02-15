---
title: Overview
page_title: PanelBar Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI PanelBar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/panelbar, /aspnet-core/helpers/tag-helpers/panelbar
slug: taghelpers_panelbar_aspnetcore
position: 1
---

# PanelBar Tag Helper Overview

The Telerik UI PanelBar tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI PanelBar widget.

The PanelBar displays hierarchical data as a multi-level, expandable widget.

* [Demo page for the PanelBar](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)

## Initializing the PanelBar

The following example demonstrates how to define the PanelBar by using the PanelBar tag helper.

        <kendo-panelbar name="panelbar1">
        </kendo-panelbar>

## Basic Configuration

The PanelBar tag helper configuration options are passed as attributes of the tag. You can configure items by using a nested `<items>` tag and bind the widget by using either the `bind-to` option, or the `<hierarchical-datasource>` tag helper.

```tagHelper
    <kendo-panelbar name="employees" datatextfield="FullName">
        <hierarchical-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Employees" datatype="jsonp" />
            </transport>
            <schema type="json">
                <hierarchical-model id="EmployeeId" has-children="HasEmployees">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-panelbar>
```
```tagHelper-items
    <kendo-panelbar name="project">
        <items>
            <panelbar-item text="Storage" expanded="true">
                <items>
                    <panelbar-item text="Wall Shelving"></panelbar-item>
                    <panelbar-item text="Floor Shelving"></panelbar-item>
                    <panelbar-item text="Kids Storag"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Lights">
                <items>
                    <panelbar-item text="Ceiling"></panelbar-item>
                    <panelbar-item text="Table"></panelbar-item>
                    <panelbar-item text="Floor"></panelbar-item>
                </items>
            </panelbar-item>
        </items>
    </kendo-panelbar>
```
```cshtml
    @(Html.Kendo().PanelBar()
      .Name("panelbar")
      .ExpandMode(PanelBarExpandMode.Single)
      .Items(panelbar =>
      {
          panelbar.Add().Text("Projects")
              .Items(projects =>
              {
                  projects.Add().Text("New Business Plan");

                  projects.Add().Text("Sales Forecasts")
                      .Items(forecasts =>
                      {
                          forecasts.Add().Text("Q1 Forecast");
                          forecasts.Add().Text("Q2 Forecast");
                          forecasts.Add().Text("Q3 Forecast");
                          forecasts.Add().Text("Q4 Forecast");
                      });

                  projects.Add().Text("Sales Reports");
              });

          panelbar.Add().Text("Programs")
              .Items(programs =>
              {
                  programs.Add().Text("Monday");
                  programs.Add().Text("Tuesday");
                  programs.Add().Text("Wednesday");
                  programs.Add().Text("Thursday");
                  programs.Add().Text("Friday");
              });

          panelbar.Add().Text("Communication").Enabled(false);
      })
    )
```

## See Also

* [Basic Usage of the PanelBar Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
* [API Reference of the PanelBar Helper for ASP.NET Core](/api/panelbar)
