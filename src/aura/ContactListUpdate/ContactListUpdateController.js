
({
    doInit : function(component, event, helper){
        component.set('v.columns',[
            { label: 'Contact Name', fieldName: 'Name', type: 'text',editable: true},
            { label: 'Phone', fieldName: 'Phone', type: 'phone',editable: true},
            { label: 'Email', fieldName: 'Email', type: 'email',editable: true}
        ]);
        console.log('before load contacts');
        helper.loadContacts(component);
        console.log('after load contacts');
        console.log('init' + JSON.stringify(component.get("v.contacts")));
    },


    handleClick : function(component, event, helper){
        var dTable = component.find("contactTable");
        var selectedRows = dTable.getSelectedRows();
        console.log('selected rows: ' + JSON.stringify(selectedRows));

        var ids = new Array();
        for(var i =0; i < selectedRows.length; i++){
            console.log('id: ' + selectedRows[i].Id);
            ids.push(selectedRows[i].Id);
        }
        console.log('id list: ' + ids);
        var idListJson = JSON.stringify(ids);

        console.log('id list json: ' + idListJson);
        var action = component.get("c.updateContacts");
        action.setParams({
            idList : idListJson
        });

        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log('success');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
            }
            else if(state === "ERROR"){
                console.log('error');
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);
                    }
                    else{
                        console.log("Unknown Error");
                    }
                }
            }
        });
        $A.enqueueAction(action);

    }

})