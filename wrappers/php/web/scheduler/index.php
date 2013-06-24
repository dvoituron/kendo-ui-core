<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    $type = $_GET['type'];

    $columns = array('TaskID', 'Title', 'Start', 'End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID');

    switch($type) {
        case 'create':
            $result = $result->create('Tasks', $columns, $request->models, 'TaskID');
            break;
        case 'update':
            $result = $result->update('Tasks', $columns, $request->models, 'TaskID');
            break;
        case 'destroy':
            $result = $result->destroy('Tasks', $request->models, 'TaskID');
            break;
        default:
            $result = $result->read('Tasks', array('TaskID', 'Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay',
'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'), $request);
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('index.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('index.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('index.php?type=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
$taskIDField->type('number')
            ->from('TaskID')
            ->nullable(true);

$titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
$titleField->from('Title')
        ->defaultValue('No title')
        ->validation(array('required' => true));

$startField = new \Kendo\Data\DataSourceSchemaModelField('start');
$startField->type('date')
        ->from('Start');

$endField = new \Kendo\Data\DataSourceSchemaModelField('end');
$endField->type('date')
        ->from('End');

$isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
$isAllDayField->type('boolean')
        ->from('IsAllDay');

$descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
$descriptionField->type('string')
        ->from('Description');

$recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
$recurrenceIdField->from('RecurrenceID');

$recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
$recurrenceRuleField->from('RecurrenceRule');

$recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
$recurrenceExceptionField->from('RecurrenceException');

$ownerIdField = new \Kendo\Data\DataSourceSchemaModelField('ownerId');
$ownerIdField->from('OwnerID')
        ->defaultValue(1);

$model->id('taskID')
    ->addField($taskIDField)
    ->addField($titleField)
    ->addField($startField)
    ->addField($endField)
    ->addField($descriptionField)
    ->addField($recurrenceIdField)
    ->addField($recurrenceRuleField)
    ->addField($recurrenceExceptionField)
    ->addField($ownerIdField)
    ->addField($isAllDayField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
        ->errors('errors')
        ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
    ->schema($schema)
    ->batch(true)
    ->addFilterItem(array(
        'logic' => 'or',
        'filters' => array(
            array('field' => 'ownerId', 'operator' => 'eq', 'value' => 1),
            array('field' => 'ownerId', 'operator' => 'eq', 'value' => 2),
        )
    ));

$resource = new \Kendo\UI\SchedulerResource();
$resource->field('ownerId')
    ->title('Owner')
    ->dataSource(array(
        array('text'=> 'Alex', 'value' => 1, 'color' => '#ef701d'),
        array('text'=> 'Bob', 'value' => 2, 'color' => '#5fb1f7'),
        array('text'=> 'Charlie', 'value' => 3, 'color' => '#35a964')
    ));

$scheduler = new \Kendo\UI\Scheduler('scheduler');
$scheduler->timezone("Etc/UTC")
        ->date(new DateTime('2013/6/13'))
        ->height(600)
        ->addResource($resource)
        ->addView(array('type' => 'day', 'startTime' => new DateTime('2013/6/13 7:00')),
            array('type' => 'week', 'selected' => true, 'startTime' => new DateTime('2013/6/13 7:00')), 'month', 'agenda')
        ->dataSource($dataSource);

?>
<div id="people">
    <input checked type="checkbox" id="alex" value="1">
    <input checked type="checkbox" id="bob" value="2">
    <input type="checkbox" id="charlie" value="3">
</div>

<?php
echo $scheduler->render();
?>

<script>
    $("#people :checkbox").change(function(e) {
        var checked = $.map($("#people :checked"), function(checkbox) {
            return parseInt($(checkbox).val());
        });

        var filter = {
            logic: "or",
            filters: $.map(checked, function(value) {
                return {
                    operator: "eq",
                    field: "ownerId",
                    value: value
                };
            })
        };

        var scheduler = $("#scheduler").data("kendoScheduler");

        scheduler.dataSource.filter(filter);
    });
</script>

<style scoped>
    #people {
        background: url('../../content/web/scheduler/team-schedule.png') transparent no-repeat;
        height: 115px;
        position: relative;
    }
    #alex {
        position: absolute;
        left: 404px;
        top: 81px;
    }
    #bob {
        position: absolute;
        left: 519px;
        top: 81px;
    }
    #charlie {
        position: absolute;
        left: 634px;
        top: 81px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
