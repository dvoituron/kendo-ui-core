---
title: Overview
page_title: MaskedTextBox Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI MaskedTextBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/maskedtextbox, /aspnet-core/helpers/tag-helpers/maskedtextbox
slug: taghelpers_maskedtextbox_aspnetcore
position: 1
---

# MaskedTextBox Tag Helper Overview

The Telerik UI MaskedTextBox tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI MaskedTextBox widget.

The MaskedTextBox enables a controlled text input that is based on a specific format.

* [Demo page for the MaskedTextBox](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)

## Initializing the MaskedTextBox

The following example demonstrates how to define the MaskedTextBox by using the MaskedTextBox tag helper.

        <kendo-maskedtextbox name="ssn" mask="000-00-0000" value="003-12-3456"></kendo-maskedtextbox>

## Basic Configuration

The MaskedTextBox tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().MaskedTextBox()
			.Name("phone_number")
			.Mask("(999) 000-0000")
			.Value("555 123 4567")
		)
```
```tagHelper

        <kendo-maskedtextbox name="phone_number" mask="(999) 000-0000" value="555 123 4567"></kendo-maskedtextbox>
```

## See Also

* [Basic Usage of the MaskedTextBox Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
* [API Reference of the MaskedTextBox Helper for ASP.NET Core](/api/maskedtextbox)
