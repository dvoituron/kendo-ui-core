---
title: Overview
page_title: ResponsivePanel Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI ResponsivePanel tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/responsive-panel, /aspnet-core/helpers/tag-helpers/responsive-panel
slug: taghelpers_responsivepanel_aspnetcore
position: 1
---

# ResponsivePanel Tag Helper Overview

The Telerik UI ResponsivePanel tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI ResponsivePanel widget.

The ResponsivePanel allows you to hide part of a page content on small screens.

* [Demo page for the ResponsivePanel](https://demos.telerik.com/aspnet-core/responsivepanel/index)

## Initializing the ResponsivePanel

The following example demonstrates how to define the ResponsivePanel by using the ResponsivePanel tag helper.

        <kendo-responsivepanel name="slidebar" breakpoint="1000" orientation="left">
            <div id="profile" class="widget">
                <h3>Profile</h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates</h3>
                <div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </kendo-responsivepanel>


## Basic Configuration

The configuration options of the ResponsivePanel tag helper are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().ResponsivePanel()
            .Name("sidebar")
            .Breakpoint(1000)
            .Orientation("left")
            .Content(@<text>
                <div id="profile" class="widget">
                    <h3>Profile</h3>
                    <div>
                        <div class="profile-photo"></div>
                        <h4>Lynda Schleifer</h4>
                        <p>Sales Associate</p>
                    </div>
                </div>
                <div id="teammates" class="widget">
                    <h3>Teammates</h3>
                    <div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                            <h4>Andrew Fuller</h4>
                            <p>Team Lead</p>
                        </div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                            <h4>Nancy Leverling</h4>
                            <p>Sales Associate</p>
                        </div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                            <h4>Robert King</h4>
                            <p>Business System Analyst</p>
                        </div>
                    </div>
                </div>
            </text>)
        )
```
```tagHelper
        <kendo-responsivepanel name="slidebar" breakpoint="1000" orientation="left">
            <div id="profile" class="widget">
                <h3>Profile</h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates</h3>
                <div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </kendo-responsivepanel>
```

## See Also

* [Basic Usage of the ResponsivePanel Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/responsive-panel/index)
* [API Reference of the ResponsivePanel Helper for ASP.NET Core](/api/responsivepanel)
