---
title: Types
page_title: Types | Telerik UI DataSource Tag Helper for ASP.NET Core
description: "Learn about the types of DataSource supported by the Telerik UI DataSource tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: types_datasource_aspnetcore
position: 2
---

# DataSource Types

The DataSource supports the following types of binding:

* Ajax&mdash;You have to set the server operations together by using the `server-operation` property. This approach is also applicable for the WebApi type of binding.

        <kendo-datasource name="dataSource" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
            <transport>
                <read url="/DataSource/Products_Read" />
            </transport>
        </kendo-datasource>

* WebApi&mdash;When you use the WebApi type of binding in an editable Grid, define the field types in the `schema` to use the correct editors for the field.

        <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.WebApi" server-operation="true">
            <transport>
                <read url="/api/Product" />
            </transport>
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number"></field>
                    </fields>
                </model>
            </schema>
        </kendo-datasource>

* Custom (`default`)&mdash; The custom type binding allows a full control over the DataSource options listed in the  [client-side API](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource). For example, the server operations have to be separately set (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates) instead of using the `serverOperation` property (only applicable for Ajax and WebApi types of binding).

> The custom type binding is suitable for working with `oData` and `oData-v4` services. This is achievable because of [type](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/type) property and usage of predefined transport and schema settings for consuming such services. Since the custom type binding is the default type it can be omitted in the DataSource declaration. Please refer to the examples below in order to get a better idea of what the custom type binding can be used for.

The following example demonstrates how to consume an OData service.

	<kendo-datasource name="dataSource1" custom-type="odata">
	    <transport>
	        <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
	    </transport>
	</kendo-datasource>

	<kendo-grid name="grid" datasource-id="dataSource1">
	    <pageable enabled="true">
	    </pageable>
	    <columns>
	        <column field="ShipName"></column>
	        <column field="ShipCity"></column>
	    </columns>
	    <scrollable enabled="true" />
	</kendo-grid>

The following example demonstrates how to use a simple remote service.

	<kendo-datasource name="dataSource1">
	    <transport>
	        <read url="https://demos.telerik.com/kendo-ui/service/Products"
	        dataType:  "jsonp",  // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
	        />
	    </transport>
	</kendo-datasource>

	<kendo-grid name="grid" datasource-id="dataSource1">
	    <pageable enabled="true">
	    </pageable>
	    <columns>
	        <column field="ProductName"></column>
	        <column field="UnitPrice" format="{0:c}"></column>
	        <column field="UnitsInStock"></column>
	        <column field="Discontinued"></column>
	    </columns>
	    <scrollable enabled="true" />
	</kendo-grid>

## See Also

* [API Reference of the DataSource Helper for ASP.NET Core](/api/datasource)
